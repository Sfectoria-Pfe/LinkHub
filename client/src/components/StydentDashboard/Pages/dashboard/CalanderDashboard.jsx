import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { WidthFull } from '@mui/icons-material';

function CalanderDashboard() {
    const [value, setValue] = React.useState(dayjs()); // Initialize with current date
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  style={{WidthFull}}  >
            <DemoContainer components={['DateCalendar', 'DateCalendar']}   >
                <DemoItem>
                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default CalanderDashboard;
