"use client";
import { AddCalendarIcon, AddCategoryIcon } from "@/icons";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import GenericButton from "../atoms/generic-button/generic-button";
import TextArea from "../form/input/TextArea";
import { ProfilePhotoUpload } from "../atoms";
import ColorPicker from "./color-picker";
import { useLanguage } from "../common/LanguageContext";

export const EditCalendarModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex items-center justify-start gap-4">
        <AddCalendarIcon />{" "}
        <p className="font-semibold text-[1.25rem] text-[#102445]">
          {t("editCalendar")}
        </p>
      </div>
      <form className="w-full">
        <div className="space-y-6 py-2 w-full max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label>{t("name")}</Label>
              <Input
                id="calendarName"
                type="text"
                placeholder={t("enterCalendarName")}
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>{t("themeColor")}</Label>

              <ColorPicker />
            </div>{" "}
            <div className="col-span-1 md:col-span-2">
              {" "}
              <div>
                <Label>{t("description")}</Label>
                <TextArea
                  rows={3}
                  // value={messageTwo}
                  error
                  placeholder={t("briefDescription")}
                  // onChange={(value) => setMessageTwo(value)}
                  // hint="Brief description of the calendar"
                />
              </div>
            </div>
            <ProfilePhotoUpload label={t("coverImage")} />
            <ProfilePhotoUpload label={t("profileImage")} />
            <div>
              <Label>{t("location")}</Label>
              <Input
                id="location"
                type="text"
                placeholder={t("enterLocation")}
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>{t("websiteLink")}</Label>
              <Input
                id="website"
                type="text"
                placeholder="enterWebsiteLink"
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>{t("twitter")}</Label>
              <Input id="twitter" type="text" placeholder={t("enterTwitter")} />
            </div>
            <div>
              <Label>{t("instagram")}</Label>
              <Input
                id="instagram"
                type="text"
                placeholder={t("enterInstagram")}
              />
            </div>
            <div>
              <Label>{t("youtube")}</Label>
              <Input
                id="youtube"
                type="text"
                placeholder={t("enterYoutube")}
                // registration={register("email")}
                // error={errors.email?.message}
              />
            </div>{" "}
            <div>
              <Label>{t("tiktok")}</Label>
              <Input id="tiktok" type="text" placeholder={t("enterTiktok")} />
            </div>
            <div>
              <Label>{t("linkedin")}</Label>
              <Input
                id="linkedin"
                type="text"
                placeholder={t("enterLinkedin")}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <GenericButton
              btnText={t("cancel")}
              bgColor="transparent"
              borderRadius="5rem"
              color="#000"
              height="2.5rem"
              width="5.813rem"
              handleClick={onClose}
            />
            <GenericButton
              btnText={t("updateCalendar")}
              bgColor="#1862D4"
              borderRadius="5rem"
              color="#fff"
              height="2.5rem"
              width="10.5rem"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
