"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { commentsAPI } from "@/services/comments/comments-api";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import Image from "next/image";
import { ConfirmModal } from "../ui/modal/ConfirmModal";

const CommentsManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"all" | "reported">("all");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: "delete" | "resolve" | null;
    id: string | null;
  }>({ isOpen: false, action: null, id: null });

  const { data: allCommentsData, isLoading: isLoadingAll } = useQuery({
    queryKey: ["all-comments", page],
    queryFn: () => commentsAPI.getComments({ page, limit }),
    enabled: activeTab === "all",
  });

  const { data: reportedCommentsData, isLoading: isLoadingReported } = useQuery({
    queryKey: ["reported-comments", page],
    queryFn: () => commentsAPI.getReportedComments({ page, limit }),
    enabled: activeTab === "reported",
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => commentsAPI.deleteComment(id),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
      queryClient.invalidateQueries({ queryKey: ["reported-comments"] });
      setConfirmModal({ isOpen: false, action: null, id: null });
    },
    onError: () => toast.error("Failed to delete comment"),
  });

  const resolveMutation = useMutation({
    mutationFn: (reportId: string) => commentsAPI.resolveCommentReport(reportId),
    onSuccess: () => {
      toast.success("Report resolved successfully");
      queryClient.invalidateQueries({ queryKey: ["reported-comments"] });
      setConfirmModal({ isOpen: false, action: null, id: null });
    },
    onError: () => toast.error("Failed to resolve report"),
  });

  const handleDelete = (id: string) => {
    setConfirmModal({ isOpen: true, action: "delete", id });
  };

  const handleResolve = (reportId: string) => {
    setConfirmModal({ isOpen: true, action: "resolve", id: reportId });
  };

  const handleConfirm = () => {
    if (confirmModal.action === "delete" && confirmModal.id) {
      deleteMutation.mutate(confirmModal.id);
    } else if (confirmModal.action === "resolve" && confirmModal.id) {
      resolveMutation.mutate(confirmModal.id);
    }
  };

  const allComments = allCommentsData?.data?.items || [];
  const reportedComments = reportedCommentsData?.data?.items || [];

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle={"Comments"}
        counter={true}
        counterText="Total"
        counterValue={
          activeTab === "all"
            ? allCommentsData?.data?.pagination?.total || 0
            : reportedCommentsData?.data?.pagination?.total || 0
        }
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="px-6 pt-5 pb-4 flex items-center gap-4 border-b border-[#1D1C1C]">
          <button
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "all"
                ? "bg-brand-500 text-gray-900"
                : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            All Comments
          </button>
          <button
            onClick={() => {
              setActiveTab("reported");
              setPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "reported"
                ? "bg-brand-500 text-gray-900"
                : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Reported Comments
          </button>
        </div>

        <div className="max-w-full overflow-x-auto">
          {activeTab === "all" ? (
            <Table hoverable>
              <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
                <TableRow>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Author</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Content</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Type</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Created At</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-end text-base dark:text-white">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[#1D1C1C]">
                {isLoadingAll ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loading size="lg" className="border-brand-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : allComments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No comments found
                    </TableCell>
                  </TableRow>
                ) : (
                  allComments.map((comment) => (
                    <TableRow key={comment.id} className="hover:bg-white/[0.02]">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {comment.authorPhotoUrl ? (
                            <Image
                              src={comment.authorPhotoUrl}
                              alt={comment.authorName}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-white">
                              {comment.authorName?.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-white">{comment.authorName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                        {comment.text}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          comment.authorType === 'VENDOR' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {comment.authorType}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400">
                        {dayjs(comment.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-end">
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-gray-400 hover:text-error-500"
                          title="Delete Comment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <Table hoverable>
              <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
                <TableRow>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Report Reason</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Comment Content</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Reported By</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-start text-base dark:text-white">Report Date</TableCell>
                  <TableCell isHeader className="py-3 px-6 font-medium text-[#201D1D99] text-end text-base dark:text-white">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[#1D1C1C]">
                {isLoadingReported ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loading size="lg" className="border-brand-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : reportedComments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No reported comments found
                    </TableCell>
                  </TableRow>
                ) : (
                  reportedComments.map(({ report, comment }) => (
                    <TableRow key={report.id} className="hover:bg-white/[0.02]">
                      <TableCell className="px-6 py-4">
                        <p className="text-sm font-medium text-error-400">{report.reason}</p>
                        {report.additionalDetails && (
                          <p className="text-xs text-gray-500 mt-1">{report.additionalDetails}</p>
                        )}
                        <span className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${report.isResolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {report.isResolved ? 'Resolved' : 'Pending'}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                        {comment.text}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400">
                        {report.reportedBy?.name || "Unknown"}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-400">
                        {dayjs(report.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-end">
                        <div className="flex items-center justify-end gap-3">
                          {!report.isResolved && (
                            <button
                              onClick={() => handleResolve(report.id)}
                              className="text-gray-400 hover:text-green-500"
                              title="Resolve Report"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="text-gray-400 hover:text-error-500"
                            title="Delete Comment"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, id: null })}
        onConfirm={handleConfirm}
        title={confirmModal.action === "delete" ? "Delete Comment" : "Resolve Report"}
        message={
          confirmModal.action === "delete"
            ? "Are you sure you want to delete this comment? This action cannot be undone."
            : "Are you sure you want to mark this report as resolved?"
        }
        confirmText={confirmModal.action === "delete" ? "Delete" : "Resolve"}
        isDestructive={confirmModal.action === "delete"}
        isLoading={deleteMutation.isPending || resolveMutation.isPending}
      />
    </div>
  );
};

export default CommentsManagement;
