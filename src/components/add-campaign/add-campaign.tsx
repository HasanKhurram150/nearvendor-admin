"use client";
import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";

const AddCampaign: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] p-[1.875rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="pb-4"> 
          <Label>Campaign ID</Label>
          <Input placeholder="Automatically Generated after creation" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Advertiser</Label>
          <Input placeholder="Search and select the Advertiser" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Name</Label>
          <Input placeholder="Automatically Generated after creation" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Agency Info</Label>
          <Input placeholder="Automatically Generated after creation" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Detail</Label>
          <Input placeholder="Automatically Generated after creation" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Agency Fee</Label>
          <Input placeholder="Select from Advertiser linked Agency list" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Category</Label>
          <Input placeholder="Automatically Generated after creation" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Sub Category</Label>
          <Input placeholder="Select from Advertiser linked Agency list" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Period (Start)</Label>
          <Input placeholder="MM/DD/YYYY" type="date" />
        </div>
        <div className="pb-4"> 
          <Label>Period (End)</Label>
          <Input placeholder="MM/DD/YYYY" type="date" />
        </div>
        <div className="pb-4"> 
          <Label>Total Budget</Label>
          <Input placeholder="Enter budget" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Settlement</Label>
          <Input placeholder="can select : Upfront(prepayment) / Postpaid" type="text" />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[10rem] rounded-[5rem]">Save</button>
        <button className="flex items-center justify-center  text-[#000] bg-white border border-[#D9D9D9] h-[2.5rem] w-[10rem] rounded-[5rem]">Submit</button>
      </div>
    </div>
  );
};

export default AddCampaign;
