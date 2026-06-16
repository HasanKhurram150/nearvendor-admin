"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { adminBroadcastsAPI } from "@/services/notifications/admin-broadcasts/admin-broadcasts-api";
import {
  BroadcastItem,
  GetBroadcastDetailsOutputDto,
  NotificationTargetType,
  CategoryType,
} from "@/services/notifications/admin-broadcasts/admin-broadcasts-types";
import Button from "../ui/button/Button";
import { Plus } from "lucide-react";

interface AdminBroadcastsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminBroadcastsModal: React.FC<AdminBroadcastsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"send" | "history">("send");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Send Broadcast State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetType, setTargetType] = useState<string>(NotificationTargetType.ALL);
  const [targetCategory, setTargetCategory] = useState("");
  const [targetUserId, setTargetUserId] = useState("");

  // History State
  const [history, setHistory] = useState<BroadcastItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Detail State
  const [selectedBroadcast, setSelectedBroadcast] =
    useState<GetBroadcastDetailsOutputDto | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === "history") {
      fetchHistory();
    }
  }, [isOpen, activeTab]);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await adminBroadcastsAPI.getBroadcasts({
        page: 1,
        limit: 50,
      });
      setHistory(res.data.items || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await adminBroadcastsAPI.sendBroadcast({
        title,
        body,
        imageUrl: imageUrl || undefined,
        targetType,
        targetCategory:
          targetType === NotificationTargetType.SPECIFIC_CATEGORY ? targetCategory : undefined,
        targetUserId:
          targetType === NotificationTargetType.SPECIFIC_USER ? targetUserId : undefined,
      });
      setSuccessMsg("Broadcast sent successfully!");
      setTitle("");
      setBody("");
      setImageUrl("");
      setTargetType(NotificationTargetType.ALL);
      setTargetCategory("");
      setTargetUserId("");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to send broadcast.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      setDetailLoading(true);
      const res = await adminBroadcastsAPI.getBroadcastDetails(id);
      setSelectedBroadcast(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load details.");
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-3xl w-full sm:w-[600px]"
    >
      <div className="p-6 h-[80vh] flex flex-col">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Admin Broadcasts
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          <Button
            onClick={() => {
              setActiveTab("send");
              setSelectedBroadcast(null);
              setError(null);
              setSuccessMsg(null);
            }}
            size="sm"
            variant="primary"
            startIcon={<Plus size={18} />}
            // className={`py-2 px-4 font-medium transition-colors ${
            //   activeTab === "send"
            //     ? "text-brand-500 border-b-2 border-brand-500"
            //     : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            // }`}
          >
            Send Broadcast
          </Button>
          <button
            className={`py-2 px-4 font-medium transition-colors ${
              activeTab === "history"
                ? "text-brand-500 border-b-2 border-brand-500"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => {
              setActiveTab("history");
              setSelectedBroadcast(null);
              setError(null);
              setSuccessMsg(null);
            }}
          >
            History
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            {successMsg}
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {activeTab === "send" && (
            <form
              onSubmit={handleSendBroadcast}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="e.g. Weekend Sale!"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message Body
                </label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Notification message..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Group
                </label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value={NotificationTargetType.ALL}>All Users</option>
                  <option value={NotificationTargetType.VENDORS}>Vendors Only</option>
                  <option value={NotificationTargetType.CONSUMERS}>Consumers Only</option>
                  <option value={NotificationTargetType.SPECIFIC_CATEGORY}>Specific Category</option>
                  <option value={NotificationTargetType.SPECIFIC_USER}>Specific User</option>
                </select>
              </div>

              {targetType === NotificationTargetType.SPECIFIC_CATEGORY && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category Name
                  </label>
                  <select
                    required
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="" disabled>Select a category</option>
                    {Object.values(CategoryType).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === NotificationTargetType.SPECIFIC_USER && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    User ID
                  </label>
                  <input
                    type="text"
                    required
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="e.g. user-uuid-123"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                variant="primary"
              >
                Send Broadcast
              </Button>
            </form>
          )}

          {activeTab === "history" && !selectedBroadcast && (
            <div>
              {historyLoading ? (
                <div className="text-center text-gray-500 py-8">
                  Loading history...
                </div>
              ) : history.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No broadcasts found.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleViewDetails(item.id)}
                      className="p-4 border rounded-xl border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {item.title}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                        {item.body}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Target: {item.targetType}</span>
                        <span>
                          Delivered: {item.totalDelivered}/{item.totalTargeted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && selectedBroadcast && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => setSelectedBroadcast(null)}
                className="mb-4 text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
              >
                &larr; Back to History
              </button>

              <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {selectedBroadcast.title}
                  </h3>
                  <span className="px-3 py-1 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium">
                    {selectedBroadcast.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedBroadcast.body}
                </p>

                {selectedBroadcast.imageUrl && (
                  <img
                    src={selectedBroadcast.imageUrl}
                    alt="Broadcast visual"
                    className="w-full max-h-48 object-cover rounded-lg mb-6"
                  />
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-xs text-gray-500 mb-1">
                      Target Type
                    </div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {selectedBroadcast.targetType}
                      {selectedBroadcast.targetCategory
                        ? ` (${selectedBroadcast.targetCategory})`
                        : ""}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="text-xs text-gray-500 mb-1">Sent At</div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {selectedBroadcast.sentAt
                        ? new Date(selectedBroadcast.sentAt).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 p-4">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                    Delivery Stats
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {selectedBroadcast.totalTargeted}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Targeted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedBroadcast.totalDelivered}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Delivered
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {selectedBroadcast.totalFailed}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Failed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
