import React, { useEffect } from 'react'
import Navbar from '../../../pages/Dashboard/Navbar'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase/firebase";
import { useAtom } from 'jotai';
import { emailStorageAtom, tokenStorageAtom, transactionsAtom, userDataAtom } from '../../../jotai/atoms';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EachUtils from '@/utilities/EachUtils';
import { getGreeting } from '@/utilities/greeting';
import { LIST_PLAN_PATH } from '@/constants/listBreadcrumb';


const DashboardLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const location = useLocation();
    const navigate = useNavigate();

    // Ambil path dari URL dan pisahkan menjadi array
    const pathSegments = location.pathname.split("/").filter(Boolean);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user && !emailStorage && !tokenStorage) return location.replace("/")

    return (
        <div className="w-full h-screen flex font-poppins overflow-auto md:overflow-hidden">
            <SidebarProvider> 
                <Navbar />

                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {/* Item pertama selalu dashboard atau home */}
                                    <BreadcrumbItem className="hidden md:block cursor-pointer">
                                        <BreadcrumbLink onClick={() => navigate("/")}>
                                            {getGreeting()}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    {/* Looping untuk path selanjutnya */}
                                    {pathSegments.map((segment, index) => {
                                        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

                                        if (
                                            path === "/dashboard/note/setup/personalization" ||
                                            path === "/dashboard/plan/setup/personalization"
                                        ) return;

                                        if (LIST_PLAN_PATH[path]) {
                                            segment = LIST_PLAN_PATH[path];
                                        }

                                        const formattedText = segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

                                        return (
                                            <React.Fragment key={path}>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem className="cursor-pointer">
                                                    {index === pathSegments.length - 1 ? (
                                                        <BreadcrumbPage>{formattedText}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink onClick={() => navigate(path)}>
                                                            {formattedText}
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default DashboardLayout