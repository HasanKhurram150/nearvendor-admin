"use client";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Badge from "@/components/ui/badge/Badge";
import { useRouter } from "next/navigation";

export function TopSellingNfts({ nfts }: { nfts: any[] | undefined }) {

  const router = useRouter();

  const handleClick = () => (router.push("/user-management"))

  if (!nfts || nfts.length === 0) return (
    <div className="dashboard-card p-6 h-full flex flex-col justify-center items-center text-gray-500 border border-white/4">
      Recent activity will appear here.
    </div>
  );

  return (
    <div className="dashboard-card h-full flex flex-col border border-white/4 overflow-hidden">
      <div className="px-6 py-5 border-b border-[#222328]">
        <h3 className="text-[16px] font-medium text-white">Recent Activity</h3>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase tracking-wider text-start">User</th>
              <th className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase tracking-wider text-start">Role</th>
              <th className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase tracking-wider text-start">Status</th>
              <th className="px-6 py-4 text-[11px] font-medium text-gray-500 uppercase tracking-wider text-end">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {nfts.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={user.photoUrl || "/images/user/userProfile.png"}
                        alt={user.fullName || "User"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate max-w-[120px]">{user.fullName || "Anonymous"}</p>
                      <p className="text-[11px] text-gray-500 truncate max-w-[120px]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge color={user.role === "VENDOR" ? "info" : "light"} size="sm" variant="light">
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`} />
                    <span className={user.isActive ? "text-green-500/80" : "text-red-500/80"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-end text-xs text-gray-500 font-mono">
                  {dayjs(user.createdAt).format("DD MMM")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-white/[0.01] border-t border-white/5">
        <button onClick={handleClick} className="w-full py-2 text-[11px] text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-bold">
          View All Members
        </button>
      </div>
    </div>
  );
}
