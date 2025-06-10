"use client";
import React from "react";
import Image from "next/image";

export const States = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {/* <!-- State Item Start --> */}
      <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-base text-black dark:text-whihte">
              Total Events
            </span>
            <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
            5,029k
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
          <Image src="/images/logo/total-events.webp" width={180} height={160} alt="state" />
        </div>
      </div>
      {/* <!-- State Item End --> */}

      {/* <!-- State Item Start --> */}
      <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-base text-black dark:text-whihte">
            Total Users
          </span>
          <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
          5,029k
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
        <Image src="/images/logo/total-users.webp" width={180} height={160} alt="state" />
      </div>
    </div>
      {/* <!-- State Item End --> */}
       {/* <!-- State Item Start --> */}
       <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-base text-black dark:text-whihte">
           Daily Events
          </span>
          <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
          5,029k
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
        <Image src="/images/logo/daily-events.webp" width={180} height={160} alt="state" />
      </div>
    </div>
      {/* <!-- State Item End --> */}
    </div>
  );
};
