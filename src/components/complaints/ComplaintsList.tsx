"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { getAllReportsAPI } from "@/services/reports/reports-api";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";

export function ComplaintsList() {
  const router = useRouter();

  const { data: queryData, isLoading, isError } = useQuery({
    queryKey: ["reports", 1],
    queryFn: () => getAllReportsAPI.getAllReports({ page: 1, limit: 10 }),
  });

  const data = queryData?.success ? queryData.data : null;

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching reports");
    } else if (queryData && !queryData.success) {
      toast.error("Failed to fetch reports");
    }
  }, [isError, queryData]);

  const handleRowClick = (id: string) => {
    router.push(`/complaints/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  const users = data?.users || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Complaints Management</h2>
        <p className="text-gray-500 text-sm">
          Review and take action on user reported complaints.
        </p>
      </div>

      <div className="dashboard-card border border-white/5 bg-[#11192E] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow hoverable={false} className="border-b border-white/5">
              <TableCell isHeader>User ID</TableCell>
              <TableCell isHeader>Email</TableCell>
              <TableCell isHeader>Report Count</TableCell>
              <TableCell isHeader className="w-10">
                {""}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="cursor-pointer group"
              >
                <TableCell>
                  <span className="text-white font-mono text-xs">{user.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-300 text-sm font-bold">
                    {user.reportCount}
                  </span>
                </TableCell>
                <TableCell>
                  <ChevronRight
                    size={16}
                    className="text-gray-600 group-hover:text-white transition-colors"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500">
            No complaints found. Everything looks good!
          </p>
        </div>
      )}
    </div>
  );
}
