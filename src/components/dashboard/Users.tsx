import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each user
  name: string; // User name
  email: string; // User email
  phoneNumber: string; // User number
  totalEvents: string; // Totals Events
  image: string;

}

// Define the table data using the interface
const tableData: Product[] = [
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
  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03]">
      <div className="hidden flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white"
              >
                Users
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white"
              >
                Phone Number
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white"
              >
                Total Events
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((user) => (
              <TableRow key={user.id} className="">
                <TableCell className="px-3 py-5">
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
                <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90">
                  {user.email}
                </TableCell>
                <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90">
                  {user.phoneNumber}
                </TableCell>
                <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90">
                {user.totalEvents}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
