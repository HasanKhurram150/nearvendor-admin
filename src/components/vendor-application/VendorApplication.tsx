"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Badge from "../ui/badge/Badge";
import { getVendorIdAPI } from "@/services/vendor/get-vendor-id/get-vendor-id-api";
import { GetVendorIdOutputDto } from "@/services/vendor/get-vendor-id/get-vendor-id-types";
import { vendorApproveAPI } from "@/services/vendor/approve/vendor-approve-api";
import Loading from "../atoms/loading/loading";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import dayjs from "dayjs";
import { vendorRejectAPI } from "@/services/vendor/reject/vendor-reject-api";

const VendorApplication: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [vendor, setVendor] = useState<GetVendorIdOutputDto["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const fetchVendorDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await getVendorIdAPI.getVendorId({ id });
      if (res.success) {
        setVendor(res.data);
      } else {
        toast.error("Failed to fetch vendor details");
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      toast.error("An error occurred while fetching details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, [id]);

  const handleVerify = async () => {
    if (!id) return;
    setIsVerifying(true);
    try {
      const res = await vendorApproveAPI.vendorApprove({ vendorId: id });
      if (res.success) {
        toast.success("Vendor application verified successfully!");
        fetchVendorDetails(); // Refresh details
      } else {
        toast.error(res.message || "Failed to verify vendor application");
      }
    } catch (error) {
      console.error("Error verifying vendor:", error);
      toast.error("An error occurred during verification");
    } finally {
      setIsVerifying(false);
    }
  }; const handleReject = async () => {
    if (!id) return;
    setIsRejecting(true);
    try {
      const res = await vendorRejectAPI.vendorReject({ vendorId: id });
      if (res.success) {
        toast.success("Vendor application rejected successfully!");
        fetchVendorDetails(); // Refresh details
      } else {
        toast.error(res.message || "Failed to reject  vendor application");
      }
    } catch (error) {
      console.error("Error verifying vendor:", error);
      toast.error("An error occurred during verification");
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
    { label: "Vendor Name", value: vendor.user.fullName },
    { label: "Email", value: vendor.user.email },
    { label: "CNIC", value: vendor.cnic },
    { label: "Business Name", value: vendor.businessName },
    { label: "Business Type", value: vendor.businessType },
    { label: "Tax ID", value: vendor.taxId },
    { label: "Support Contact", value: vendor.supportContact },
    {
      label: "Status",
      value: vendor.status,
      isBadge: true,
      color: vendor.status === "APPROVED" ? "success" : vendor.status === "REJECTED" ? "error" : "warning"
    },
    {
      label: "Verification Status",
      value: vendor.isVerified ? "Verified" : "Unverified",
      isBadge: true,
      color: vendor.isVerified ? "success" : "error"
    },
    {
      label: "Joined At",
      value: dayjs(vendor.createdAt).format("DD MMM YYYY, HH:mm")
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between gap-4">
        <PageBreadcrumb pageTitle="Vendor Application Details" />
        {vendor.status === "PENDING" && (
          <div className="flex items-center gap-4">
            <Button
              onClick={handleVerify}
              loading={isVerifying}
              className="px-6"
            >
              Verify Vendor
            </Button>
            <Button
              onClick={handleReject}
              loading={isRejecting}
              className="px-6 bg-red-500 hover:bg-red-600"
            >
              Reject Vendor
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
                      <Badge color={detail.color as any} variant="light" size="sm">
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
            <div className="flex flex-col gap-4 p-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                CNIC Image
              </span>
              {vendor.cnicImageUrl ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vendor.cnicImageUrl}
                    alt="CNIC Front"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center text-gray-500 text-sm">
                  No image provided
                </div>
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default VendorApplication;
