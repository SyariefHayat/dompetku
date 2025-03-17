import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateFull } from "@/utilities/formatDate";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const NotePersonalization = () => {
    const [defaultNote, setDefaultNote] = useState(false);
    const [taskNote, setTaskNote] = useState(false);
    const [listNote, setListNote] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [defaultColor, setDefaultColor] = useState("bg-white");
    const [taskColor, setTaskColor] = useState("bg-white");
    const [listColor, setListColor] = useState("bg-white");

    const [defaultTitle, setDefaultTitle] = useState("");
    const [defaultContent, setDefaultContent] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [listTitle, setListTitle] = useState("");

    const [subTasks, setSubTasks] = useState([{ id: Date.now(), text: "", isChecked: false }]);
    const [listItems, setListItems] = useState([{ id: Date.now(), text: "" }]);

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes("default-note")) setDefaultNote(true);
        if (location.pathname.includes("task-note")) setTaskNote(true);
        if (location.pathname.includes("list-note")) setListNote(true);
    }, [location.pathname]);

    const addSubTask = () => {
        setSubTasks([...subTasks, { id: Date.now(), text: "", isChecked: false }]);
    };

    const addListItem = () => {
        setListItems([...listItems, { id: Date.now(), text: "" }]);
    };

    const removeSubTask = (id) => {
        setSubTasks(subTasks.filter((task) => task.id !== id));
    };

    const removeListItem = (id) => {
        setListItems(listItems.filter((item) => item.id !== id));
    };

    const updateSubTaskText = (id, text) => {
        setSubTasks(subTasks.map((task) => (task.id === id ? { ...task, text } : task)));
    };

    const updateListItemText = (id, text) => {
        setListItems(listItems.map((item) => (item.id === id ? { ...item, text } : item)));
    };

    const handleSubmitBtn = async () => {
        let data;

        if (defaultNote) {
            data = {
                email: emailStorage,
                token: tokenStorage,
                title: defaultTitle,
                content: defaultContent,
                type: "note",
                color: defaultColor
            };
        } else if (taskNote) {
            data = {
                email: emailStorage,
                token: tokenStorage,
                title: taskTitle,
                subTasks: subTasks.map(task => ({ text: task.text })),
                type: "task",
                color: taskColor,
            }
        } else {
            data = {
                email: emailStorage,
                token: tokenStorage,
                title: listTitle,
                listItems: listItems.map(item => ({ text: item.text })),
                type: "list",
                color: listColor,
            }
        }

        try {
            const response = await apiInstanceExpress.post("notes", data);

            if (response.status === 201) {
                setIsLoading(true);

                setTimeout(() => {
                    navigate("/dashboard/note");
                }, 1500)
            };
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-5 pb-5">
                {defaultNote && (
                    <Card className={`w-[380px] ${defaultColor}`}>
                        <CardHeader>
                            <input
                                type="text"
                                placeholder="Judul"
                                onChange={(e) => setDefaultTitle(e.target.value)}
                                className="font-semibold leading-none tracking-tight border-b-2 outline-none bg-transparent w-full"
                            />
                        </CardHeader>
                        <CardContent>
                            <textarea
                                placeholder="Konten"
                                className="w-full outline-none bg-transparent resize-none overflow-hidden min-h-[50px]"
                                rows={3}
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                    setDefaultContent(e.target.value);
                                }}
                            />
                        </CardContent>
                        <CardFooter className="justify-between">
                            <p>{formatDateFull(new Date())}</p>
                            <div className="flex items-center gap-2">
                                <div
                                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                                onClick={() => setDefaultColor("bg-red-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer"
                                onClick={() => setDefaultColor("bg-green-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-yellow-500 rounded-full cursor-pointer"
                                onClick={() => setDefaultColor("bg-yellow-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer"
                                onClick={() => setDefaultColor("bg-white")}
                                ></div>
                            </div>
                        </CardFooter>
                    </Card>
                )}

                {taskNote && (
                    <Card className={`w-[380px] ${taskColor}`}>
                        <CardHeader>
                            <input
                                type="text"
                                placeholder="Judul"
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className="font-semibold leading-none tracking-tight border-b-2 outline-none bg-transparent w-full"
                            />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {subTasks.map((task) => (
                                <div key={task.id} className="flex items-center space-x-2 border-b pb-1">
                                    <Checkbox id={`task-${task.id}`} disabled/>
                                    <input
                                        type="text"
                                        placeholder="Sub Tugas"
                                        value={task.text}
                                        onChange={(e) => updateSubTaskText(task.id, e.target.value)}
                                        className="w-full outline-none bg-transparent"
                                    />
                                    <div className="flex gap-3">
                                        <Plus size={15} className="cursor-pointer" onClick={addSubTask} />
                                        {subTasks.length > 1 && (
                                        <Minus size={15} className="cursor-pointer" onClick={() => removeSubTask(task.id)} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-between">
                            <p>{formatDateFull(new Date())}</p>
                            <div className="flex items-center gap-2">
                                <div
                                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                                onClick={() => setTaskColor("bg-red-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer"
                                onClick={() => setTaskColor("bg-green-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-yellow-500 rounded-full cursor-pointer"
                                onClick={() => setTaskColor("bg-yellow-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer"
                                onClick={() => setTaskColor("bg-white")}
                                ></div>
                            </div>
                        </CardFooter>
                    </Card>
                )}

                {listNote && (
                    <Card className={`w-[380px] ${defaultColor}`}>
                        <CardHeader>
                            <input
                                type="text"
                                placeholder="Judul"
                                onChange={(e) => setListTitle(e.target.value)}
                                className="font-semibold leading-none tracking-tight border-b-2 outline-none bg-transparent w-full"
                            />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {listItems.map((item, index) => (
                                <div key={item.id} className="flex items-center space-x-2 border-b pb-1">
                                    <div className="w-6 h-6 flex items-center justify-center rounded-sm text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    
                                    <input
                                        type="text"
                                        placeholder="Item"
                                        value={item.text}
                                        onChange={(e) => updateListItemText(item.id, e.target.value)}
                                        className="w-full outline-none bg-transparent"
                                    />
                                    <div className="flex gap-3">
                                        <Plus size={15} className="cursor-pointer" onClick={addListItem} />
                                        {listItems.length > 1 && (
                                            <Minus size={15} className="cursor-pointer" onClick={() => removeListItem(item.id)} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-between">
                            <p>{formatDateFull(new Date())}</p>
                            <div className="flex items-center gap-2">
                                <div
                                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"
                                onClick={() => setListColor("bg-red-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer"
                                onClick={() => setListColor("bg-green-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-yellow-500 rounded-full cursor-pointer"
                                onClick={() => setListColor("bg-yellow-100")}
                                ></div>
                                <div
                                className="w-4 h-4 bg-gray-400 rounded-full cursor-pointer"
                                onClick={() => setListColor("bg-white")}
                                ></div>
                            </div>
                        </CardFooter>
                    </Card>
                )}

                {isLoading ? (
                    <Button className="w-full md:w-[380px]" disabled>
                        <Loader2 className="animate-spin" />
                        Sedang membuat catatan anda
                    </Button>
                ) : (
                    <Button className="w-[380px]" onClick={handleSubmitBtn}>
                        Buat Catatan
                    </Button>
                )}
            </div>
        </DashboardLayout>
    );
};

export default NotePersonalization;
