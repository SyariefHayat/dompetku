import { z } from "zod";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input";
import EachUtils from "@/utilities/EachUtils";
import { Button } from "@/components/ui/button";
import { getDataUser } from "@/services/data/getDataUser";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/express/apiInstance";

// Skema validasi menggunakan zod
const transferSchema = z.object({
    senderId: z.string().min(1, "Pilih kantong asal"),
    recipientId: z.string()
        .min(1, "Pilih kantong tujuan"),
    amount: z.string()
        .min(1, "Masukkan nominal transfer")
        .regex(/^\d+$/, "Nominal harus berupa angka")
        .transform((val) => Number(val)),
}).superRefine((data, ctx) => {
    if (data.senderId === data.recipientId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kantong asal dan tujuan tidak boleh sama",
            path: ["recipientId"],
        });
    }
});

const TransferButton = () => {
    const [userData, setUserData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formatAmount, setFormatAmount] = useState("Rp ");

    const [toAmount, setToAmount] = useState("");
    const [fromAmount, setFromAmount] = useState("");

    const navigate = useNavigate();

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const form = useForm({
        resolver: zodResolver(transferSchema),
        defaultValues: {
            senderId: "",
            recipientId: "",
            amount: "",
        },
    });

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                setUserData(result.data);
            })
        }
    }, [emailStorage, tokenStorage])

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        setFormatAmount(rawValue ? `Rp ${parseInt(rawValue).toLocaleString("id-ID")}` : "Rp ");
        
        form.setValue("amount", rawValue);
    };

    const onSubmit = async (data) => {
        // Ambil saldo dari kantong yang dipilih
        const selectedPocket = data.senderId === "main-pocket"
            ? userData?.balance || 0
            : userData?.plans?.find(plan => plan._id === data.senderId)?.amount || 0;

        const transferAmount = Number(data.amount);

        // Cek saldo
        if (transferAmount > selectedPocket) {
            form.setError("amount", { type: "manual", message: "Saldo tidak cukup" });
            return;
        }

        // Data transfer
        const transferData = {
            ...data,
            email: emailStorage,
            token: tokenStorage,
            transactionType: "transfer", // Tambahkan transactionType otomatis
        };

        try {
            const response = await apiInstanceExpress.post("transactions", transferData);
            setIsLoading(true);

            if (response.status === 201) {
                setTimeout(() => {
                    navigate("/dashboard/plan");
                }, 1500)
            }
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>Transfer Saldo</CardTitle>
                <CardDescription>Kirim saldo ke kantong lain dengan cepat dan aman.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-start gap-2">
                         {/* Pilih kantong asal */}
                        <FormField control={form.control} name="senderId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dari</FormLabel>
                                <Select onValueChange={(value) => {
                                            field.onChange(value);
                                            if (value === "main-pocket") {
                                                setFromAmount(userData.balance);
                                            } else {
                                                const selectedPlan = userData?.plans?.find(plan => plan._id === value);
                                                setFromAmount(selectedPlan ? selectedPlan.amount : 0);
                                            }
                                        }}
                                        value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kantong" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="main-pocket">Kantong Utama</SelectItem>
                                        {userData && (
                                            <EachUtils
                                                of={userData?.plans}
                                                render={(item, index) => (
                                                    <SelectItem key={index} value={item._id}>{item.title}</SelectItem>
                                                )}
                                            />
                                        )}
                                    </SelectContent>
                                </Select>
                                {field.value && (
                                    <FormDescription>
                                        Rp {fromAmount.toLocaleString("id-ID")}
                                    </FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Pilih kantong tujuan */}
                        <FormField control={form.control} name="recipientId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tujuan</FormLabel>
                                <Select onValueChange={(value) => {
                                            field.onChange(value);
                                            if (value === "main-pocket") {
                                                setToAmount(userData.balance);
                                            } else {
                                                const selectedPlan = userData?.plans?.find(plan => plan._id === value);
                                                setToAmount(selectedPlan ? selectedPlan.amount : 0);
                                            }
                                        }} 
                                        value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kantong" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="main-pocket">Kantong Utama</SelectItem>
                                        {userData && (
                                            <EachUtils
                                                of={userData?.plans}
                                                render={(item, index) => (
                                                    <SelectItem key={index} value={item._id}>{item.title}</SelectItem>
                                                )}
                                            />
                                        )}
                                    </SelectContent>
                                </Select>
                                {field.value && (
                                    <FormDescription>
                                        Rp {toAmount.toLocaleString("id-ID")}
                                    </FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Input jumlah transfer */}
                        <FormField control={form.control} name="amount" render={() => (
                            <FormItem>
                                <FormLabel>Nominal</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        value={formatAmount}
                                        onChange={handleAmountChange}
                                        placeholder="Masukkan nominal"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {isLoading ? (
                            <Button disabled>
                                <Loader2 className="animate-spin" />
                                Sedang mengirim uang
                            </Button>
                        ) : (
                            <Button type="submit">
                                Kirim
                            </Button>
                        )}
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">Pastikan saldo anda mencukupi sebelum transfer.</p>
            </CardFooter>
        </Card>
    );
};

export default TransferButton;
