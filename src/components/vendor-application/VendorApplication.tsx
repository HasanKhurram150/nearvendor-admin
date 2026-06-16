"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Badge from "../ui/badge/Badge";
import { getVendorIdAPI } from "@/services/vendor/get-vendor-id/get-vendor-id-api";
import { GetVendorIdOutputDto } from "@/services/vendor/get-vendor-id/get-vendor-id-types";
import { vendorApproveAPI } from "@/services/vendor/approve/vendor-approve-api";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import Image from "next/image";
import dayjs from "dayjs";
import { vendorRejectAPI } from "@/services/vendor/reject/vendor-reject-api";
import { ChevronLeft } from "lucide-react";

const VendorApplication: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = searchParams.get("id");

  const [isVerifying, setIsVerifying] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => getVendorIdAPI.getVendorId({ id: id as string }),
    enabled: !!id,
  });

  const vendor = data?.success ? data.data : null;

  useEffect(() => {
    if (!id) {
      toast.error("No vendor ID provided");
    } else if (isError) {
      toast.error("Failed to fetch vendor details");
    }
  }, [id, isError]);

  const handleVerify = async () => {
    if (!id) return;
    setIsVerifying(true);
    try {
      const res = await vendorApproveAPI.vendorApprove({ vendorId: id });
      console.log("Verify Response:", res);
      if (res.success || res.statusCode === 200 || res.statusCode === 201) {
        toast.success("Vendor application verified successfully!");
        queryClient.invalidateQueries({ queryKey: ["pending-vendor-count"] });
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
        refetch(); // Silent refresh
      } else {
        toast.error(res.message || "Failed to verify vendor application");
      }
    } catch (error) {
      console.error("Error verifying vendor:", error);
      toast.error("An error occurred during verification");
    } finally {
      setIsVerifying(false);
    }
  };
  const handleReject = async () => {
    if (!id) return;
    setIsRejecting(true);
    try {
      const res = await vendorRejectAPI.vendorReject({ vendorId: id });
      console.log("Reject Response:", res);
      if (res.success || res.statusCode === 200 || res.statusCode === 201) {
        toast.success("Vendor application rejected successfully!");
        queryClient.invalidateQueries({ queryKey: ["pending-vendor-count"] });
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
        refetch(); // Silent refresh
      } else {
        toast.error(res.message || "Failed to reject vendor application");
      }
    } catch (error) {
      console.error("Error rejecting vendor:", error);
      toast.error("An error occurred during rejection");
    } finally {
      setIsRejecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full min-h-[400px] items-center justify-center">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <PageBreadcrumb pageTitle="Vendor Application Details" />
        <div className="p-8 text-center text-gray-500">
          Vendor application not found or invalid ID.
        </div>
      </div>
    );
  }

  const details = [
    { label: "First Name", value: vendor.firstName },
    { label: "Last Name", value: vendor.lastName },
    { label: "Business Email", value: vendor.businessEmail },
    { label: "Mobile Number", value: vendor.mobileNumber },
    { label: "Business Phone", value: vendor.businessPhoneNumber },
    { label: "Business Name", value: vendor.businessName },
    { label: "Business Type", value: vendor.businessType },
    { label: "Street Address", value: vendor.streetAddress },
    { label: "Area", value: vendor.area },
    { label: "City", value: vendor.city },
    { label: "State", value: vendor.state },
    { label: "Postal Code", value: vendor.postalCode },
    {
      label: "Status",
      value: vendor.status,
      isBadge: true,
      color:
        vendor.status === "APPROVED"
          ? "success"
          : vendor.status === "REJECTED"
            ? "error"
            : "warning",
    },
    {
      label: "Verification Status",
      value: vendor.status === "APPROVED" ? "Verified" : "Unverified",
      isBadge: true,
      color: vendor.status === "APPROVED" ? "success" : "error",
    },
    {
      label: "Joined At",
      value: dayjs(vendor.createdAt).format("DD MMM YYYY, HH:mm"),
    },
    ...(vendor.status === "REJECTED" && vendor.rejectionReason
      ? [{ label: "Rejection Reason", value: vendor.rejectionReason }]
      : []),
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors w-fit"
      >
        <ChevronLeft size={20} />
        Back to Vendor Applications
      </button>

      <div className="flex items-center justify-between gap-4">
        <PageBreadcrumb pageTitle="Vendor Application Details" />
        {vendor.status === "PENDING" && (
          <div className="flex items-center gap-4">
            <Button
              onClick={handleVerify}
              loading={isVerifying}
              className="px-6"
              variant="success"
            >
              Verify
            </Button>
            <Button
              onClick={handleReject}
              loading={isRejecting}
              variant="destructive"
              // className="px-6 bg-red-500 hover:bg-red-600 text-white"
            >
              Reject
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ComponentCard title="Vendor Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
              {details.map((detail, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {detail.label}
                  </span>
                  <div className="flex items-center">
                    {detail.isBadge ? (
                      <Badge
                        color={detail.color as any}
                        variant="light"
                        size="sm"
                      >
                        {detail.value}
                      </Badge>
                    ) : (
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {detail.value || "—"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        </div>

        <div className="flex flex-col gap-8">
          <ComponentCard title="Documents">
            <div className="flex flex-col gap-6 p-2">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  CNIC Front Image
                </span>
                {vendor.cnicFrontImageUrl ? (
                  <div
                    onClick={() =>
                      setExpandedImage({
                        src: vendor.cnicFrontImageUrl,
                        title: "CNIC Front Image",
                      })
                    }
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer group hover:border-brand-500/50 transition-all duration-300"
                  >
                    <Image
                      src={vendor.cnicFrontImageUrl}
                      alt="CNIC Front"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                        Click to Expand
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center text-gray-500 text-sm">
                    No image provided
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  CNIC Back Image
                </span>
                {vendor.cnicBackImageUrl ? (
                  <div
                    onClick={() =>
                      setExpandedImage({
                        src: vendor.cnicBackImageUrl,
                        title: "CNIC Back Image",
                      })
                    }
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer group hover:border-brand-500/50 transition-all duration-300"
                  >
                    <Image
                      src={vendor.cnicBackImageUrl}
                      alt="CNIC Back"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                        Click to Expand
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center text-gray-500 text-sm">
                    No image provided
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* Lightbox / Expanded Image Modal */}
      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-zoom-out animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-4 cursor-default animate-scaleUp"
          >
            <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <Image
                src={expandedImage.src}
                alt={expandedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
            <span className="text-white/90 text-sm font-semibold tracking-wider bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              {expandedImage.title}
            </span>
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleUp {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-fadeIn {
              animation: fadeIn 0.2s ease-out forwards;
            }
            .animate-scaleUp {
              animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VendorApplication;
