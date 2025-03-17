import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AlertTriangle, EllipsisVertical, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { formatDateFull } from "@/utilities/formatDate";
import { getDataUser } from "@/services/data/getDataUser";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { emailStorageAtom, tokenStorageAtom, userDataAtom } from "@/jotai/atoms";
import EachUtils from "@/utilities/EachUtils";
import { apiInstanceExpress } from "@/services/express/apiInstance";

import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

const Plan = () => {
    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);
    const [userData, setUserData] = useAtom(userDataAtom);

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                setUserData(result?.data);
            })
        }
    }, [emailStorage, tokenStorage, userData])

    const handleDeleteBtn = async (id) => {
        try {
            const response = await apiInstanceExpress.delete(`/plans/${emailStorage}/${tokenStorage}/${id}`);

            if (response.status === 200) {
                toast.success("Kantong berhasil dihapus!", {
                    duration: 3000,
                });
            }
        } catch (error) {
            toast.error("Gagal menghapus kantong. Silakan coba lagi.", {
                duration: 3000,
            });
        }
    }

    return (
        <DashboardLayout>
            <Toaster />
            <div className="w-full h-full flex flex-col py-3 px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <p>Kantong Utama</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, accusamus.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Rp {userData?.balance.toLocaleString("id-ID")}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{formatDateFull(userData?.createdAt)}</p>
                        </CardFooter>
                    </Card>

                    {userData && (
                        <EachUtils
                            of={userData.plans}
                            render={(item, index) => (
                                <Card key={index} className={`${item.color}`}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <p>{item.title}</p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDeleteBtn(item._id)}
                                                    >
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardTitle>
                                        <CardDescription>{item.desc}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Rp {item.amount.toLocaleString("id-ID")}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p>{formatDateFull(item.createdAt)}</p>
                                    </CardFooter>
                                </Card>
                            )}
                        />
                    )}
                    
                    <Link to="/dashboard/plan/setup" className="fixed w-14 h-14 rounded-full bottom-5 right-5 bg-sky-500 flex items-center justify-center text-white cursor-pointer" title="Tambah Rencana">
                        <Plus size={40} />
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Plan