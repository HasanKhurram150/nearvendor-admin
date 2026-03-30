"use client";
import React, { useState } from "react";
// import { useGetRewardConfigsQuery } from "@/services/rewards-api";
// import { IRewardConfig, IRewardLevel } from "@/services/rewards-api/rewards-api.types";
type IRewardConfig = any;
type IRewardLevel = any;
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import { CreateRewardConfigModal } from "./CreateRewardConfigModal";
import { PencilIcon } from "@/icons";
// import { useUpdateRewardConfigStatusMutation } from "@/services/rewards-api";
import toast from "react-hot-toast";
import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";

function bpsToPercent(bps: number): string {
  return (bps / 100).toFixed(2).replace(/\.00$/, "") + "%";
}

function formatRewardType(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-white/[0.02] p-4 border border-[#1D1C1C]">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-white">{value}</span>
    </div>
  );
}

interface LevelsTableProps {
  levels: IRewardLevel[];
}

function LevelsTable({ levels }: LevelsTableProps) {
  const { t } = useLanguage();
  if (!levels.length) {
    return <p className="text-sm text-gray-400 mt-2">{t("noLevelsDefined")}</p>;
  }
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        <thead className="bg-white/[0.02] border-b border-[#1D1C1C]">
          <tr className="text-gray-500">
            <th className="py-2.5 px-4 font-medium">{t("level")}</th>
            <th className="py-2.5 px-4 font-medium">
              {t("percentageBps")} (bps)
            </th>
            <th className="py-2.5 px-4 font-medium">{t("percentage")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1D1C1C]">
          {levels.map((lvl) => (
            <tr key={lvl.id} className="text-gray-300">
              <td className="py-2.5 px-4 font-medium">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFFF00]/10 text-[#FFFF00] text-xs font-bold">
                  {lvl.level}
                </span>
              </td>
              <td className="py-2.5 px-4">
                {lvl.percentageBps.toLocaleString()}
              </td>
              <td className="py-2.5 px-4 font-semibold text-[#FFFF00]">
                {bpsToPercent(lvl.percentageBps)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RewardConfigCardProps {
  config: IRewardConfig;
  onEdit: (config: IRewardConfig) => void;
}

function RewardConfigCard({ config, onEdit }: RewardConfigCardProps) {
  const { t } = useLanguage();
  // const [updateStatus, { isLoading: isToggling }] = useUpdateRewardConfigStatusMutation();
  const updateStatus = async (...args: any[]) => ({ unwrap: () => {} });
  const isToggling = false;

  const handleToggleStatus = async () => {
    try {
      await updateStatus({
        id: config.id,
        isActive: !config.isActive,
      }).unwrap();
      toast.success(
        config.isActive
          ? t("rewardConfigDeactivated")
          : t("rewardConfigActivated"),
      );
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      toast.error(apiError?.data?.message ?? t("rewardConfigStatusFailed"));
    }
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white">
            {formatRewardType(config.rewardType)}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">
            {config.rewardType}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleStatus}
            disabled={isToggling}
            title={config.isActive ? t("deactivate") : t("activate")}
            className="flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                config.isActive ? "bg-[#FFFF00]" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  config.isActive ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </span>
            <span
              className={`text-xs font-medium ${
                config.isActive ? "text-[#FFFF00]" : "text-gray-400"
              }`}
            >
              {config.isActive ? t("active") : t("inactive")}
            </span>
          </button>
          <button
            onClick={() => onEdit(config)}
            title={t("editRewardConfig")}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#1D1C1C] text-gray-400 hover:text-white hover:border-white/[0.3] transition-colors bg-white/[0.02]"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard
          label={t("purchaseFee")}
          value={bpsToPercent(config.purchaseFeeBps)}
        />
        <StatCard
          label={t("platformShare")}
          value={bpsToPercent(config.platformShareBps)}
        />
        <StatCard
          label={t("referralShare")}
          value={bpsToPercent(config.referralShareBps)}
        />
        <StatCard
          label={t("defaultLevelPercentage")}
          value={bpsToPercent(config.defaultLevelPercentageBps)}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-1">
          {t("rewardLevels")}
        </h4>
        <LevelsTable levels={config.levels} />
      </div>
    </div>
  );
}

export default function RewardsConfig() {
  const { t } = useLanguage();
  const [rewardType, setRewardType] = useState("");
  const [isActive, setIsActive] = useState<"" | "true" | "false">("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editConfig, setEditConfig] = useState<IRewardConfig | null>(null);
  const params = {
    ...(rewardType ? { rewardType } : {}),
    ...(isActive !== "" ? { isActive: isActive === "true" } : {}),
  };

  // const { data: configs, isLoading, isError } = useGetRewardConfigsQuery(params);
  const configs: any[] = [];
  const isLoading = false;
  const isError = false;

  return (
    <>
      <PageBreadcrumb
        pageTitle={t("rewardConfigs")}
        info={t("manageRewardConfigs")}
      />

      {/* Filters + Create button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-3">
          <Input
            value={rewardType}
            onChange={(e) => setRewardType(e.target.value)}
            placeholder={t("filterByRewardType")}
            className="w-56"
          />
          <Select
            options={[
              { value: "", label: t("allStatuses") },
              { value: "true", label: t("active") },
              { value: "false", label: t("inactive") },
            ]}
            defaultValue={isActive}
            onChange={(val) => setIsActive(val as "" | "true" | "false")}
            className="w-[180px]"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} variant="success">
          + {t("createRewardConfig")}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loading size="lg" className="border-[#FFFF00]" />
        </div>
      ) : isError ? (
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-8 text-center text-gray-400">
          {t("failedToLoad")}
        </div>
      ) : !configs?.length ? (
        <div className="dashboard-card p-8 text-center text-gray-400">
          {t("noRewardConfigsFound")}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {configs.map((config) => (
            <RewardConfigCard
              key={config.id}
              config={config}
              onEdit={(c) => setEditConfig(c)}
            />
          ))}
        </div>
      )}

      <CreateRewardConfigModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <CreateRewardConfigModal
        isOpen={!!editConfig}
        onClose={() => setEditConfig(null)}
        config={editConfig ?? undefined}
      />
    </>
  );
}
