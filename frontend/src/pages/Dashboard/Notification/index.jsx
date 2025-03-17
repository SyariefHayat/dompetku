import React from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout'

const Notification = () => {
    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col items-center justify-center px-5 pb-5">
                <img src="/bell.png" alt="" className="h-[30%]" />
                <h3 className="text-xl text-center">Saat ini, Anda tidak memiliki notifikasi.</h3>
            </div>
        </DashboardLayout>
    )
}

export default Notification