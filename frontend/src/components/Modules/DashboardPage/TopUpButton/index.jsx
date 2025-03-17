import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailStorageAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const TopUpButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [snapToken, setSnapToken] = useState(null);
    const [paymentMessage, setPaymentMessage] = useState(null);

    const [amount, setAmount] = useState("");
    const [formatAmount, setFormatAmount] = useState("Rp ");

    const [emailStorage] = useAtom(emailStorageAtom);

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        setAmount(parseInt(rawValue, 10));
        setFormatAmount(rawValue ? `Rp ${parseInt(rawValue).toLocaleString("id-ID")}` : "Rp ");
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_CLIENT_KEY");
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const handlePayment = async () => {
        try {
            const orderId = new Date().getTime();
            const response = await apiInstanceExpress.post("create-transaction", {
                amount,
                orderId,
                email: emailStorage,
            });
    
            setSnapToken(response.data.token);

            if (window.snap) {
                setIsOpen(false);
                window.snap.pay(response.data.token, {
                    onSuccess: (result) => {
                        setPaymentMessage("Payment success: " + JSON.stringify(result));
                    },
                    onPending: (result) => {
                        setPaymentMessage("Payment pending: " + JSON.stringify(result));
                    },
                    onError: (error) => {
                        setPaymentMessage("Payment error: " + JSON.stringify(error));
                    },
                    onClose: () => {
                        setPaymentMessage("Payment popup closed");
                    }
                });
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };
    
    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>Top Up Saldo</CardTitle>
                <CardDescription>Tambah saldo ke akun dompet digital Anda dengan mudah.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="amount">
                        Jumlah Top Up
                    </Label>
                    <Input 
                        id="amount" 
                        type="text"
                        value={formatAmount}
                        onChange={handleAmountChange}
                        placeholder="Masukkan nominal"
                    />
                    <Button type="button" className="w-full" onClick={handlePayment}>
                        Pilih Metode Pembayaran
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">Saldo akan bertambah setelah pembayaran berhasil.</p>
            </CardFooter>
        </Card>
    );
};

export default TopUpButton;
