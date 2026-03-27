import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetDashboardUsersQuery } from "@/services/dashboard-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "@/components/tables/Pagination";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";
import { truncateAddress } from "@/components/rewards/rewards-table-utils";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  totalEvents: string;
  image?: string;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  const { t } = useLanguage();
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center py-10">
          <Loading size="lg" className="border-[#32AA00]" />
        </TableCell>
      </TableRow>
    );
  }

  if (!users.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={4}
          className="text-center py-10 text-gray-500 dark:text-gray-400"
        >
          {t("noUsersFound")}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="pl-6 pr-3 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10">
                <Image
                  width={36}
                  height={36}
                  src={user?.image || "/images/user/userProfile.png"}
                  className="h-full w-full object-cover"
                  alt={user?.name}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-white/90">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[12rem]">
                  {user.email}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell className="px-3 py-4 text-xs text-gray-400 font-mono">
            {user.phoneNumber || "—"}
          </TableCell>
          <TableCell className="py-4 pl-3 pr-6 text-right">
            <span className="text-sm font-medium text-white/80">
              {user.totalEvents}
            </span>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default function Users() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const { data, isLoading: usersLoading } = useGetDashboardUsersQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    search: debouncedSearchTerm,
  });

  const totalPages = data?.meta?.totalPages || 1;
  const users = data?.data || [];

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const tableHeaders = useMemo(
    () => [
      { label: "User Info", className: "pl-6" },
      { label: "Phone Number", className: "" },
      { label: "Total Events", className: "text-end pr-6" },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between flex-wrap items-center w-full">
        <GenericSearchField
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("searchUser")}
          aria-label="Search user"
        />
      </div>

      <div className="dashboard-card pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table hoverable>
            <TableHeader className="bg-white/[0.02] border-[#1D1C1C] border-b px-[1rem]">
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.label}
                    isHeader
                    className={`py-4 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base ${header.className}`}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              <UsersTable users={users} isLoading={usersLoading} />
            </TableBody>
          </Table>
        </div>

        {!usersLoading && data?.meta && data.meta.totalItems > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("showingRecords", {
                start: (page - 1) * DEFAULT_PAGE_SIZE + 1,
                end: Math.min(page * DEFAULT_PAGE_SIZE, data.meta.totalItems),
                total: data.meta.totalItems,
              })}
            </span>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
