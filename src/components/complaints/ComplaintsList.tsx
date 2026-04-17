"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { ChevronRight } from "lucide-react";
import { getAllReportsAPI } from "@/services/reports/reports-api";
import { GetAllReportsOutputDto } from "@/services/reports/reports-api-types";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export function ComplaintsList() {
  const router = useRouter();
  const [data, setData] = useState<GetAllReportsOutputDto["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await getAllReportsAPI.getAllReports({ page, limit: 10 });
      if (res.success) {
        setData(res.data);
      } else {
        toast.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("An error occurred while fetching reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

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
              <TableCell isHeader>User</TableCell>
              <TableCell isHeader>Email</TableCell>
              <TableCell isHeader>Role</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Reported On</TableCell>
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
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px]">
                          {user.fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-white font-medium">
                      {user.fullName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-300 text-sm uppercase tracking-wider text-[10px] font-bold">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    color={user.isActive ? "success" : "error"}
                    variant="light"
                    size="sm"
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500 font-mono text-xs">
                    {dayjs(user.createdAt).format("DD MMM YYYY")}
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
