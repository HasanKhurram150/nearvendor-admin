"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { ChevronRight } from "lucide-react";

export interface Complaint {
  id: string;
  reporterName: string;
  reporterEmail: string;
  reportedUserName: string;
  reportedUserEmail: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
}

const mockComplaints: Complaint[] = [
  {
    id: "COMP-001",
    reporterName: "Alice Johnson",
    reporterEmail: "alice@example.com",
    reportedUserName: "Bob Smith",
    reportedUserEmail: "bob@example.com",
    reason: "Harassment in direct messages.",
    status: "pending",
    createdAt: "2024-04-10",
  },
  {
    id: "COMP-002",
    reporterName: "Charlie Brown",
    reporterEmail: "charlie@example.com",
    reportedUserName: "Dave Miller",
    reportedUserEmail: "dave@example.com",
    reason: "Fraudulent transaction attempt.",
    status: "pending",
    createdAt: "2024-04-12",
  },
  {
    id: "COMP-003",
    reporterName: "Eve White",
    reporterEmail: "eve@example.com",
    reportedUserName: "Frank Black",
    reportedUserEmail: "frank@example.com",
    reason: "Inappropriate content in NFT description.",
    status: "resolved",
    createdAt: "2024-04-05",
  },
];

export function ComplaintsList() {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/complaints/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Complaints Management</h2>
        <p className="text-gray-500 text-sm">Review and take action on user reported complaints.</p>
      </div>

      <div className="dashboard-card border border-white/5 bg-[#11192E] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow hoverable={false} className="border-b border-white/5">
              <TableCell isHeader>Reporter</TableCell>
              <TableCell isHeader>Reported User</TableCell>
              <TableCell isHeader>Reason</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Date</TableCell>
              <TableCell isHeader className="w-10">
                {""}
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockComplaints.map((complaint) => (
              <TableRow
                key={complaint.id}
                onClick={() => handleRowClick(complaint.id)}
                className="cursor-pointer group"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{complaint.reporterName}</span>
                    <span className="text-xs text-gray-500">{complaint.reporterEmail}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{complaint.reportedUserName}</span>
                    <span className="text-xs text-gray-500">{complaint.reportedUserEmail}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-300 line-clamp-1 max-w-[200px]">{complaint.reason}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    color={
                      complaint.status === "pending"
                        ? "warning"
                        : complaint.status === "resolved"
                        ? "success"
                        : "light"
                    }
                    variant="light"
                    size="sm"
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500 font-mono text-xs">{complaint.createdAt}</span>
                </TableCell>
                <TableCell>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {mockComplaints.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500">No complaints found. Everything looks good!</p>
        </div>
      )}
    </div>
  );
}
