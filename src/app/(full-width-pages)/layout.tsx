// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "NearVendor - Discover Local Vendors",
//   description: "Every bazar has what you need. Search, discover, and go.",
//   icons: {
//     icon: "/images/logo/near-vendor-logo.svg",
//   },
// };
export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
