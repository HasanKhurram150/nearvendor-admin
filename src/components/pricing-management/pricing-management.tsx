"use client";
import React, { useState } from "react";
import { GenericModal } from "../atoms/generic-modal";
import { EditPricingModal } from "./edit-pricing-modal";
import SubscriptionTabs from "./subscription-tabs";
import { IPrice } from "@/services/packages-api/packages-api.types";
import { useGetAllPackagesQuery } from "@/services/packages-api";
import { usePackageColumns } from "./columns";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { useLanguage } from "../common/LanguageContext";

const PricingManagement: React.FC = () => {
  const { t } = useLanguage();
  const [editPricingModal, setEditPricingModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<IPrice | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  const { data: packages = [], isLoading } = useGetAllPackagesQuery();

  const handleOpenEditPricingModal = (price: IPrice, packageId: string) => {
    setSelectedPrice(price);
    setSelectedPackageId(packageId);
    setEditPricingModal(true);
  };

  const handleCloseEditPricingModal = () => {
    setEditPricingModal(false);
    setSelectedPrice(null);
    setSelectedPackageId(null);
  };

  return (
    <>
      <PageBreadcrumb pageTitle={t("pricing")} info={t("managePricing")} />
      <div className="flex flex-col gap-10 items-start w-full">
        <SubscriptionTabs
          packages={packages}
          handleOpenEditPricingModal={handleOpenEditPricingModal}
          isLoading={isLoading}
        />

        <GenericModal
          isOpen={editPricingModal}
          // isOpen={true}
          onClose={handleCloseEditPricingModal}
          maxWidth="30rem"
        >
          {/* <EditPricingModal onClose={handleCloseEditPricingModal} /> */}
          {selectedPrice && selectedPackageId && (
            <EditPricingModal
              price={selectedPrice}
              packageId={selectedPackageId}
              onClose={handleCloseEditPricingModal}
            />
          )}
        </GenericModal>
      </div>
    </>
  );
};

export default PricingManagement;
