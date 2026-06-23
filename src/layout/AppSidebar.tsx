"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  DashboardIcon,
  DollarLineIcon,
  HorizontaLDots,
  ListIcon,
  PeopleIcon,
  PlugInIcon,
  TimeIcon,
  TicketIcon,
} from "../icons/index";
import { DiamondPlus, FlagTriangleRight, Megaphone, Store, MessageSquare, Star } from "lucide-react";
import { useLanguage } from "@/components/common/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getAllVendorAPI } from "@/services/vendor/get-all-vendor/get-all-vendor-api";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  badge?: number; // Number of unread/new items
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Fetch pending vendor applications count
  const { data: pendingVendorsData } = useQuery({
    queryKey: ["pending-vendor-count"],
    queryFn: () =>
      getAllVendorAPI.getAllVendor({
        status: "PENDING",
        page: 1,
        limit: 1,
      }),
    refetchInterval: 60000, // Poll every minute
  });

  const pendingVendorCount = pendingVendorsData?.data?.pagination?.total || 0;

  const navItems: NavItem[] = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      path: "/",
    },
    // {
    //   icon: <ListIcon />,
    //   name: t("nftOrders"),
    //   path: "/nft-orders",
    // },
    // {
    //   icon: <TicketIcon />,
    //   name: t("nftMinting"),
    //   path: "/mint-nft",
    // },
    // {
    //   icon: <ListIcon />,
    //   name: t("nftListing"),
    //   path: "/nfts",
    // },
    // {
    //   icon: <DollarLineIcon />,
    //   name: t("rewardConfigs"),
    //   path: "/rewards",
    // },
    // {
    //   icon: <DollarLineIcon />,
    //   name: t("rewards"),
    //   path: "/rewards/admin",
    // },

    // {
    //   icon: <DollarLineIcon />,
    //   name: t("settlements"),
    //   path: "/rewards/settlements",
    // },
    {
      icon: <PeopleIcon />,
      name: "User Management",
      path: "/user-management",
    },
    // {
    //   icon: <TimeIcon />,
    //   name: "Login History",
    //   path: "/login-history",
    // },
    {
      icon: <TimeIcon />,
      name: "Vendor Applications",
      path: "/vendor-applications",
      badge: pendingVendorCount,
    },
    {
      icon: <DiamondPlus />,
      name: "Ad Space",
      path: "/ad-space",
    },
    {
      icon: <FlagTriangleRight />,
      name: "Complaints",
      path: "/complaints",
    },
    {
      icon: <Store className="w-5 h-5" />,
      name: "Shops",
      path: "/shops",
    },
    {
      icon: <Megaphone className="w-5 h-5" />,
      name: "Broadcasts",
      path: "/notifications",
    },
    {
      icon: <Star className="w-5 h-5" />,
      name: "Reviews",
      path: "/reviews",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      name: "Comments",
      path: "/comments",
    },
    // {
    //   icon: <PlugInIcon />,
    //   name: t("settings"),
    //   path: "/settings",
    // },
  ];

  const othersItems: NavItem[] = [];

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "inventory",
  ) => (
    <div
      className={`${
        isExpanded || isHovered || isMobileOpen
          ? "p-4 rounded-[20px] w-full"
          : "p-2 rounded-2xl w-full"
      } bg-[#11192E] transition-all duration-300`}
    >
      <ul className="flex flex-col gap-2">
        {navItems.map((nav, index) => (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group rounded-xl  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={` ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`menu-item group rounded-xl relative ${
                    isActive(nav.path)
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className={`menu-item-text truncate flex-1 text-left pr-8`}>{nav.name}</span>
                  )}
                  {nav.badge !== undefined && nav.badge > 0 && (
                    <span
                      className={`absolute ${
                        isExpanded || isHovered || isMobileOpen
                          ? "right-4 top-1/2 -translate-y-1/2"
                          : "right-0 top-0"
                      } bg-red-500 text-white text-[10px] leading-none font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-[#11192E] flex items-center justify-center`}
                    >
                      {nav.badge > 99 ? '99+' : nav.badge}
                    </span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="space-y-1 mt-2 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "inventory";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    let matchedSubmenu: { type: "main" | "inventory"; index: number } | null =
      null;
    ["main", "inventory"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              matchedSubmenu = {
                type: menuType as "main" | "inventory",
                index,
              };
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    setTimeout(() => {
      setOpenSubmenu(submenuMatched ? matchedSubmenu : null);
    }, 0);
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "inventory",
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-transparent text-gray-900 h-screen transition-all duration-300 ease-in-out z-50
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`pt-6 pb-8 hidden lg:flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="h-auto w-[96px]"
                src="/images/logo/near-vendor-logo.svg"
                alt="Logo"
                width={96}
                height={96}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col pt-4 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-1">
            {renderMenuItems(navItems, "main")}
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
