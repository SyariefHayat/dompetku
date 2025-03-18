import React, { useEffect, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { getDataUser } from '@/services/data/getDataUser';
import { GetUserTransactions } from '@/services/data/getUserTransactions';

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Receipt = () => {
    const [userTransactions, setUserTransactions] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const orderId = urlParams.get("order_id");
    const status = urlParams.get("transaction_status");

    useEffect(() => {
        if (!orderId) return;

        GetUserTransactions(orderId)
            .then((result) => {
                if (result?.data?.transactions) {
                    setUserTransactions(result.data.transactions[0]);
                }
            })
            .catch((error) => console.error("Error fetching transactions:", error));
    }, [orderId]);

    const handleShare = () => {
        if (navigator.share) {
        navigator.share({
            title: 'Detail Transaksi',
            text: 'Lihat detail transaksi saya',
            url: window.location.href,
        })
        .catch((error) => console.error('Error sharing:', error));
        } else {
        alert('Fitur berbagi tidak didukung di browser ini');
        }
    };

    const handleDownloadReceipt = async () => {
        const cardElement = document.getElementById("receipt-card");

        if (!cardElement) return;

        const canvas = await html2canvas(cardElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Buat PDF
        const pdf = new jsPDF();
        const imgWidth = 190; // Lebar gambar dalam PDF (dalam mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("resi-transaksi.pdf"); // Unduh PDF
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-3 bg-[#f3f3f3] font-poppins">
            <Card id="receipt-card" className="w-[90%] sm:w-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl text-muted-foreground line-clamp-2">{userTransactions?.email}</CardTitle>
                    {userTransactions?.paymentType === "bank" || userTransactions?.paymentType === "bank_transfer" ? (
                        <CardDescription className="uppercase text-muted-foreground">
                            {userTransactions?.vaNumbers[0].bank} {userTransactions?.vaNumbers[0].va_number}
                        </CardDescription>
                    ) : (
                        <CardDescription className="uppercase text-muted-foreground">
                            {userTransactions?.paymentType}
                        </CardDescription>
                    )}
                    
                </CardHeader>
                <hr className="mb-5 border-t-4 border-dashed"/>
                <CardContent className="flex flex-col gap-5">
                    <p className="text-xl font-bold line-clamp-1">Rp {userTransactions?.amount?.toLocaleString('id-ID')}</p>
                    <div>
                        <p className="text-sm text-gray-400">ID Transaksi</p>
                        <p className="text-muted-foreground line-clamp-1">{userTransactions?.orderId}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Ke</p>
                        <p className="text-muted-foreground line-clamp-1">Kantong Utama</p>
                    </div>
                    
                    <div>
                        <p className="text-sm text-gray-400">Tanggal dan waktu</p>
                        <p className="text-muted-foreground line-clamp-1">
                            {new Date(userTransactions?.createdAt).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}{', '}
                            {new Date(userTransactions?.createdAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-muted-foreground">
                            {{
                                settlement: "Berhasil",
                                pending: "Pending",
                                cancel: "Gagal",
                            }[status] || "Unknown"}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                        <Share /> Bagikan
                    </Button>
                    <Button className="w-full" onClick={handleDownloadReceipt}>
                        <Download /> Unduh Resi
                    </Button>
                </CardFooter>
            </Card>
            <Button className="w-[90%] sm:w-[400px] p-6" onClick={() => navigate("/dashboard/payment")}>
                <ArrowLeft /> Kembali
            </Button>
        </div>
    )
}

export default Receipt