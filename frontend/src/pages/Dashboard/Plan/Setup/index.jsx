import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import EachUtils from "@/utilities/EachUtils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LIST_WALLET_TYPE } from "@/constants/listWallet"
import DashboardLayout from "@/components/Layouts/DashboardLayout"

const PlanSetUp = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <ScrollArea className="w-full h-full flex flex-col gap-5 px-5 pb-5">
                <h2 className="text-2xl text-muted-foreground">Untuk apa kamu menggunakan kantong ini ?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <EachUtils
                        of={LIST_WALLET_TYPE}
                        render={(item, index) => (
                            <Card key={index} className="cursor-pointer" onClick={() => navigate(item.url)}>
                                <CardHeader>
                                    <CardTitle>
                                        <Badge>{item.badge}</Badge>
                                        <h2 className="text-xl mt-2">{item.title}</h2>
                                    </CardTitle>
                                    <CardDescription>{item.desc}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        )}
                    />
                </div>
            </ScrollArea>
        </DashboardLayout>
    )
}


export default PlanSetUp