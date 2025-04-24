"use client";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import { InstagramIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from "@/icons";
import CustomDropdown from "./custom-select";



const KOLApproval: React.FC = () => {

  // Define the TypeScript interface for the table rows
interface Users {
  id: number; // Unique identifier for each user
  name: string; // User name
  achievements: string; // User achievements
  audience: string; // User Audience
  description: string; // Description
  status: string; // Description
  image: string;

}
 
// Define the table data using the interface
const tableData: Users[] = [
  {
    id: 1,
    name: "Mark wilson",
    achievements: "Built a community of 50,000",
    audience: "5,029k",
    description: "Experience crypto trader and educator with 5 year of experience",
    status:'Golded',
    image: "/images/logo/user.png",
  },
  {
    id: 2,
    name: "Mark wilson",
    achievements: "Built a community of 50,000",
    audience: "5,029k",
    description: "Experience crypto trader and educator with 5 year of experience",
    status:'Blue',
    image: "/images/logo/user.png",
  },
  {
    id: 3,
    name: "Mark wilson",
    achievements: "Built a community of 50,000",
    audience: "5,029k",
    description: "Experience crypto trader and educator with 5 year of experience",
    status:'Silver',
    image: "/images/logo/user.png",
  },
  {
    id: 4,
    name: "Mark wilson",
    achievements: "Built a community of 50,000",
    audience: "5,029k",
    description: "Experience crypto trader and educator with 5 year of experience",
    status:'Gold',
    image: "/images/logo/user.png",
  },
  {
    id: 5,
    name: "Mark wilson",
    achievements: "Built a community of 50,000",
    audience: "5,029k",
    description: "Experience crypto trader and educator with 5 year of experience",
    status:'Gold',
    image: "/images/logo/user.png",
  },
];

  return (


<div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="min-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
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
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
              >
               Achievements
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
                className="py-3 px-3 font-medium text-[#201D1D99] text-center text-base dark:text-white min-w-[3.75rem]"
              >
                Contact
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-center text-base dark:text-white  min-w-[3.75rem]"
              >
               Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[12rem]"
              >
                Badges
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((user) => (
              <TableRow key={user.id} className="">
                <TableCell className="px-3 py-[1.25rem]  min-w-[10rem]">
                  <div className="flex items-center gap-3">
                    <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                      <Image
                        width={27}
                        height={27}
                        src={user.image}
                        className="h-[27px] w-[27px]"
                        alt={user.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
                  {user.achievements}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                  <div className="flex gap-4 items-center justify-center">
                    <a href="#">
                    <YoutubeIcon /></a>
                    <a href="#">
                    <InstagramIcon /></a>
                    <a href="#">
                    <TwitterIcon /></a>
                    </div>
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90">
                {user.audience}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                  {user.description}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[3.75rem]">
                <div className="flex gap-4 items-center justify-center">
                    <a href="#">
                    <TelegramIcon /></a>
                    </div>
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-center min-w-[3.75rem]">
                  {user.status}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                <CustomDropdown />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
      
  );
};


export default KOLApproval;
