"use client";
import React, { useState } from "react";
import { GenericModal } from "../atoms/generic-modal";
import { EditPricingModal } from "./edit-pricing-modal";
import SubscriptionTabs from "./subscription-tabs";

const PricingManagement: React.FC = () => {
  const [editPricingModal, setEditPricingModal] = useState(false);

  const handleOpenEditPricingModal = () => {
    setEditPricingModal(true);
  };
  const handleCloseEditPricingModal = () => {
    setEditPricingModal(false);
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <SubscriptionTabs
        handleOpenEditPricingModal={handleOpenEditPricingModal}
      />

      <GenericModal
        isOpen={editPricingModal}
        // isOpen={true}
        onClose={handleCloseEditPricingModal}
        maxWidth="30rem"
      >
        <EditPricingModal onClose={handleCloseEditPricingModal} />
      </GenericModal>
    </div>
  );
};

export default PricingManagement;
