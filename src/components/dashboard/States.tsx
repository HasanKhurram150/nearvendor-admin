// "use client";
// import React from "react";
// import Image from "next/image";
// import { IDashboardStats } from "@/services/dashboard-api/dashboard-api.types";
// import { formatNumber } from "@/utils";
// import { dashboardAPI } from "@/services/dashboard-api";
// import { useLanguage } from "../common/LanguageContext";

// export const States = ({ stats }: { stats: IDashboardStats | undefined }) => {
//   const { t } = useLanguage();
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
//       {/* <!-- State Item 1 --> */}
//       <div className="flex items-center gap-4 dashboard-card p-5 md:p-6">
//         <div className="flex items-center justify-center w-[46px] h-[46px] min-w-[46px] rounded-full border border-white/5 bg-white/[0.02]">
//           <svg className="w-[18px] h-[18px] text-white/70" viewBox="0 0 24 24" fill="none">
//             <path d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM19 4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20Z" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <span className="text-[14px] font-medium text-gray-400 tracking-wide truncate">{t("totalEvents")}</span>
//           <h4 className="mt-1 font-bold text-white text-[24px]">
//             {!!stats && formatNumber(stats.totalEvents)}
//           </h4>
//         </div>
//       </div>

//       {/* <!-- State Item 2 --> */}
//       <div className="flex items-center gap-4 dashboard-card p-5 md:p-6">
//         <div className="flex items-center justify-center w-[46px] h-[46px] min-w-[46px] rounded-full border border-white/5 bg-white/[0.02]">
//           <svg className="w-[18px] h-[18px] text-white/70" viewBox="0 0 24 24" fill="none">
//             <path d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM19 4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20Z" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <span className="text-[14px] font-medium text-gray-400 tracking-wide truncate">{t("totalUsers")}</span>
//           <h4 className="mt-1 font-bold text-white text-[24px]">
//             {!!stats && formatNumber(stats.totalUsers)}
//           </h4>
//         </div>
//       </div>

//       {/* <!-- State Item 3 --> */}
//       <div className="flex items-center gap-4 dashboard-card p-5 md:p-6">
//         <div className="flex items-center justify-center w-[46px] h-[46px] min-w-[46px] rounded-full border border-white/5 bg-white/[0.02]">
//           <svg className="w-[18px] h-[18px] text-white/70" viewBox="0 0 24 24" fill="none">
//             <path d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM19 4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20Z" fill="currentColor"/>
//           </svg>
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <span className="text-[14px] font-medium text-gray-400 tracking-wide truncate">{t("dailyEvents")}</span>
//           <h4 className="mt-1 font-bold text-white text-[24px]">
//             {!!stats && formatNumber(stats.dailyEvents)}
//           </h4>
//         </div>
//       </div>
//     </div>
//   );
// };
