import { z } from "zod";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";

// Skema validasi menggunakan zod
const transferSchema = z.object({
    Bank: z.string().min(1, "Pilih bank tujuan"),
    NoRek: z.string()
        .min(1, "Masukkan nomor rekening")
        .regex(/^\d+$/, "Nominal harus berupa angka"),
    amount: z.string()
        .min(1, "Masukkan nominal transfer")
        .regex(/^\d+$/, "Nominal harus berupa angka")
        .transform((val) => Number(val)),
})

const TransferButton = () => {
    const [formatAmount, setFormatAmount] = useState("Rp ");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom)

    const form = useForm({
        resolver: zodResolver(transferSchema),
        defaultValues: {
            Bank: "",
            NoRek: "",
            amount: "",
        },
    });

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        setFormatAmount(rawValue ? `Rp ${parseInt(rawValue).toLocaleString("id-ID")}` : "Rp ");
        
        form.setValue("amount", rawValue);
    };

    const onSubmit = async (data) => {
        // Data transfer
        const transferData = {
            ...data,
            email: emailStorage,
            token: tokenStorage,
            transactionType: "expense", // Tambahkan transactionType otomatis
        };

        setIsLoading(true);

        setTimeout(() => {
            navigate("/dashboard/plan");
        }, 1500)
    };

    

    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>Transfer Saldo</CardTitle>
                <p className="text-sm text-gray-500">Kirim saldo ke kantong lain dengan cepat dan aman.</p>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        {/* Pilih Bank */}
                        <FormField control={form.control} name="Bank" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Tujuan</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Bank" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="bca">BCA</SelectItem>
                                        <SelectItem value="bni">BNI</SelectItem>
                                        <SelectItem value="bri">BRI</SelectItem>
                                        <SelectItem value="mandiri">MANDIRI</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* No Rekening Tujuan */}
                        <FormField control={form.control} name="NoRek" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Rekening Tujuan</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Masukkan nomor rekening" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Input jumlah transfer */}
                        <FormField control={form.control} name="amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jumlah Pembayaran</FormLabel>
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

                        {/* Tombol submit */}
                        {isLoading ? (
                            <Button disabled>
                                <Loader2 className="animate-spin mr-2" />
                                Sedang mengirim uang...
                            </Button>
                        ) : (
                            <Button type="submit">Kirim</Button>
                        )}
                    </form>
                </Form>
            </CardContent>

            <CardFooter>
                <p className="text-sm text-gray-500">
                    Pastikan nomor rekening dan jumlah pembayaran sudah benar sebelum melanjutkan.
                </p>
            </CardFooter>
        </Card>

    );
};

export default TransferButton;
