"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { formatUnits, getAddress, isAddress } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import toast from "react-hot-toast";
import { GenericModal } from "@/components/atoms/generic-modal";
import Button from "@/components/ui/button/Button";
import Loading from "@/components/atoms/loading/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWallet } from "@/context/WalletContext";
import { useLanguage } from "@/components/common/LanguageContext";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import {
  IAdminRewardSettlement,
  ICreateAdminRewardSettlementResponse,
  useCreateAdminRewardSettlementMutation,
  useDeleteAdminRewardSettlementMutation,
  useLazyGetAdminRewardSettlementQuery,
} from "@/services/rewards-api";
import { TxLink, formatAmount, truncateAddress } from "./rewards-table-utils";
import { erc20Abi } from "./erc20-abi";
import { rewardDistributorAbi } from "./reward-distributor-abi";

const DEFAULT_CHAIN_ID = 8453;
const DEFAULT_PAYMENT_TOKEN_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const DEFAULT_PAYMENT_TOKEN_SYMBOL = "USDC";
const POLL_INTERVAL_MS = 5000;
const MAX_STATUS_POLL_ATTEMPTS = 18;

const SETTLEMENT_STEPS = ["draft", "pending", "submitted", "processing", "completed"] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatformAddress?: string;
}

interface ExecutionResult {
  settlementId: string;
  txHash: string;
}

interface AllowanceRequirement {
  paymentToken: string;
  spender: string;
  requiredAmount: bigint;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function mergeSettlementUpdate(
  currentPreview: ICreateAdminRewardSettlementResponse,
  updatedSettlement: IAdminRewardSettlement,
) {
  return {
    ...currentPreview,
    settlements: currentPreview.settlements.map((settlement) =>
      settlement.id === updatedSettlement.id ? updatedSettlement : settlement,
    ),
  };
}

type TranslateFn = ReturnType<typeof useLanguage>["t"];

function buildPreviewFromSettlements(
  preview: ICreateAdminRewardSettlementResponse,
  settlements: IAdminRewardSettlement[],
): ICreateAdminRewardSettlementResponse {
  if (settlements.length === 0) {
    return {
      ...preview,
      settlements: [],
      contractCalls: [],
      totalSettlements: 0,
      totalRewardCount: 0,
      totalUserAmount: "0",
      totalPlatformAmount: "0",
      totalAmount: "0",
    };
  }

  const decimals = settlements[0]?.paymentTokenDecimals ?? 6;
  const totalUserAmountRaw = settlements.reduce(
    (sum, settlement) => sum + BigInt(settlement.userAmountRaw),
    BigInt(0),
  );
  const totalPlatformAmountRaw = settlements.reduce(
    (sum, settlement) => sum + BigInt(settlement.platformAmountRaw),
    BigInt(0),
  );
  const totalAmountRaw = settlements.reduce(
    (sum, settlement) => sum + BigInt(settlement.totalAmountRaw),
    BigInt(0),
  );

  return {
    ...preview,
    settlements,
    contractCalls: preview.contractCalls.filter((contractCall) =>
      settlements.some((settlement) => settlement.id === contractCall.settlementId),
    ),
    totalSettlements: settlements.length,
    totalRewardCount: settlements.reduce(
      (sum, settlement) => sum + settlement.rewardCount,
      0,
    ),
    totalUserAmount: formatUnits(totalUserAmountRaw, decimals),
    totalPlatformAmount: formatUnits(totalPlatformAmountRaw, decimals),
    totalAmount: formatUnits(totalAmountRaw, decimals),
  };
}

function buildAllowanceRequirements(settlements: IAdminRewardSettlement[]) {
  const requirements = new Map<string, AllowanceRequirement>();

  for (const settlement of settlements) {
    const paymentToken = getAddress(settlement.contractArguments.paymentToken);
    const spender = getAddress(settlement.distributorAddress);
    const requirementKey = `${paymentToken}-${spender}`;
    const currentRequirement = requirements.get(requirementKey);
    const requiredAmount = BigInt(settlement.contractArguments.totalAmount);

    requirements.set(requirementKey, {
      paymentToken,
      spender,
      requiredAmount: (currentRequirement?.requiredAmount ?? BigInt(0)) + requiredAmount,
    });
  }

  return Array.from(requirements.values());
}

function PreviewMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      {detail ? <p className="mt-1 text-xs text-gray-400">{detail}</p> : null}
    </div>
  );
}

function SettlementPreviewCard({
  settlement,
  chainId,
  t,
}: {
  settlement: IAdminRewardSettlement;
  chainId: number;
  t: TranslateFn;
}) {
  const normalizedStatus = settlement.status.toLowerCase();
  const failed = normalizedStatus === "failed";
  const activeStepIndex = failed
    ? SETTLEMENT_STEPS.indexOf("processing")
    : Math.max(SETTLEMENT_STEPS.indexOf(normalizedStatus as (typeof SETTLEMENT_STEPS)[number]), 0);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Batch #{settlement.batchIndex}</p>
          <p className="mt-1 font-mono text-xs text-gray-400">{settlement.id}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
          {settlement.status}
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <PreviewMetric
          label="Recipients"
          value={String(settlement.recipientCount)}
          detail={`${settlement.rewardCount} rewards`}
        />
        <PreviewMetric
          label="User Amount"
          value={`${formatAmount(settlement.userAmount)} ${settlement.paymentTokenSymbol}`}
          detail={`Raw: ${settlement.userAmountRaw}`}
        />
        <PreviewMetric
          label="Platform Amount"
          value={`${formatAmount(settlement.platformAmount)} ${settlement.paymentTokenSymbol}`}
          detail={`Raw: ${settlement.platformAmountRaw}`}
        />
        <PreviewMetric
          label="Total Amount"
          value={`${formatAmount(settlement.totalAmount)} ${settlement.paymentTokenSymbol}`}
          detail={`Raw: ${settlement.totalAmountRaw}`}
        />
      </div>

      <div className="mt-4 space-y-2 text-xs text-gray-400">
        <div>
          <span className="font-medium text-gray-300">Distributor:</span> {settlement.distributorAddress}
        </div>
        <div>
          <span className="font-medium text-gray-300">Payment Token:</span> {settlement.paymentTokenAddress}
        </div>
        <div>
          <span className="font-medium text-gray-300">Platform:</span> {settlement.platformAddress}
        </div>
        {settlement.txHash ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-300">Tx:</span>
            <TxLink hash={settlement.txHash} chainId={chainId} />
          </div>
        ) : null}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white">{t("settlementProgress")}</h3>
          <span className="text-xs text-gray-400">
            {t("status")}: <span className="text-gray-200">{settlement.status}</span>
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {SETTLEMENT_STEPS.map((step, index) => {
            const isCompleted = !failed && index <= activeStepIndex;
            const isCurrent = (failed && step === "processing") || (!failed && index === activeStepIndex);
            const isUpcoming = !isCompleted && !isCurrent;

            return (
              <div key={step} className="flex items-center gap-3 md:flex-col md:items-start">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                    failed && step === "processing"
                      ? "border-red-500/50 bg-red-500/10 text-red-300"
                      : isCompleted
                        ? "border-[#50FF56]/50 bg-[#50FF56]/10 text-[#50FF56]"
                        : isCurrent
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                          : "border-white/10 bg-white/[0.03] text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <p className={`text-xs font-medium ${isUpcoming ? "text-gray-500" : "text-gray-200"}`}>
                    {t(`settlementStatus${step.charAt(0).toUpperCase()}${step.slice(1)}` as keyof ReturnType<typeof useLanguage>["t"] extends never ? never : any)}
                  </p>
                  {step === "submitted" && settlement.submittedAt ? (
                    <p className="mt-1 text-[11px] text-gray-500">
                      {dayjs(settlement.submittedAt).format("MMM D, HH:mm")}
                    </p>
                  ) : null}
                  {step === "processing" && settlement.processedAt ? (
                    <p className="mt-1 text-[11px] text-gray-500">
                      {dayjs(settlement.processedAt).format("MMM D, HH:mm")}
                    </p>
                  ) : null}
                  {step === "completed" && settlement.completedAt ? (
                    <p className="mt-1 text-[11px] text-gray-500">
                      {dayjs(settlement.completedAt).format("MMM D, HH:mm")}
                    </p>
                  ) : null}
                  {failed && step === "processing" && settlement.failedAt ? (
                    <p className="mt-1 text-[11px] text-red-300">
                      {dayjs(settlement.failedAt).format("MMM D, HH:mm")}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        {settlement.lastError ? (
          <p className="mt-3 text-xs text-red-300">{settlement.lastError}</p>
        ) : null}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white">{t("userDistributions")}</h3>
          <span className="text-xs text-gray-400">
            {settlement.userDistributions.length} {t("recipientsLabel")}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/10">
          <Table aria-label="Settlement user distributions table">
            <TableHeader className="border-b border-white/10 bg-white/[0.03]">
              <TableRow>
                <TableCell isHeader className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-400">
                  {t("recipient")}
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-400">
                  {t("beneficiaryUserId")}
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-400">
                  {t("rewardIds")}
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-400">
                  {t("amount")}
                </TableCell>
                <TableCell isHeader className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-400">
                  {t("rawAmount")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-white/10">
              {settlement.userDistributions.length > 0 ? (
                settlement.userDistributions.map((distribution) => (
                  <TableRow key={`${settlement.id}-${distribution.recipient}`}>
                    <TableCell className="whitespace-nowrap px-4 py-3 text-sm text-gray-200">
                      <div className="font-mono text-xs text-gray-300" title={distribution.recipient}>
                        {truncateAddress(distribution.recipient)}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-200">
                      <span className="font-mono text-xs text-gray-300">
                        {distribution.beneficiaryUserId ?? t("none")}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-200">
                      <div className="max-w-[280px] font-mono text-xs text-gray-300" title={distribution.rewardIds.join(", ")}>
                        {distribution.rewardIds.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 py-3 text-sm text-gray-200">
                      {formatAmount(distribution.amount)} {settlement.paymentTokenSymbol}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-300">
                      {distribution.amountRaw}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                    {t("noUserDistributions")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export function CreateSettlementModal({ isOpen, onClose, defaultPlatformAddress }: Props) {
  const { t } = useLanguage();
  const {
    account,
    connectWallet,
    error: walletError,
    isConnecting,
    isCorrectNetwork,
    switchNetwork,
    targetChainName,
  } = useWallet();
  const [platformAddress, setPlatformAddress] = useState(defaultPlatformAddress ?? "");
  const [preview, setPreview] = useState<ICreateAdminRewardSettlementResponse | null>(null);
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [createSettlement, { isLoading: isCreatingPreview }] = useCreateAdminRewardSettlementMutation();
  const [deleteSettlement, { isLoading: isDeletingSettlements }] =
    useDeleteAdminRewardSettlementMutation();
  const [getSettlement] = useLazyGetAdminRewardSettlementQuery();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({ chainId: DEFAULT_CHAIN_ID });

  useEffect(() => {
    if (isOpen) {
      setPlatformAddress(defaultPlatformAddress ?? "");
      setPreview(null);
      setExecutionResults([]);
      setIsExecuting(false);
    }
  }, [defaultPlatformAddress, isOpen]);

  const isPreviewMode = !!preview;
  const isBusy = isCreatingPreview || isExecuting || isDeletingSettlements;
  const canCreatePreview = isAddress(platformAddress);
  const canExecute = !!preview && !isBusy && preview.settlements.length > 0;
  const createdHashes = useMemo(() => {
    return new Map(executionResults.map((item) => [item.settlementId, item.txHash]));
  }, [executionResults]);
  const hasSubmittedTransactions = createdHashes.size > 0;

  const handleClose = () => {
    if (isBusy) return;
    onClose();
  };

  const handleCreatePreview = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAddress(platformAddress)) {
      toast.error(t("invalidWalletAddress"));
      return;
    }

    try {
      const response = await createSettlement({
        chainId: DEFAULT_CHAIN_ID,
        paymentTokenAddress: DEFAULT_PAYMENT_TOKEN_ADDRESS,
        platformAddress: getAddress(platformAddress),
      }).unwrap();

      setPreview(response);
      setExecutionResults([]);
      toast.success(t("settlementPreviewCreated"));
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      toast.error(apiError?.data?.message ?? t("settlementPreviewFailed"));
    }
  };

  const handleExecute = async () => {
    if (!preview) return;

    if (!account) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }

    if (!publicClient) {
      toast.error(t("walletClientUnavailable"));
      return;
    }

    try {
      setIsExecuting(true);
      const hashes: ExecutionResult[] = [];
      const allowanceRequirements = buildAllowanceRequirements(preview.settlements);
      const simulatedRequests: Array<{
        settlementId: string;
        request: unknown;
      }> = [];

      for (const requirement of allowanceRequirements) {
        const currentAllowance = await publicClient.readContract({
          abi: erc20Abi,
          address: requirement.paymentToken as `0x${string}`,
          functionName: "allowance",
          args: [getAddress(account), requirement.spender as `0x${string}`],
        });

        if (currentAllowance >= requirement.requiredAmount) {
          continue;
        }

        toast.loading(t("approvalInProgress"), {
          id: `approval-${requirement.paymentToken}-${requirement.spender}`,
        });

        const approvalSimulation = await publicClient.simulateContract({
          abi: erc20Abi,
          account: getAddress(account),
          address: requirement.paymentToken as `0x${string}`,
          functionName: "approve",
          args: [requirement.spender as `0x${string}`, requirement.requiredAmount],
        });

        const approvalHash = await writeContractAsync(
          approvalSimulation.request as Parameters<typeof writeContractAsync>[0],
        );

        await publicClient.waitForTransactionReceipt({ hash: approvalHash });

        toast.success(t("approvalSuccess"), {
          id: `approval-${requirement.paymentToken}-${requirement.spender}`,
        });
      }

      for (const settlement of preview.settlements) {
        const contractCall = preview.contractCalls.find(
          (item) => item.settlementId === settlement.id,
        );

        if (!contractCall) {
          throw new Error(t("settlementContractCallMissing"));
        }

        const simulation = await publicClient.simulateContract({
          abi: rewardDistributorAbi,
          account: getAddress(account),
          address: getAddress(settlement.distributorAddress),
          functionName: "bulkDistribute",
          args: [
            getAddress(settlement.contractArguments.paymentToken),
            getAddress(settlement.contractArguments.platform),
            settlement.contractArguments.recipients.map((recipient) => getAddress(recipient)),
            settlement.contractArguments.amounts.map((amount) => BigInt(amount)),
            BigInt(settlement.contractArguments.totalAmount),
          ],
          value: BigInt(contractCall.value || "0"),
        });

        simulatedRequests.push({
          settlementId: settlement.id,
          request: simulation.request,
        });
      }

      for (const simulatedRequest of simulatedRequests) {
        const txHash = await writeContractAsync(
          simulatedRequest.request as Parameters<typeof writeContractAsync>[0],
        );

        await publicClient.waitForTransactionReceipt({ hash: txHash });

        hashes.push({
          settlementId: simulatedRequest.settlementId,
          txHash,
        });
      }

      setExecutionResults(hashes);
      toast.success(t("settlementTransactionsSubmitted"));

      void (async () => {
        for (const settlementId of hashes.map((item) => item.settlementId)) {
          for (let attempt = 0; attempt < MAX_STATUS_POLL_ATTEMPTS; attempt += 1) {
            try {
              const latestSettlement = await getSettlement(settlementId, false).unwrap();

              setPreview((currentPreview) => {
                if (!currentPreview) {
                  return currentPreview;
                }

                return mergeSettlementUpdate(currentPreview, latestSettlement);
              });

              const latestStatus = latestSettlement.status.toLowerCase();

              if (latestStatus === "completed" || latestStatus === "failed") {
                break;
              }
            } catch {
              // Keep polling unless attempts are exhausted.
            }

            await sleep(POLL_INTERVAL_MS);
          }
        }
      })();
    } catch (error) {
      const message = error instanceof Error ? error.message : t("settlementSimulationFailed");
      toast.error(message);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDeletePreview = async () => {
    if (!preview || hasSubmittedTransactions) return;

    const shouldDelete = window.confirm(
      t("deleteSettlementConfirmation", {
        count: String(preview.settlements.length),
      }),
    );

    if (!shouldDelete) {
      return;
    }

    const currentPreview = preview;
    const settlementIds = currentPreview.settlements.map((settlement) => settlement.id);
    const results = await Promise.allSettled(
      settlementIds.map((settlementId) => deleteSettlement(settlementId).unwrap()),
    );

    const failedResults = results.filter((result) => result.status === "rejected");

    if (failedResults.length === 0) {
      setPreview(null);
      setExecutionResults([]);
      toast.success(t("settlementDeleted"));
      return;
    }

    const successfulIds = settlementIds.filter(
      (_, index) => results[index]?.status === "fulfilled",
    );

    if (successfulIds.length > 0) {
      const remainingSettlements = currentPreview.settlements.filter(
        (settlement) => !successfulIds.includes(settlement.id),
      );

      setPreview(buildPreviewFromSettlements(currentPreview, remainingSettlements));
    }

    const firstError = failedResults[0];
    const apiError =
      firstError && firstError.status === "rejected"
        ? (firstError.reason as ApiErrorResponse)
        : undefined;

    toast.error(apiError?.data?.message ?? t("settlementDeleteFailed"));
  };

  const primaryButtonLabel = !account
    ? isConnecting
      ? t("connectingWallet")
      : t("connectWallet")
    : !isCorrectNetwork
      ? t("switchToTargetNetwork", { chain: targetChainName })
      : t("executeContractCalls");

  return (
    <GenericModal isOpen={isOpen} onClose={handleClose} maxWidth="56rem">
      <div className="max-h-[80vh] space-y-6 overflow-y-auto pr-2">
        <div>
          <h2 className="text-lg font-semibold text-white">{t("createSettlement")}</h2>
          <p className="mt-1 text-sm text-gray-400">{t("createSettlementDescription")}</p>
        </div>

        {!isPreviewMode ? (
          <form onSubmit={handleCreatePreview} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-gray-400">{t("chainId")}</p>
                <p className="mt-1 text-sm font-medium text-white">{DEFAULT_CHAIN_ID}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-gray-400">{t("paymentToken")}</p>
                <p className="mt-1 text-sm font-medium text-white">{DEFAULT_PAYMENT_TOKEN_SYMBOL}</p>
                <p className="mt-1 font-mono text-xs text-gray-400">{DEFAULT_PAYMENT_TOKEN_ADDRESS}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">{t("platformAddress")}</label>
              <input
                type="text"
                value={platformAddress}
                onChange={(event) => setPlatformAddress(event.target.value)}
                placeholder="0x..."
                className="h-11 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#50FF56]"
              />
              <p className="text-xs text-gray-500">{t("platformAddressHelp")}</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose} type="button" disabled={isBusy}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={!canCreatePreview || isBusy}>
                {isCreatingPreview ? <Loading size="sm" /> : t("previewSettlement")}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl border border-[#50FF56]/20 bg-[#50FF56]/5 p-4 text-sm text-gray-200">
              {t("settlementPreviewNotice")}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <PreviewMetric
                label={t("batchGroup")}
                value={truncateAddress(preview.batchGroupId)}
                detail={preview.batchGroupId}
              />
              <PreviewMetric
                label={t("totalSettlements")}
                value={String(preview.totalSettlements)}
                detail={`${preview.totalRewardCount} rewards`}
              />
              <PreviewMetric
                label={t("totalUserAmount")}
                value={`${formatAmount(preview.totalUserAmount)} ${DEFAULT_PAYMENT_TOKEN_SYMBOL}`}
              />
              <PreviewMetric
                label={t("totalPlatformAmount")}
                value={`${formatAmount(preview.totalPlatformAmount)} ${DEFAULT_PAYMENT_TOKEN_SYMBOL}`}
                detail={`${formatAmount(preview.totalAmount)} ${DEFAULT_PAYMENT_TOKEN_SYMBOL} total`}
              />
            </div>

            <div className="space-y-4">
              {preview.settlements.map((settlement) => {
                const txHash = createdHashes.get(settlement.id);
                return (
                  <SettlementPreviewCard
                    key={settlement.id}
                    settlement={{
                      ...settlement,
                      txHash: txHash ?? settlement.txHash,
                    }}
                    chainId={DEFAULT_CHAIN_ID}
                    t={t}
                  />
                );
              })}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300">
              <p className="font-medium text-white">{t("walletStatus")}</p>
              <p className="mt-1 text-xs text-gray-400">
                {walletError
                  ? walletError
                  : !account
                    ? t("walletNotConnected")
                    : !isCorrectNetwork
                      ? t("walletWrongNetwork", { chain: targetChainName })
                      : t("walletReady")}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              {!hasSubmittedTransactions ? (
                <Button
                  variant="destructive"
                  onClick={() => void handleDeletePreview()}
                  type="button"
                  disabled={isBusy}
                >
                  {isDeletingSettlements ? <Loading size="sm" /> : t("deleteSettlements")}
                </Button>
              ) : null}
              <Button variant="outline" onClick={handleClose} type="button" disabled={isBusy}>
                {t("close")}
              </Button>
              <Button onClick={() => void handleExecute()} disabled={!canExecute || isConnecting}>
                {isBusy ? <Loading size="sm" /> : primaryButtonLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </GenericModal>
  );
}