"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ShieldAlert,
  UserX,
  CheckCircle,
  Clock,
} from "lucide-react";
import Badge from "@/components/ui/badge/Badge";
import { getReportsByIdAPI } from "@/services/reports-by-id/reports-by-id-api";
import { GetReportsByIdOutputDto } from "@/services/reports-by-id/reports-by-id-types";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import Image from "next/image";
import dayjs from "dayjs";

interface ComplaintDetailProps {
  id: string;
}

export function ComplaintDetails({ id }: ComplaintDetailProps) {
  const router = useRouter();
  const [data, setData] = useState<GetReportsByIdOutputDto["data"] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getReportsByIdAPI.getReportsById({ id });
      if (res.success) {
        setData(res.data);
      } else {
        toast.error("Failed to fetch report details");
      }
    } catch (error) {
      console.error("Error fetching report details:", error);
      toast.error("An error occurred while fetching details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  const reports = data?.reports || [];
  // Assuming the first report has the basic info for the reported user/reporter context
  const targetUserSummary = reports.length > 0 ? reports[0].reporter : null;

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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    {report.reporter.photoUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={report.reporter.photoUrl}
                          alt={report.reporter.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        {report.reporter.fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {report.reporter.fullName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {report.reporter.email}
                    </span>
                  </div>
                </div>
                <Badge
                  color={report.isResolved ? "success" : "warning"}
                  variant="light"
                  size="sm"
                >
                  {report.isResolved ? "RESOLVED" : "PENDING"}
                </Badge>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500/80 mb-2">
                  Reason
                </h4>
                <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 text-sm">
                  {report.reason}
                </p>
                {report.additionalDetails && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Additional Details
                    </h4>
                    <p className="text-gray-400 text-sm italic">
                      "{report.additionalDetails}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={14} />
                  <span>
                    {dayjs(report.createdAt).format("DD MMM YYYY, HH:mm")}
                  </span>
                </div>
                <div className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Type: {report.targetType}
                </div>
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

            <div className="mt-8 space-y-4 pt-6 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-2 bg-success-500/10 hover:bg-success-500/20 text-success-500 py-3 rounded-xl font-medium transition-colors text-sm">
                <CheckCircle size={18} />
                Mark All as Resolved
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors text-sm">
                <UserX size={18} />
                Deactivate Target User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
