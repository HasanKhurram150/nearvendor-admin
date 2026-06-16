"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { adminBroadcastsAPI } from "@/services/notifications/admin-broadcasts/admin-broadcasts-api";
import { NotificationTargetType, CategoryType } from "@/services/notifications/admin-broadcasts/admin-broadcasts-types";
import Button from "@/components/ui/button/Button";

interface SendBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SendBroadcastModal: React.FC<SendBroadcastModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send Broadcast State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetType, setTargetType] = useState<string>(NotificationTargetType.ALL);
  const [targetCategory, setTargetCategory] = useState("");
  const [targetUserId, setTargetUserId] = useState("");

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await adminBroadcastsAPI.sendBroadcast({
        title,
        body,
        imageUrl: imageUrl || undefined,
        targetType,
        targetCategory: targetType === NotificationTargetType.SPECIFIC_CATEGORY ? targetCategory : undefined,
        targetUserId: targetType === NotificationTargetType.SPECIFIC_USER ? targetUserId : undefined,
      });
      setTitle("");
      setBody("");
      setImageUrl("");
      setTargetType(NotificationTargetType.ALL);
      setTargetCategory("");
      setTargetUserId("");
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to send broadcast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl w-full p-6 sm:p-8 !bg-[#111928] border border-white/10">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Send Broadcast Notification
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSendBroadcast} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            placeholder="e.g. Weekend Sale!"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Message Body
          </label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            placeholder="Notification message..."
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Target Group
          </label>
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05] [&>option]:bg-[#111928]"
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
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Category Name
            </label>
            <select
              required
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05] [&>option]:bg-[#111928]"
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
            <label className="mb-2 block text-sm font-medium text-gray-300">
              User ID
            </label>
            <input
              type="text"
              required
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
              placeholder="e.g. user-uuid-123"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant="primary"
          >
            Send Broadcast
          </Button>
        </div>
      </form>
    </Modal>
  );
};
