"use client";
import { DollarLineIcon } from "@/icons";
import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";


export const EditPricingModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <DollarLineIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          Edit Price
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 py-2 w-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {" "}
            <div>
              <Label>Amount</Label>
              <Input
                id="amount"
                type="text"
                placeholder="Enter your amount"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
          </div>

          <div className="flex items-center gap-4 justify-end">
            <GenericButton
              btnText="Cancel"
              bgColor="transparent"
              borderRadius="5rem"
              color="#000"
              height="2.5rem"
              width="5.813rem"
              handleClick={onClose}
            />
            <GenericButton
              btnText="Update"
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="7rem"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
