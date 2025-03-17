import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import EachUtils from '@/utilities/EachUtils'
import { LIST_NOTES_TYPE } from '@/constants/listNotes'
import DashboardLayout from '@/components/Layouts/DashboardLayout'

const NoteSetUp = () => {

    const navigate = useNavigate()

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col px-5 pb-5">
                <h2 className="mb-5 text-2xl text-muted-foreground">Untuk apa kamu menggunakan catatan ini ?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <EachUtils
                        of={LIST_NOTES_TYPE}
                        render={(item, index) => (
                            <Card key={index} className="cursor-pointer" onClick={() => navigate(item.url)}>
                                <CardHeader>
                                    <CardTitle>
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
            </div>
        </DashboardLayout>
    )
}

export default NoteSetUp