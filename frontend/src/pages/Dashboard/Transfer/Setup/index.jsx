import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import DashboardLayout from '@/components/Layouts/DashboardLayout';
import TopUpButton from '@/components/Modules/DashboardPage/TopUpButton';
import PaymentButton from '@/components/Modules/DashboardPage/PaymentButton';
import TransferButton from '@/components/Modules/DashboardPage/TransferButton';

const PaymentSetUp = () => {
    const [isTopUp, setIsTopUp] = useState(false);
    const [isTransfer, setIsTransfer] = useState(false);
    const [isPay, setIsPay] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("top-up")) {
            setIsTopUp(true);
        } else if (location.pathname.includes("transfer")) {
            setIsTransfer(true);
        } else {
            setIsPay(true);
        }
    }, [location.pathname])

    return (
        <DashboardLayout>
            <div className="w-full h-full flex items-center justify-center px-5 pb-5">
                {isTopUp && (
                    <TopUpButton />
                )}

                {isTransfer && (
                    <TransferButton />
                )}

                {isPay && (
                    <PaymentButton />
                )}
            </div>
        </DashboardLayout>
    )
}

export default PaymentSetUp