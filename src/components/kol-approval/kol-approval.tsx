// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Image from "next/image";
// import { InstagramIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from "@/icons";
// import CustomDropdown from "./custom-select";
// import {
//   useGetKolRequestsQuery,
//   useUpdateKolRequestStatusMutation,
// } from "@/services/kols-api";
// import Button from "../ui/button/Button";
// import toast from "react-hot-toast";

// const KOLApproval: React.FC = () => {
//   const [selectedBadges, setSelectedBadges] = useState<Record<string, string>>(
//     {},
//   );

//   const { data: kolRequests, isLoading } = useGetKolRequestsQuery();
//   const [updateKolStatus] = useUpdateKolRequestStatusMutation();
//   // Define the TypeScript interface for the table rows

//   const handleBadgeSelect = (kolId: string, badge: string) => {
//     setSelectedBadges((prev) => ({
//       ...prev,
//       [kolId]: badge,
//     }));
//   };

//   const handleUpdateStatus = async (id: string, status: string) => {
//     try {
//       const badge = selectedBadges[id] as string;
//       await updateKolStatus({
//         id,
//         body: {
//           status,
//           badge,
//         },
//       }).unwrap();

//       toast.success(`KOL request ${status} successfully`);
//     } catch (error) {
//       toast.error(`Failed to update KOL request status`);
//       console.error("Error updating KOL status:", error);
//     }
//   };

//   return (
//     <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
//       <div className="min-w-full overflow-x-auto">
//         <Table>
//           {/* Table Header - Always visible */}
//           <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
//               >
//                 Users
//               </TableCell>
//               {/* <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
//               >
//                 Achievements
//               </TableCell> */}
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-base dark:text-white text-center min-w-[10rem]"
//               >
//                 Social Handles
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
//               >
//                 Audience
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[15rem]"
//               >
//                 Description
//               </TableCell>
//               {/* <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-center text-base dark:text-white min-w-[3.75rem]"
//               >
//                 Contact
//               </TableCell> */}
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[12rem]"
//               >
//                 Badges
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 font-medium text-[#201D1D99] text-center text-base dark:text-white  min-w-[3.75rem]"
//               >
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           {/* Table Body - Conditionally render data or empty state */}
//           <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
//             {kolRequests?.length == 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={8}
//                   className="text-center py-10 text-gray-500 dark:text-gray-400"
//                 >
//                   No KOLs found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               kolRequests?.map((kol) => (
//                 <TableRow key={kol?.id} className="">
//                   <TableCell className="px-3 py-[1.25rem] min-w-[10rem]">
//                     <div className="flex items-center gap-3">
//                       <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
//                         <Image
//                           width={27}
//                           height={27}
//                           src={
//                             kol?.user?.image || "/images/user/userProfile.png"
//                           }
//                           className="h-[27px] w-[27px]"
//                           alt={kol?.user?.name}
//                         />
//                       </div>
//                       <div>
//                         <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
//                           {kol?.user?.name}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   {/* <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
//                     N/A from BE
//                   </TableCell> */}
//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
//                     <div className="flex gap-4 items-center justify-center">
//                       {/* <a href="#">
//                         <YoutubeIcon />
//                       </a> */}
//                       {kol?.instagram && (
//                         <a href="#">
//                           <InstagramIcon />
//                         </a>
//                       )}
//                       {kol?.x && (
//                         <a href="#">
//                           <TwitterIcon />
//                         </a>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90">
//                     {kol?.totalAudienceSite}
//                   </TableCell>
//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
//                     {kol?.aboutYou}
//                   </TableCell>
//                   {/* <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[3.75rem]">
//                     <div className="flex gap-4 items-center justify-center">
//                       <a href="#">
//                         <TelegramIcon />
//                       </a>
//                     </div>
//                   </TableCell> */}
//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
//                     {kol?.badge ? (
//                       kol?.badge
//                     ) : (
//                       <CustomDropdown
//                         onSelect={(badge: string) =>
//                           handleBadgeSelect(kol.id, badge)
//                         }
//                       />
//                     )}
//                   </TableCell>
//                   {/* // <TableCell className="px-3 py-[1.25rem] min-w-[12rem]">
//                   //   <CustomDropdown
//                   //     onSelect={(badge) => handleBadgeSelect(kol.id, badge)}
//                   //   />
//                   // </TableCell> */}
//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-center min-w-[3.75rem]">
//                     {kol?.status === "pending" ? (
//                       <div className="flex gap-2 justify-center">
//                         <Button
//                           size="sm"
//                           variant="success"
//                           onClick={() => handleUpdateStatus(kol.id, "approved")}
//                           className="h-6 text-xs"
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleUpdateStatus(kol.id, "rejected")}
//                           className="h-6 text-xs"
//                         >
//                           Reject
//                         </Button>
//                       </div>
//                     ) : (
//                       <span className="capitalize">
//                         {kol?.status.toLowerCase()}
//                       </span>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default KOLApproval;

"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { InstagramIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from "@/icons";
import CustomDropdown from "./custom-select";
import {
  useGetKolRequestsQuery,
  useUpdateKolRequestStatusMutation,
} from "@/services/kols-api";
import { IKolBadge, IKolStatus } from "@/services/kols-api/kols-api.types";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";

const KOLApproval: React.FC = () => {
  const [selectedBadges, setSelectedBadges] = useState<
    Record<string, IKolBadge>
  >({});

  const { data: kolRequests, isLoading, refetch } = useGetKolRequestsQuery();
  const [updateKolStatus] = useUpdateKolRequestStatusMutation();

  const handleBadgeSelect = (kolId: string, badge: IKolBadge) => {
    setSelectedBadges((prev) => ({
      ...prev,
      [kolId]: badge,
    }));
  };

  const handleUpdateStatus = async (id: string, status: IKolStatus) => {
    try {
      const badge = selectedBadges[id];
      await updateKolStatus({
        id,
        body: {
          status,
          ...(badge ? { badge } : {}),
        },
      }).unwrap();

      toast.success(`KOL request ${status} successfully`);
      refetch(); // Refresh the list after update
    } catch (error) {
      toast.error(`Failed to update KOL request status`);
      console.error("Error updating KOL status:", error);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="min-w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
                Users
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-base dark:text-white text-center min-w-[10rem]"
              >
                Social Handles
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
                Audience
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[15rem]"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[12rem]"
              >
                Badges
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-center text-base dark:text-white  min-w-[3.75rem]"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : kolRequests?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No KOLs found
                </TableCell>
              </TableRow>
            ) : (
              kolRequests?.map((kol) => (
                <TableRow key={kol?.id} className="">
                  <TableCell className="px-3 py-[1.25rem] min-w-[10rem]">
                    <div className="flex items-center gap-3">
                      <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                        <Image
                          width={27}
                          height={27}
                          src={
                            kol?.user?.image || "/images/user/userProfile.png"
                          }
                          className="h-[27px] w-[27px]"
                          alt={kol?.user?.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                          {kol?.user?.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    <div className="flex gap-4 items-center justify-center">
                      {kol?.instagram && (
                        <a href="#">
                          <InstagramIcon />
                        </a>
                      )}
                      {kol?.x && (
                        <a href="#">
                          <TwitterIcon />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90">
                    {kol?.totalAudienceSite}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {kol?.aboutYou}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    {kol?.badge ? (
                      kol?.badge
                    ) : (
                      <CustomDropdown
                        onSelect={(badge: IKolBadge) =>
                          handleBadgeSelect(kol.id, badge)
                        }
                        disabled={kol.status !== "pending"}
                      />
                    )}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-center min-w-[3.75rem]">
                    {kol?.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleUpdateStatus(kol.id, "approved")}
                          className="h-6 text-xs"
                          disabled={!selectedBadges[kol.id]}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateStatus(kol.id, "rejected")}
                          className="h-6 text-xs"
                          disabled={!selectedBadges[kol.id]}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="capitalize">
                        {kol?.status.toLowerCase()}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default KOLApproval;
