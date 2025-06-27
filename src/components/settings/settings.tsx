"use client";
import React, { useState } from "react";
import { GenericModal } from "../atoms/generic-modal";
import { EditPricingModal } from "./edit-pricing-modal";
import SubscriptionTabs from "./subscription-tabs";
import Label from "../form/Label";
import Input from "../form/input/InputField";

const Settings: React.FC = () => {
  const [editPricingModal, setEditPricingModal] = useState(false);

  const handleOpenEditPricingModal = () => {
    setEditPricingModal(true);
  };
  const handleCloseEditPricingModal = () => {
    setEditPricingModal(false);
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[20rem] w-full p-[1.5rem]">
        <p className="text-gray-600 mb-4">
          This is the email on which you will receive emails
        </p>
        <div className="flex items-center sm:items-end flex-col sm:flex-row gap-6 px-2 pb-3 w-full xl:w-[50%]">
          <div className="flex flex-col w-full">
            <Label>Email </Label>
            <Input type="text" placeholder="Enter email" />
          </div>

          <button className="flex items-center justify-center text-white btn-bg h-[3.5rem] w-[10rem] rounded-xl">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
