import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import "react-big-calendar/lib/css/react-big-calendar.css";
import DashboardLayout from '@/components/Layouts/DashboardLayout';

const localizer = momentLocalizer(moment)

const Calender = () => {
    return (
        <DashboardLayout>
            <div className="w-full h-full px-5 pb-5">
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                className="w-full h-full"
            />
            </div>
        </DashboardLayout>
    )
}

export default Calender