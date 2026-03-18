import { useLanguage } from "../common/LanguageContext";

export const useCalendarColumns = () => {
  const { t } = useLanguage();

  return [
    { id: "1", header: t("name"), className: "min-w-[15rem]" },
    { id: "2", header: t("description"), className: "min-w-[15rem]" },
    { id: "3", header: t("identifier"), className: "min-w-[10rem]" },
    { id: "4", header: t("cover"), className: "min-w-[8.125rem]" },
    { id: "5", header: t("color"), className: "min-w-[10rem]" },
    { id: "6", header: t("markAsFeatured"), className: "min-w-[12rem]" },
    { id: "7", header: t("location"), className: "min-w-[12rem]" },
    { id: "8", header: t("actions"), className: "min-w-[10rem]" },
  ];
};

export const calendarData = [
  {
    profileImage: "/images/logo/cover-1.png",
    calendarName: "Tech Conference 2024",
    description:
      "A calendar featuring upcoming global tech conferences and meetups.",
    identifier: "tech-001",
    cover: "/images/logo/cover-1.png",
    colorCode: "#000000",
    colorBg: "#5D5F6317",
    location: "San Francisco, CA",
  },
  {
    profileImage: "/images/logo/cover-1.png",
    calendarName: "Product Launch",
    description:
      "A calendar featuring upcoming global tech conferences and meetups.",
    identifier: "mkt-002",
    cover: "/images/logo/cover-1.png",
    colorCode: "#50FF56",
    colorBg: "#50FF5617",
    location: "New York, NY",
  },
  {
    profileImage: "/images/logo/cover-1.png",
    calendarName: "Team Building Workshop",
    description:
      "A calendar featuring upcoming global tech conferences and meetups.",
    identifier: "fin-003",
    cover: "/images/logo/cover-1.png",
    colorCode: "#D418A2",
    colorBg: "#D418A217",
    location: "Austin, TX",
  },
  {
    profileImage: "/images/logo/cover-1.png",
    calendarName: "Human Resources",
    description:
      "A calendar featuring upcoming global tech conferences and meetups.",
    identifier: "hr-004",
    cover: "/images/logo/cover-1.png",
    colorCode: "#5D18D4",
    colorBg: "#5D18D417",
    location: "Austin, TX",
  },
  {
    profileImage: "/images/logo/cover-1.png",
    calendarName: "Operations",
    description:
      "A calendar featuring upcoming global tech conferences and meetups.",
    identifier: "ops-005",
    cover: "/images/logo/cover-1.png",
    colorCode: "#D47018",
    colorBg: "#D4701817",
    location: "New York, NY",
  },
];
