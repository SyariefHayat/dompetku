import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import EachUtils from '@/utilities/EachUtils';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateFull } from '@/utilities/formatDate';
import { getDataUser } from '@/services/data/getDataUser';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { apiInstanceExpress } from '@/services/express/apiInstance';

const Notes = () => {
    const [notesData, setNotesData] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [listData, setListData] = useState(null);
    const [isFinish, setIsFinish] = useState(false);

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const [checkedTasks, setCheckedTasks] = useState({});

    const handleCheckboxChange = async (noteId, subTaskId, isChecked) => {
        try {
            const response = await apiInstanceExpress.put(`notes/${emailStorage}/${tokenStorage}/${noteId}`, {
                email: emailStorage,
                token: tokenStorage,
                subTaskId,
                isChecked: !isChecked,
            })

            if (response.status === 200) {
                setCheckedTasks((prevChecked) => ({
                    ...prevChecked,
                    [subTaskId]: !isChecked
                }));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const isAllSubtasksChecked = (subTasks) => {
        return subTasks?.every(subTask => subTask.isChecked);
    };

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                if (result?.data.notes) {
                    const notes = [];
                    const tasks = [];
                    const lists = [];
    
                    result.data.notes.forEach((data) => {
                        if (data.type === "note") notes.push(data);
                        if (data.type === "task") tasks.push(data);
                        if (data.type === "list") lists.push(data);
                    });
    
                    setNotesData(notes);
                    setTaskData(tasks);
                    setListData(lists);
                }
            }).catch((error) => {
                console.error("Error fetching user notes:", error);
            });
        }
    }, [emailStorage, tokenStorage, taskData]); 

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col px-5 pb-5">
                <div className="w-full h-full">
                    <Tabs defaultValue="notes" className="w-full">
                        <div className="p-2 mb-3 rounded-md">
                            <TabsList>
                                <TabsTrigger value="notes">Catatan</TabsTrigger>
                                <TabsTrigger value="todos">Tugas</TabsTrigger>
                                <TabsTrigger value="lists">List</TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" className="w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link to="/dashboard/note/setup">
                                                Catatan Baru
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TabsList>
                        </div>

                        <TabsContent value="notes">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {notesData && (
                                    <EachUtils
                                        of={notesData}
                                        render={(item, index) => (
                                            <Card key={index} className={`flex flex-col justify-between ${item.color}`}>
                                                <CardHeader>
                                                    <CardTitle>{item.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <p>
                                                        {item.content}
                                                    </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <p>{formatDateFull(item.createdAt)}</p>
                                                </CardFooter>
                                            </Card>
                                        )}
                                    />
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="todos">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {taskData && (
                                    <EachUtils 
                                        of={taskData}
                                        render={(item, index) => {
                                            const allChecked = isAllSubtasksChecked(item.subTasks);

                                            return (
                                                <Card key={index} className={`flex flex-col justify-between ${item.color}`}>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-3">
                                                            <Checkbox 
                                                                checked={allChecked}
                                                                onCheckedChange={() => {
                                                                    const newChecked = !allChecked;
                                                                    item.subTasks.forEach(sub => 
                                                                        handleCheckboxChange(item._id, sub._id, !newChecked)
                                                                    );
                                                                }}
                                                                // checked={checkedTasks[item._id] || false} 
                                                                // onCheckedChange={() => handleCheckboxChange(item._id, true, item.subTasks)} 
                                                            />
                                                            <p className="line-clamp-1">{item.title}</p>
                                                        </CardTitle>
                                                    </CardHeader>

                                                    <CardContent className="w-full h-full flex flex-col items-start space-y-2">
                                                        <EachUtils 
                                                            of={item.subTasks}
                                                            render={(subItem, subIndex) => (
                                                                <div key={subIndex} className="w-full pl-7 flex items-center gap-3">
                                                                    <Checkbox 
                                                                        checked={subItem.isChecked}
                                                                        onCheckedChange={() => handleCheckboxChange(item._id, subItem._id, subItem.isChecked)} 
                                                                    />
                                                                    <div>
                                                                        <p>{subItem.text}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        />
                                                    </CardContent>

                                                    <CardFooter>
                                                        <p>{formatDateFull(item.createdAt)}</p>
                                                    </CardFooter>
                                                </Card>
                                            )
                                        }}
                                    />
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="lists">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {listData && (
                                    <EachUtils
                                        of={listData}
                                        render={(item, index) => (
                                            <Card key={index} className={`flex flex-col justify-between ${item.color}`}>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center pb-2 gap-3 border-b">
                                                        <p className="line-clamp-1">{item.title}</p>
                                                    </CardTitle>
                                                </CardHeader>

                                                <CardContent className="w-full h-full flex flex-col items-start space-y-2">
                                                    <ol className="w-full pl-4 flex flex-col items-center gap-3 list-decimal">
                                                        <EachUtils 
                                                            of={item.listItems}
                                                            render={(item, index) => (
                                                                <li key={index} className="w-full">
                                                                    <div>
                                                                        <p>{item.text}</p>
                                                                    </div>
                                                                </li>
                                                            )}
                                                        />
                                                    </ol>
                                                </CardContent>

                                                <CardFooter>
                                                    <p>{formatDateFull(item.createdAt)}</p>
                                                </CardFooter>
                                            </Card>
                                        )}
                                    />
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Notes

    // const handleCheckboxChange = (taskId, hasSubTasks = false, subTasks = []) => {
    //     setCheckedTasks((prevChecked) => {
    //         const isChecked = !prevChecked[taskId]; // Toggle checkbox utama
    //         const updatedChecked = { ...prevChecked, [taskId]: isChecked };
    
    //         // Jika checkbox utama dicentang dan memiliki sub-tugas, centang semua sub-tugas
    //         if (hasSubTasks) {
    //             subTasks.forEach((subTask, index) => {
    //                 updatedChecked[`${taskId}-sub-${index}`] = isChecked;
    //             });
    //         }
    
    //         return updatedChecked;
    //     });
    // };