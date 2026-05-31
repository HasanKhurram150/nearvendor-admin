"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ShieldAlert,
} from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import { getReportsByIdAPI } from "@/services/reports-by-id/reports-by-id-api";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";

interface ComplaintDetailProps {
  id: string;
}

export function ComplaintDetails({ id }: ComplaintDetailProps) {
  const router = useRouter();

  const { data: queryData, isLoading, isError } = useQuery({
    queryKey: ["reportDetails", id],
    queryFn: () => getReportsByIdAPI.getReportsById({ id }),
    enabled: !!id,
  });

  const data = queryData?.success ? queryData.data : null;

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching details");
    } else if (queryData && !queryData.success) {
      toast.error("Failed to fetch report details");
    }
  }, [isError, queryData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  const reports = data?.reports || [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors w-fit"
      >
        <ChevronLeft size={20} />
        Back to Complaints
      </button>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">User Reports</h2>
          <Badge color="info" variant="light" size="md">
            {reports.length} TOTAL REPORTS
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="dashboard-card p-6 border border-white/5 bg-[#11192E] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Reporter ID
                  </span>
                  <span className="text-white font-mono text-xs">
                    {report.reporterId}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500/80 mb-2">
                  Reason
                </h4>
                <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 text-sm">
                  {report.reason}
                </p>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="dashboard-card p-12 flex flex-col items-center justify-center text-center bg-[#11192E] border border-dashed border-white/10">
              <ShieldAlert size={48} className="text-gray-700 mb-4" />
              <p className="text-gray-500 font-medium">
                No report records found for this user.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="dashboard-card p-6 border border-white/5 bg-[#11192E]">
            <h3 className="text-lg font-medium text-white mb-4">Target INFO</h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500/80">
                  User ID
                </span>
                <span className="text-xs font-mono text-gray-300 break-all">
                  {id}
                </span>
              </div>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                This page shows all complaints filed against the user account
                identified above. Review each report carefully before taking
                moderation action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
