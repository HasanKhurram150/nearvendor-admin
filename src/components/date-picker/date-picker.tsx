import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Box, useTheme } from "@mui/material";

export default function DatePicker({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (value: Dayjs | null) => void;
}) {
  return (
    <Box
      width="100%"
      sx={{
        "& .MuiStack-root": {
          pt: 0,
        },
        "& .MuiInputBase-root": {
          borderRadius: "12px",
        },

        "& fieldset": {
          borderRadius: "12px",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDatePicker"]}>
          <MobileDatePicker
            defaultValue={dayjs()}
            value={dayjs(value)}
            onChange={handleChange}
            format="MMM D, YYYY"
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
