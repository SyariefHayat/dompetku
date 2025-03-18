import { useAtom } from 'jotai';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { getDataUser } from '@/services/data/getDataUser';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';

const Transfer = () => {
    const [userData, setUserData] = useState("");
    const [isEyeOpen, setIsEyeOpen] = useState(true);

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const navigate = useNavigate();

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                setUserData(result?.data);
            })
        }
    }, [emailStorage, tokenStorage])

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col gap-5 px-5 pb-5">
                <div className="w-full md:w-1/2 flex items-center justify-between font-medium bg-gray-100 py-1 px-2 rounded-md shadow-sm">
                    <p>Total Saldo</p>
                    <div className="flex items-center justify-between text-lg gap-3">
                        {isEyeOpen && userData ? (
                            <p>Rp {userData?.balance.toLocaleString("id-ID")}</p>
                        ) : (
                            <p>Rp ------</p>
                        )}
                        <button 
                            onClick={() => setIsEyeOpen((prev) => !prev)} 
                            className="p-2 rounded-md hover:bg-gray-200 transition"
                        >
                            {isEyeOpen ? <Eye className="cursor-pointer" /> : <EyeOff className="cursor-pointer" />}
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <Card className="cursor-pointer" onClick={() => navigate("/dashboard/payment/top-up")}>
                        <CardHeader>
                            <CardTitle>Top Up Saldo</CardTitle>
                            <CardDescription>Tambah saldo ke akun dompet digital Anda dengan mudah.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                        </CardFooter>
                    </Card>

                    <Card className="cursor-pointer" onClick={() => navigate("/dashboard/payment/transfer")}>
                        <CardHeader>
                            <CardTitle>Transfer Saldo</CardTitle>
                            <CardDescription>Kirim saldo ke kantong lain dengan cepat dan aman.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                        </CardFooter>
                    </Card>

                    <Card className="cursor-pointer" onClick={() => navigate("/dashboard/payment/pay")}>
                        <CardHeader>
                            <CardTitle>Bayar</CardTitle>
                            <CardDescription>Lakukan pembayaran dengan cepat dan mudah.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Transfer