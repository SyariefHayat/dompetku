import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CreditCard, HandCoins, HandHeart, Landmark, Loader2, Plane, Siren, University } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EachUtils from "@/utilities/EachUtils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LIST_WALLET_COLOR } from "@/constants/listWallet"
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms"
import DashboardLayout from "@/components/Layouts/DashboardLayout"
import { apiInstanceExpress } from "@/services/express/apiInstance"

const Personalisasi = () => {
    const [walletName, setWalletName] = useState("");
    const [walletDesc, setWalletDesc] = useState("");
    const [walletType, setWalletType] = useState("");
    const [walletIcon, setWalletIcon] = useState("");
    const [walletColor, setWalletColor] = useState("bg-white");
    
    const [isLoading, setIsLoading] = useState(false);

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("pay-wallet")) {
            setWalletType("Pengeluaran");
            setWalletIcon(Landmark);
            setWalletName("Kantong Pengeluaran");
            setWalletDesc("Kantong untuk mengelola pengeluaran sehari-hari.");
        } else if (location.pathname.includes("save-wallet")) {
            setWalletType("Tabungan");
            setWalletIcon(HandCoins);
            setWalletName("Kantong Tabungan");
            setWalletDesc("Kantong untuk menabung demi membeli barang impian.");
        } else if (location.pathname.includes("school-wallet")) {
            setWalletType("Pendidikan");
            setWalletIcon(University);
            setWalletName("Kantong Pendidikan");
            setWalletDesc("Kantong untuk menyimpan uang pembayaran pendidikan.");
        } else if (location.pathname.includes("emergency-wallet")) {
            setWalletType("Darurat");
            setWalletIcon(Siren);
            setWalletName("Kantong Dana Darurat");
            setWalletDesc("Kantong untuk menyimpan dana darurat untuk situasi tak terduga.");
        } else if (location.pathname.includes("vacation-wallet")) {
            setWalletType("Liburan");
            setWalletIcon(Plane);
            setWalletName("Kantong Liburan");
            setWalletDesc("Kantong untuk menyimpan dana perjalanan liburan.");
        } else {
            setWalletType("Donasi");
            setWalletIcon(HandHeart);
            setWalletName("Kantong Kebaikan");
            setWalletDesc("Kantong untuk menyisihkan dana berbagi dan amal.");
        }
    }, [location.pathname])

    const handleWallet = async () => {
        try {
            const response = await apiInstanceExpress.post("/plans", {
                email: emailStorage,
                token: tokenStorage,
                title: walletName,
                desc: walletDesc,
                color: walletColor,
                type: walletType,
            });

            if (response.status === 201) {
                setIsLoading(true);

                setTimeout(() => {
                    navigate("/dashboard/plan");
                }, 1500)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col items-center justify-center px-5 pb-5">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <Card className={`w-full md:w-[380px] ${walletColor}`}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                {walletIcon && 
                                    React.createElement(walletIcon)
                                }
                                <CreditCard/>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <CardTitle>{walletName}</CardTitle>
                            <CardDescription>{walletDesc}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            Rp 0
                        </CardFooter>
                    </Card>

                    <div className="flex flex-col gap-5">
                        <div className="w-full md:w-[380px]">
                            <Label htmlFor="wallet-name">Pilih warna</Label>
                            <Select onValueChange={setWalletColor}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Default" />
                                </SelectTrigger>
                                <SelectContent>
                                    <EachUtils
                                        of={LIST_WALLET_COLOR}
                                        render={(item, index) => (
                                            <SelectItem key={index} value={item.value}>
                                                <div className="w-full h-full flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full ${item.color}`}></div>
                                                    <p className="text-gray-500">{item.title}</p>
                                                </div>
                                            </SelectItem>
                                        )}
                                    />
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="w-full md:w-[380px]">
                            <Label htmlFor="wallet-name">Masukkan nama kantong</Label>
                            <Input type="text" id="wallet-name" placeholder={`Cth. ${walletName}`} onChange={(e) => setWalletName(e.target.value)} />
                        </div>

                        <div className="w-full md:w-[380px]">
                            <Label htmlFor="desc">Deskripsi Kantong</Label>
                            <Textarea placeholder={`Cth. ${walletDesc}`} id="desc" onChange={(e) => setWalletDesc(e.target.value)}/>
                        </div>

                        {isLoading ? (
                            <Button className="w-full md:w-[380px]" disabled>
                                <Loader2 className="animate-spin" />
                                Sedang membuat kantong anda
                            </Button>
                        ) : (
                            <Button className="w-[380px]" onClick={handleWallet}>
                                Buat kantong
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Personalisasi