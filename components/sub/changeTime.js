import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");

const TIMEZONES = ["default", "system", "UTC", "America/Chicago"];

export default function TimezonePlayground({
  setStartDate,
  setEndDate,
  endDate,
  startDate,
}) {
  const [value, setValue] = React.useState(dayjs.utc("2022-04-17T15:30"));

  const [currentTimezone, setCurrentTimezone] = React.useState("UTC");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <br />
      <Stack spacing={2}>
        <DateTimePicker
          className="bg-white"
          timezone={currentTimezone}
          value={startDate}
          onChange={setStartDate}
        />
        <Typography>
          Stored Start Date: {startDate == null ? null : startDate.format()}
        </Typography>
      </Stack>

      <br />

      <Stack spacing={2}>
        <DateTimePicker
          className="bg-white"
          timezone={currentTimezone}
          value={endDate}
          onChange={setEndDate}
        />
        <Typography>
          Stored End Date: {endDate == null ? null : endDate.format()}
        </Typography>
      </Stack>
    </LocalizationProvider>
  );
}
