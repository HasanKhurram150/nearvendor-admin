"use client";
import React, { useState, useEffect } from "react";
import { Plus, RefreshCw, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { adminBroadcastsAPI } from "@/services/notifications/admin-broadcasts/admin-broadcasts-api";
import {
  BroadcastItem,
  GetBroadcastDetailsOutputDto,
} from "@/services/notifications/admin-broadcasts/admin-broadcasts-types";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/atoms/loading/loading";
import Badge from "@/components/ui/badge/Badge";
import { cn } from "@/utils/cn";
import { SendBroadcastModal } from "@/components/notifications/SendBroadcastModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

export default function AdminBroadcastsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState<BroadcastItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  // Detail Modal State
  const [selectedBroadcast, setSelectedBroadcast] =
    useState<GetBroadcastDetailsOutputDto | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await adminBroadcastsAPI.getBroadcasts({
        page: 1,
        limit: 20,
      });
      setHistory(res.data.items || []);
      setTotalRecords(res.data.pagination?.total || 0);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load broadcast history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      setIsDetailModalOpen(true);
      setDetailLoading(true);
      const res = await adminBroadcastsAPI.getBroadcastDetails(id);
      setSelectedBroadcast(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load broadcast details.");
      setIsDetailModalOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const statusBadgeColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "SENT":
      case "COMPLETED":
        return "success";
      case "FAILED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        return "light";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle="Broadcast Notifications"
        counter={true}
        counterText="Total Sent"
        counterValue={totalRecords}
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        {/* Toolbar: Refresh + Add Button */}
        <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => fetchHistory()}
            disabled={historyLoading}
            className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-white transition-colors border rounded-full border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh history"
          >
            <RefreshCw
              size={16}
              className={cn(historyLoading && "animate-spin")}
            />
          </button>

          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="primary"
            startIcon={<Plus size={18} />}
          >
            Send Broadcast
          </Button>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <Table hoverable>
            <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 pl-6 pr-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[14rem]"
                >
                  Title & Message
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
                >
                  Target
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
                >
                  Delivered
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[7rem]"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 pl-3 pr-6 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[10rem]"
                >
                  Sent At
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              {historyLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-brand-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : history.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No broadcast history found.
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleViewDetails(item.id)}
                    className="cursor-pointer group"
                  >
                    <TableCell className="pl-6 pr-3 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-white/90">
                          {item.title || "—"}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[20rem]">
                          {item.body || "—"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-3 py-4">
                      <span className="text-sm text-gray-300 capitalize">
                        {item.targetType || "—"}
                      </span>
                    </TableCell>

                    <TableCell className="px-3 py-4">
                      <span className="text-sm text-white/80">
                        {item.totalDelivered}/{item.totalTargeted}
                      </span>
                    </TableCell>

                    <TableCell className="px-3 py-4">
                      <Badge
                        variant="light"
                        color={statusBadgeColor(item.status)}
                        size="sm"
                      >
                        {item.status || "—"}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-4 pl-3 pr-6 text-right">
                      <span className="text-sm text-gray-400">
                        {item.sentAt
                          ? new Date(item.sentAt).toLocaleString()
                          : "—"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modals */}
      <SendBroadcastModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          toast.success("Broadcast sent successfully!");
          fetchHistory();
        }}
      />

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        className="max-w-2xl w-full p-6 sm:p-8 !bg-[#111928] border border-white/10"
      >
        {detailLoading ? (
          <div className="flex justify-center py-12">
            <Loading size="lg" className="border-brand-500" />
          </div>
        ) : selectedBroadcast ? (
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">
                {selectedBroadcast.title}
              </h3>
              <Badge
                variant="light"
                color={statusBadgeColor(selectedBroadcast.status)}
              >
                {selectedBroadcast.status}
              </Badge>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {selectedBroadcast.body}
            </p>

            {selectedBroadcast.imageUrl && (
              <img
                src={selectedBroadcast.imageUrl}
                alt="Broadcast visual"
                className="w-full max-h-64 object-cover rounded-xl border border-white/10 mb-8"
              />
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  Target Type
                </div>
                <div className="text-sm font-semibold text-white/90">
                  {selectedBroadcast.targetType}
                  {selectedBroadcast.targetCategory
                    ? ` (${selectedBroadcast.targetCategory})`
                    : ""}
                </div>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  Sent At
                </div>
                <div className="text-sm font-semibold text-white/90">
                  {selectedBroadcast.sentAt
                    ? new Date(selectedBroadcast.sentAt).toLocaleString()
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-6">
              <h4 className="font-medium text-white mb-5 text-sm uppercase tracking-wider text-center">
                Delivery Statistics
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {selectedBroadcast.totalTargeted}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium uppercase">
                    Targeted
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    {selectedBroadcast.totalDelivered}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium uppercase">
                    Delivered
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">
                    {selectedBroadcast.totalFailed}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium uppercase">
                    Failed
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Could not load details.
          </div>
        )}
      </Modal>
    </div>
  );
}
