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
import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const Events: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  // Define the TypeScript interface for the table rows
  interface Events {
    id: number; // Unique identifier for each user
    organizer: string; // User name
    event: string; // User event
    hostedBy: string; // User hostedBy
    location: string; // location
    guestCount: number;
    status: string; // Description
    calendar: string;
    image: string;
  }

  // Define the table data using the interface

  const tableData: Events[] = [
    {
      id: 1,
      organizer: "Mark wilson",
      event: "Midnight Event",
      hostedBy: "Julie & Mike",
      location: "Karachi",
      guestCount: 213,
      status: "Private",
      calendar: "Midnight",
      image: "/images/logo/user.png",
    },
    {
      id: 2,
      organizer: "Mark wilson",
      event: "Midnight Event",
      hostedBy: "Julie & Mike",
      location: "Karachi",
      guestCount: 213,
      status: "Public",
      calendar: "Midnight",
      image: "/images/logo/user.png",
    },
    {
      id: 3,
      organizer: "Mark wilson",
      event: "Midnight Event",
      hostedBy: "Julie & Mike",
      location: "Karachi",
      guestCount: 213,
      status: "Public",
      calendar: "Midnight",
      image: "/images/logo/user.png",
    },
    {
      id: 4,
      organizer: "Mark wilson",
      event: "Midnight Event",
      hostedBy: "Julie & Mike",
      location: "Karachi",
      guestCount: 213,
      status: "Private",
      calendar: "Midnight",
      image: "/images/logo/user.png",
    },
    {
      id: 5,
      organizer: "Mark wilson",
      event: "Midnight Event",
      hostedBy: "Julie & Mike",
      location: "Karachi",
      guestCount: 213,
      status: "Private",
      calendar: "Midnight",
      image: "/images/logo/user.png",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header - Always visible */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
                Organizer
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
                Event
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
                Hosted by
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
              >
                Location
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
                Guest count
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[3.75rem]"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[9.375rem]"
              >
                Calendar
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body - Conditionally render data or empty state */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.length === 0 ? (
              tableData.map((user) => (
                <TableRow key={user.id} className="">
                  <TableCell className="px-3 py-[1.25rem] min-w-[12rem]">
                    <div className="flex items-center gap-3">
                      <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                        <Image
                          width={27}
                          height={27}
                          src={user.image}
                          className="h-[27px] w-[27px]"
                          alt={user.organizer}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                          {user.organizer}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    <div className="flex items-center gap-3">
                      <div className="h-[40px] w-[40px] overflow-hidden rounded-md">
                        <Image
                          width={40}
                          height={40}
                          src="/images/logo/event.png"
                          className="h-[40px] w-[40px]"
                          alt={user.event}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                          {user.event}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-start h-[16px] w-[30px] overflow-hidden rounded-md">
                        <Image
                          width={16}
                          height={16}
                          src={user.image}
                          className="h-[16px] w-[16px]"
                          alt={user.hostedBy}
                        />
                        <Image
                          width={16}
                          height={16}
                          src={user.image}
                          className="h-[16px] w-[16px] ml-[-2px]"
                          alt={user.hostedBy}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                          {user.hostedBy}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
                    {user.location}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {user.guestCount}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[3.75rem]">
                    {user.status}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-start min-w-[9.375rem]">
                    {user.calendar}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No events found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <GenericPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Events;
