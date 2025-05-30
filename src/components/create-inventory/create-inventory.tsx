"use client";

import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { WeekdayCheckboxes } from "./week-days";
import RadioButtonGroup from "./radio-button-group";
import CustomSelect from "./custom-select";
import FileUpload from "./file-upload";
import SearchableDropdown from "../common/searchable-dropdown";

type Option = {
  label: string;
  value: string;
};

const CreateInventory: React.FC = () => {
  const [selected, setSelected] = useState<Option | null>(null);

  console.log("selected", selected);
  

  const advertiserOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  const handleSelect = (option: Option | null) => {
    setSelected(option);
    console.log('Selected option:', option);
  };

  const options = [
    { label: "Even Consumption", value: "A" },
    { label: "Early Consumption", value: "B" },
  ];
  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] p-[1.875rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="pb-4"> 
          <Label>Advertiser</Label>
          <SearchableDropdown options={advertiserOptions} onSelect={handleSelect} placeholder="Search and select advertiser"/>
          {/* <Input placeholder="Search and select the advertiser" type="text" /> */}
        </div>
        <div className="pb-4"> 
          <Label>Campaign</Label>
          <Input placeholder="Search and select the campaign" type="text" />
        </div>
        {/* <div className="pb-4"> 
          <Label>Advertiser Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Duration</Label>
          <Input placeholder="yyddmm hh:mm ~ yyddmm hh:mm" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Campaign Total Budget</Label>
          <Input placeholder="Enter your budget" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Target Group</Label>
          <Input placeholder="Enter target group" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Target Group Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div> */}
        <p className="flex flex-col items-start text-xl font-semibold text-gray-800 dark:text-white/90">Basic Inventory Information</p>
        <div />
        {/* <div className="pb-4"> 
          <Label>Inventory Code</Label>
          <Input placeholder="Enter your code" type="text" />
        </div> */}
        <div className="pb-4"> 
          <Label>Inventory Selection</Label>
          <Input placeholder="Search and select inventory" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Inventory Name</Label>
          <Input placeholder="Enter your inventory name" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Inventory Description</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Exposure Period (Start)</Label>
          <Input placeholder="MM/DD/YYYY" type="date" />
        </div>
        <div className="pb-4"> 
          <Label>Exposure Period (End)</Label>
          <Input placeholder="MM/DD/YYYY" type="date" />
        </div>
        <div className="pb-4"> 
          <Label>Exposure Days</Label>
          <WeekdayCheckboxes />
        </div>
        <div className="pb-4"> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div> 
              <Label>Start</Label>
              <Input placeholder="MM/DD/YYYY" type="text" />
            </div>
            <div> 
              <Label>End</Label>
              <Input placeholder="MM/DD/YYYY" type="text" />
            </div>
          </div>
        </div>
        <div className="pb-4"> 
          <Label>Inventory Allocated/Remaining Budget</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
          {/* <div className="pb-4"> 
            <Label>Inventory Total Budget</Label>
            <Input placeholder="Enter your description" type="text" />
          </div> */}
        {/* <div className="pb-4"> 
          <Label>Bonus Budget Setting (%)</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual Unit Price</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Cost Per Individual Unit Price</Label>
          <RadioButtonGroup options={options} name="example" />
        </div>
        <div className="pb-4"> 
          <Label>Early Consumption Operation Ratio (%)</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Early Consumption Daily Budget Setting</Label>
          <Input placeholder="Enter your description" type="text" />
        </div> */}

        <p className="flex flex-col items-start text-xl font-semibold text-gray-800 dark:text-white/90">Inventory Details</p>
        <div />
        <div className="pb-4"> 
          <Label>Material Name</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Material Operation Details</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Material Type</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Material Size</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Landing Type</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Landing URL</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Tracking Usage</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Tracking URL</Label>
          <Input placeholder="Enter your description" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>Creative File</Label>
          <FileUpload />
        </div>
        {/* <div className="pb-4"> 
          <Label>Optimization Setting Selection</Label>
          <CustomSelect placeholder="Yes/No"/>
        </div>
        <div className="pb-4"> 
          <Label>Optimization Operation CTR Daily Basis</Label>
          <Input placeholder="Search and select the advertiser" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>A Grade Ratio</Label>
          <Input placeholder="Search and select the campaign" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>B Grade Ratio</Label>
          <Input placeholder="Search and select the advertiser" type="text" />
        </div>
        <div className="pb-4"> 
          <Label>C Grade Ratio</Label>
          <Input placeholder="Search and select the campaign" type="text" />
        </div> */}
      </div>
      <div className="flex justify-end gap-4">
        <button className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[10rem] rounded-[5rem]">Save</button>
        <button className="flex items-center justify-center  text-[#000] bg-white border border-[#D9D9D9] h-[2.5rem] w-[10rem] rounded-[5rem]">Submit</button>
      </div>
    </div>
  );
};

export default CreateInventory;
