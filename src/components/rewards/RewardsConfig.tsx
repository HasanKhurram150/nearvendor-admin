"use client";
import React, { useState } from "react";
import { useGetRewardConfigsQuery } from "@/services/rewards-api";
import { IRewardConfig, IRewardLevel } from "@/services/rewards-api/rewards-api.types";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import { CreateRewardConfigModal } from "./CreateRewardConfigModal";
import { PencilIcon } from "@/icons";
import { useUpdateRewardConfigStatusMutation } from "@/services/rewards-api";
import toast from "react-hot-toast";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";

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
    <div className="flex flex-col gap-1 rounded-xl bg-white/[0.04] p-4 border border-white/[0.08]">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-lg font-semibold text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

interface LevelsTableProps {
  levels: IRewardLevel[];
}

function LevelsTable({ levels }: LevelsTableProps) {
  const { t } = useLanguage();
  if (!levels.length) {
    return (
      <p className="text-sm text-gray-400 mt-2">{t("noLevelsDefined")}</p>
    );
  }
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/[0.08] text-gray-500 dark:text-gray-400">
            <th className="py-2 pr-6 font-medium">{t("level")}</th>
            <th className="py-2 font-medium">{t("percentageBps")} (bps)</th>
            <th className="py-2 pl-6 font-medium">{t("percentage")}</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((lvl) => (
            <tr
              key={lvl.id}
              className="border-b border-white/[0.04] last:border-0 text-gray-700 dark:text-gray-200"
            >
              <td className="py-2 pr-6 font-medium">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#50FF56]/10 text-[#50FF56] text-xs font-bold">
                  {lvl.level}
                </span>
              </td>
              <td className="py-2">{lvl.percentageBps.toLocaleString()}</td>
              <td className="py-2 pl-6 font-semibold text-[#50FF56]">
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
  const [updateStatus, { isLoading: isToggling }] = useUpdateRewardConfigStatusMutation();

  const handleToggleStatus = async () => {
    try {
      await updateStatus({ id: config.id, isActive: !config.isActive }).unwrap();
      toast.success(
        config.isActive ? t("rewardConfigDeactivated") : t("rewardConfigActivated")
      );
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      toast.error(apiError?.data?.message ?? t("rewardConfigStatusFailed"));
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {formatRewardType(config.rewardType)}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
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
                config.isActive ? "bg-[#50FF56]" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  config.isActive ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </span>
            <span className={`text-xs font-medium ${
              config.isActive ? "text-[#50FF56]" : "text-gray-400"
            }`}>
              {config.isActive ? t("active") : t("inactive")}
            </span>
          </button>
          <button
            onClick={() => onEdit(config)}
            title={t("editRewardConfig")}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.1] text-gray-400 hover:text-white hover:border-white/[0.3] transition-colors"
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
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  const [editConfig, setEditConfig] = useState<IRewardConfig | null>(null);
  const params = {
    ...(rewardType ? { rewardType } : {}),
    ...(isActive !== "" ? { isActive: isActive === "true" } : {}),
  };

  const { data: configs, isLoading, isError } = useGetRewardConfigsQuery(params);

  return (
    <>
      <PageBreadcrumb
        pageTitle={t("rewardConfigs")}
        info={t("manageRewardConfigs")}
      />

      {/* Filters + Create button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={rewardType}
            onChange={(e) => setRewardType(e.target.value)}
            placeholder={t("filterByRewardType")}
            className="h-10 rounded-xl border border-white/[0.1] bg-white dark:bg-white/[0.04] px-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#50FF56] w-56"
          />
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value as "" | "true" | "false")}
            className="h-10 rounded-xl border border-white/[0.1] bg-white dark:bg-white/[0.04] px-4 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#50FF56] cursor-pointer"
          >
            <option value="">{t("allStatuses")}</option>
            <option value="true">{t("active")}</option>
            <option value="false">{t("inactive")}</option>
          </select>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-10 px-5 rounded-xl bg-[#50FF56] text-sm font-semibold text-gray-900 hover:bg-[#3edb44] transition-colors"
        >
          + {t("createRewardConfig")}
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loading size="lg" className="border-[#50FF56]" />
        </div>
      ) : isError ? (
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-8 text-center text-gray-400">
          {t("failedToLoad")}
        </div>
      ) : !configs?.length ? (
        <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-8 text-center text-gray-400">
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
