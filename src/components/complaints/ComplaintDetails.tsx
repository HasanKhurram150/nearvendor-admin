"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ShieldAlert, UserX, CheckCircle, Trash2 } from "lucide-react";
import Badge from "@/components/ui/badge/Badge";

interface ComplaintDetailProps {
  id: string;
}

// In a real app, this would be fetched from an API
const getComplaintById = (id: string) => ({
  id,
  reporter: {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/images/user/userProfile.png",
    role: "User",
    joinedDate: "2023-10-12",
  },
  reportedUser: {
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/images/user/userProfile.png",
    role: "Vendor",
    joinedDate: "2023-05-20",
    status: "Active",
  },
  reason: "Harassment in direct messages. The user sent multiple inappropriate messages after being asked to stop.",
  status: "pending",
  createdAt: "2024-04-10 14:30:00",
  evidence: "https://example.com/evidence-screenshot.png",
});

export function ComplaintDetails({ id }: ComplaintDetailProps) {
  const router = useRouter();
  const [complaint, setComplaint] = useState(getComplaintById(id));
  const [isBlocking, setIsBlocking] = useState(false);

  const handleBlockUser = () => {
    setIsBlocking(true);
    // Mock API call
    setTimeout(() => {
      alert(`User ${complaint.reportedUser.name} has been blocked.`);
      setIsBlocking(false);
      router.back();
    }, 1000);
  };

  const handleResolve = () => {
    alert("Complaint marked as resolved.");
    router.back();
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        Back to Complaints
      </button>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Complaint {id}</h2>
          <Badge color="warning" variant="light" size="md">
            {complaint.status.toUpperCase()}
          </Badge>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResolve}
            className="flex items-center gap-2 bg-success-500/10 hover:bg-success-500/20 text-success-500 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <CheckCircle size={18} />
            Resolve
          </button>
          <button
            onClick={handleBlockUser}
            disabled={isBlocking}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <UserX size={18} />
            {isBlocking ? "Blocking..." : "Block User"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Complaint Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="dashboard-card p-6 border border-white/5 bg-[#11192E]">
            <h3 className="text-lg font-medium text-white mb-4">Complaint Description</h3>
            <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {complaint.reason}
            </p>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Submitted On</h4>
              <p className="text-white font-mono">{complaint.createdAt}</p>
            </div>
          </div>

          <div className="dashboard-card p-6 border border-white/5 bg-[#11192E]">
            <h3 className="text-lg font-medium text-white mb-4">Evidence</h3>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-dashed border-white/10">
              <ShieldAlert size={48} className="text-gray-700" />
              <p className="text-gray-500 text-sm mt-2 absolute bottom-4">Screenshot evidence would appear here</p>
            </div>
          </div>
        </div>

        {/* Right Column: User Info */}
        <div className="space-y-6">
          <div className="dashboard-card p-6 border border-white/5 bg-[#11192E]">
            <h3 className="text-lg font-medium text-white mb-4">Reported User (Target)</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5" />
              <div>
                <p className="text-white font-semibold">{complaint.reportedUser.name}</p>
                <p className="text-xs text-gray-500">{complaint.reportedUser.email}</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Role</span>
                <span className="text-white">{complaint.reportedUser.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Joined</span>
                <span className="text-white">{complaint.reportedUser.joinedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Account Status</span>
                <Badge color="success" size="sm" variant="light">{complaint.reportedUser.status}</Badge>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-6 border border-white/5 bg-[#11192E]">
            <h3 className="text-lg font-medium text-white mb-4">Reporter</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5" />
              <div>
                <p className="text-white font-semibold">{complaint.reporter.name}</p>
                <p className="text-xs text-gray-500">{complaint.reporter.email}</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Role</span>
                <span className="text-white">{complaint.reporter.role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Joined</span>
                <span className="text-white">{complaint.reporter.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
