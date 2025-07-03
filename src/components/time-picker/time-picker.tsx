import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Box, useTheme } from "@mui/material";

export default function TimePicker({
  value,
  handleChange,
}: {
  value?: string;
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
          paddingRight: 0,
          borderRadius: "12px",
        },
        "& fieldset": {
          borderRadius: "12px",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem>
            <MobileTimePicker
              defaultValue={dayjs()}
              value={dayjs(value)}
              onChange={handleChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
