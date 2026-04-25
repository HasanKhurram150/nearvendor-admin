// "use client";
// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { GenericModal } from "../atoms/generic-modal";
// // import {
// //   useCreateRewardConfigMutation,
// //   useUpdateRewardConfigMutation,
// // } from "@/services/rewards-api";
// // import {
// //   ICreateRewardLevelPayload,
// //   IRewardConfig,
// // } from "@/services/rewards-api/rewards-api.types";
// type ICreateRewardLevelPayload = any;
// type IRewardConfig = any;
// import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
// import Loading from "../atoms/loading/loading";
// import { useLanguage } from "../common/LanguageContext";

// const MAX_LEVELS = 10;

// function NumberInput({
//   label,
//   value,
//   onChange,
//   min = 0,
//   suffix,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   min?: number;
//   suffix?: string;
// }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
//         {label}
//       </label>
//       <div className="flex items-center gap-1">
//         <input
//           type="number"
//           min={min}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="h-10 w-full rounded-xl border border-[#1D1C1C] bg-white/[0.02] px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFFF00]"
//         />
//         {suffix && (
//           <span className="text-xs text-gray-400 whitespace-nowrap">
//             {suffix}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   config?: IRewardConfig;
// }

// export function CreateRewardConfigModal({ isOpen, onClose, config }: Props) {
//   const { t } = useLanguage();
//   const isEditMode = !!config;
//   // const [createRewardConfig, { isLoading: isCreating }] = useCreateRewardConfigMutation();
//   // const [updateRewardConfig, { isLoading: isUpdating }] = useUpdateRewardConfigMutation();
//   const createRewardConfig = async (...args: any[]) => ({ unwrap: () => {} });
//   const updateRewardConfig = async (...args: any[]) => ({ unwrap: () => {} });
//   const isCreating = false;
//   const isUpdating = false;
//   const isLoading = isCreating || isUpdating;

//   const [rewardType, setRewardType] = useState("nft_purchase");
//   const [purchaseFeeBps, setPurchaseFeeBps] = useState("500");
//   const [platformShareBps, setPlatformShareBps] = useState("4000");
//   const [referralShareBps, setReferralShareBps] = useState("6000");
//   const [defaultLevelPercentageBps, setDefaultLevelPercentageBps] =
//     useState("250");
//   const [isActive, setIsActive] = useState(true);
//   const [levels, setLevels] = useState<{ percentageBps: string }[]>([
//     { percentageBps: "3000" },
//   ]);

//   // Sync form when config changes (edit mode open)
//   useEffect(() => {
//     if (config) {
//       setRewardType(config.rewardType);
//       setPurchaseFeeBps(String(config.purchaseFeeBps));
//       setPlatformShareBps(String(config.platformShareBps));
//       setReferralShareBps(String(config.referralShareBps));
//       setDefaultLevelPercentageBps(String(config.defaultLevelPercentageBps));
//       setIsActive(config.isActive);
//       setLevels(
//         config.levels
//           .slice()
//           .sort((a, b) => a.level - b.level)
//           .map((l) => ({ percentageBps: String(l.percentageBps) })),
//       );
//     } else {
//       setRewardType("nft_purchase");
//       setPurchaseFeeBps("500");
//       setPlatformShareBps("4000");
//       setReferralShareBps("6000");
//       setDefaultLevelPercentageBps("250");
//       setIsActive(true);
//       setLevels([{ percentageBps: "3000" }]);
//     }
//   }, [config, isOpen]);

//   const addLevel = () => {
//     if (levels.length >= MAX_LEVELS) return;
//     setLevels((prev) => [...prev, { percentageBps: "" }]);
//   };

//   const removeLevel = (idx: number) => {
//     setLevels((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const updateLevel = (idx: number, value: string) => {
//     setLevels((prev) =>
//       prev.map((l, i) => (i === idx ? { percentageBps: value } : l)),
//     );
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!rewardType.trim()) {
//       toast.error(t("rewardTypeRequired"));
//       return;
//     }

//     const parsedLevels: ICreateRewardLevelPayload[] = levels.map((l, i) => ({
//       level: i + 1,
//       percentageBps: Number(l.percentageBps) || 0,
//     }));

//     const payload = {
//       rewardType: rewardType.trim(),
//       purchaseFeeBps: Number(purchaseFeeBps) || 0,
//       platformShareBps: Number(platformShareBps) || 0,
//       referralShareBps: Number(referralShareBps) || 0,
//       defaultLevelPercentageBps: Number(defaultLevelPercentageBps) || 0,
//       isActive,
//       levels: parsedLevels,
//     };

//     try {
//       if (isEditMode && config) {
//         await updateRewardConfig({ id: config.id, ...payload }).unwrap();
//         toast.success(t("rewardConfigUpdated"));
//       } else {
//         await createRewardConfig(payload).unwrap();
//         toast.success(t("rewardConfigCreated"));
//       }
//       handleClose();
//     } catch (error) {
//       const apiError = error as ApiErrorResponse;
//       toast.error(
//         apiError?.data?.message ??
//           (isEditMode
//             ? t("rewardConfigUpdateFailed")
//             : t("rewardConfigCreateFailed")),
//       );
//     }
//   };

//   return (
//     <GenericModal isOpen={isOpen} onClose={handleClose} maxWidth="38rem">
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-lg font-semibold text-white mb-6">
//           {isEditMode ? t("editRewardConfig") : t("createRewardConfig")}
//         </h2>

//         <div className="flex flex-col gap-4">
//           {/* Reward Type */}
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
//               {t("rewardType")} <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               value={rewardType}
//               onChange={(e) => setRewardType(e.target.value)}
//               placeholder="e.g. nft_purchase"
//               className="h-10 w-full rounded-xl border border-[#1D1C1C] bg-white/[0.02] px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFFF00]"
//             />
//           </div>

//           {/* BPS fields */}
//           <div className="grid grid-cols-2 gap-3">
//             <NumberInput
//               label={`${t("purchaseFee")} (bps)`}
//               value={purchaseFeeBps}
//               onChange={setPurchaseFeeBps}
//               suffix={`= ${(Number(purchaseFeeBps) / 100).toFixed(2)}%`}
//             />
//             <NumberInput
//               label={`${t("platformShare")} (bps)`}
//               value={platformShareBps}
//               onChange={setPlatformShareBps}
//               suffix={`= ${(Number(platformShareBps) / 100).toFixed(2)}%`}
//             />
//             <NumberInput
//               label={`${t("referralShare")} (bps)`}
//               value={referralShareBps}
//               onChange={setReferralShareBps}
//               suffix={`= ${(Number(referralShareBps) / 100).toFixed(2)}%`}
//             />
//             <NumberInput
//               label={`${t("defaultLevelPercentage")} (bps)`}
//               value={defaultLevelPercentageBps}
//               onChange={setDefaultLevelPercentageBps}
//               suffix={`= ${(Number(defaultLevelPercentageBps) / 100).toFixed(2)}%`}
//             />
//           </div>

//           {/* Active toggle */}
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => setIsActive((v) => !v)}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                 isActive ? "bg-[#FFFF00]" : "bg-gray-600"
//               }`}
//             >
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
//                   isActive ? "translate-x-6" : "translate-x-1"
//                 }`}
//               />
//             </button>
//             <span className="text-sm text-gray-300">
//               {isActive ? t("active") : t("inactive")}
//             </span>
//           </div>

//           {/* Levels */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 {t("rewardLevels")}
//                 <span className="ml-2 text-xs text-gray-400">
//                   ({levels.length}/{MAX_LEVELS})
//                 </span>
//               </span>
//               {levels.length < MAX_LEVELS && (
//                 <button
//                   type="button"
//                   onClick={addLevel}
//                   className="text-xs text-[#FFFF00] hover:underline font-medium"
//                 >
//                   + {t("addLevel")}
//                 </button>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
//               {levels.map((lvl, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-3 rounded-xl border border-[#1D1C1C] bg-white/[0.02] px-3 py-2"
//                 >
//                   <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFFF00]/10 text-[#FFFF00] text-xs font-bold flex-shrink-0">
//                     {idx + 1}
//                   </span>
//                   <div className="flex-1 flex items-center gap-2">
//                     <input
//                       type="number"
//                       min={0}
//                       value={lvl.percentageBps}
//                       onChange={(e) => updateLevel(idx, e.target.value)}
//                       placeholder="bps (e.g. 3000)"
//                       className="h-9 w-full rounded-lg border border-[#1D1C1C] bg-white/[0.02] px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFFF00]"
//                     />
//                     <span className="text-xs text-gray-400 w-16 flex-shrink-0">
//                       ={" "}
//                       {lvl.percentageBps
//                         ? (Number(lvl.percentageBps) / 100).toFixed(2)
//                         : "0.00"}
//                       %
//                     </span>
//                   </div>
//                   {levels.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeLevel(idx)}
//                       className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0 text-lg leading-none"
//                     >
//                       ×
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             type="button"
//             onClick={handleClose}
//             disabled={isLoading}
//             className="h-10 px-5 rounded-xl border border-[#1D1C1C] text-sm text-gray-300 hover:bg-white/[0.04] transition-colors bg-white/[0.02]"
//           >
//             {t("cancel")}
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading || !rewardType.trim()}
//             className="h-10 px-6 rounded-xl bg-[#FFFF00] text-sm font-semibold text-gray-900 hover:bg-[#3edb44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isLoading ? (
//               <Loading size="sm" />
//             ) : isEditMode ? (
//               t("saveChanges")
//             ) : (
//               t("createRewardConfig")
//             )}
//           </button>
//         </div>
//       </form>
//     </GenericModal>
//   );
// }
