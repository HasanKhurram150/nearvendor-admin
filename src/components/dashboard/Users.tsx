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
import GenericPagination from "../atoms/generic-pagination/generic-pagination";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";

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
          <Loading size="lg" className="border-[#1862D4]" />
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
          <TableCell className="px-3 py-5 min-w-[12rem]">
            <div className="flex items-center gap-3">
              <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                <Image
                  width={27}
                  height={27}
                  src={user?.image || "/images/user/userProfile.png"}
                  className="h-[27px] w-[27px]"
                  alt={user?.name}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                {user.name}
              </p>
            </div>
          </TableCell>
          <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
            {user.email}
          </TableCell>
          <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
            {user.phoneNumber || "-"}
          </TableCell>
          <TableCell className="px-3 py-5 text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
            {user.totalEvents}
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
      { label: t("users"), className: "min-w-[12rem]" },
      { label: t("email"), className: "min-w-[15rem]" },
      { label: t("phoneNumber"), className: "min-w-[10rem]" },
      { label: t("totalEvents"), className: "min-w-[10rem]" },
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

      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border dark:border-gray-800 pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="dark:bg-[#18181887] bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.label}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${header.className}`}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              <UsersTable users={users} isLoading={usersLoading} />
            </TableBody>
          </Table>
        </div>

        {!usersLoading && totalPages > 1 && (
          <GenericPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
