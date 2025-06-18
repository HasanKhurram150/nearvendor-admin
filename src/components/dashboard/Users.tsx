import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { pages } from "next/dist/build/templates/app-page";
import { useGetDashboardUsersQuery } from "@/services/dashboard-api";

// Define the TypeScript interface for the table rows
interface Users {
  id: number; // Unique identifier for each user
  name: string; // User name
  email: string; // User email
  phoneNumber: string; // User number
  totalEvents: string; // Totals Events
  image: string;
}

// Define the table data using the interface
const tableData: Users[] = [
  {
    id: 1,
    name: "Mark wilson",
    email: "Mikewilson@gmail.com",
    phoneNumber: "0321 1234567",
    totalEvents: "500",
    image: "/images/logo/user.png",
  },
  {
    id: 2,
    name: "Mark wilson",
    email: "Mikewilson@gmail.com",
    phoneNumber: "0321 1234567",
    totalEvents: "500",
    image: "/images/logo/user.png",
  },
  {
    id: 3,
    name: "Mark wilson",
    email: "Mikewilson@gmail.com",
    phoneNumber: "0321 1234567",
    totalEvents: "500",
    image: "/images/logo/user.png",
  },
  {
    id: 4,
    name: "Mark wilson",
    email: "Mikewilson@gmail.com",
    phoneNumber: "0321 1234567",
    totalEvents: "500",
    image: "/images/logo/user.png",
  },
  {
    id: 5,
    name: "Mark wilson",
    email: "Mikewilson@gmail.com",
    phoneNumber: "0321 1234567",
    totalEvents: "500",
    image: "/images/logo/user.png",
  },
];

export default function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const { data, isLoading: usersLoading } = useGetDashboardUsersQuery({
    page: page,
    pageSize: pageSize,
    search: search,
  });
  console.log(data);
  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Always show Table Header */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
                Users
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
                Phone Number
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
                Total Events
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Conditional Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data?.data?.length ? (
              data.data.map((user) => (
                <TableRow key={user.id} className="">
                  <TableCell className="px-3 py-5 min-w-[12rem]">
                    <div className="flex items-center gap-3">
                      <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                        <Image
                          width={27}
                          height={27}
                          src={"/images/logo/user.png"}
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
                  <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90  min-w-[15rem]">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {"-"}
                  </TableCell>
                  <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {user.totalEvents}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
