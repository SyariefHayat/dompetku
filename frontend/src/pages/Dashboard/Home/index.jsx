import { useAtom } from 'jotai';
import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid } from 'recharts';

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription 
} from "@/components/ui/card";

import { 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
} from '@/components/ui/chart';

import DashboardLayout from '@layouts/DashboardLayout';
import { getDataUser } from '@/services/data/getDataUser';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';

const chartDataMonthly = [
    { month: "Januari", pemasukan: 0, pengeluaran: 0 },
    { month: "Februari", pemasukan: 0, pengeluaran: 0 },
    { month: "Maret", pemasukan: 0, pengeluaran: 0 },
    { month: "April", pemasukan: 0, pengeluaran: 0 },
    { month: "Mei", pemasukan: 0, pengeluaran: 0 },
    { month: "Juni", pemasukan: 0, pengeluaran: 0 },
    { month: "Juli", pemasukan: 0, pengeluaran: 0 },
    { month: "Agustus", pemasukan: 0, pengeluaran: 0 },
    { month: "September", pemasukan: 0, pengeluaran: 0 },
    { month: "Oktober", pemasukan: 0, pengeluaran: 0 },
    { month: "November", pemasukan: 0, pengeluaran: 0 },
    { month: "Desember", pemasukan: 0, pengeluaran: 0 },
];

const chartConfig = {
    pemasukan: {
        label: "Pemasukan",
        color: "#4ade80",
    },
    pengeluaran: {
        label: "Pengeluaran",
        color: "#f87171",
    }
};

const Dashboard = () => {
    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    const [userData, setUserData] = useState("");
    const [activeChart, setActiveChart] = useState("pemasukan");
    const [chartData, setChartData] = useState(chartDataMonthly);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage)
                .then((result) => {
                    if (!result?.data?.transactions) return;
                    
                    setUserData(result.data);
                    const allTransactions = result.data.transactions;
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth();

                    let startDate, endDate;
                    if (currentMonth >= 0 && currentMonth <= 5) {
                        startDate = new Date(currentYear, 0, 1); // January
                        endDate = new Date(currentYear, 5, 30); // June
                    } else {
                        startDate = new Date(currentYear, 6, 1); // July
                        endDate = new Date(currentYear, 11, 31); // December
                    }

                    let updatedChartDataMonthly = JSON.parse(JSON.stringify(chartDataMonthly));

                    const filteredTransactions = allTransactions.filter((transaction) => {
                        const transactionDate = new Date(transaction.createdAt);
                        return transactionDate >= startDate && transactionDate <= endDate;
                    });

                    filteredTransactions.forEach((transaction) => {
                        const date = new Date(transaction.createdAt);
                        const monthIndex = date.getMonth();

                        if (date.getFullYear() === currentYear) {
                            if (transaction.transactionType === "income") {
                                updatedChartDataMonthly[monthIndex].pemasukan += transaction.amount;
                            } else if (transaction.transactionType === "expense") {
                                updatedChartDataMonthly[monthIndex].pengeluaran += transaction.amount;
                            }
                        }
                    });

                    setChartData(updatedChartDataMonthly);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [emailStorage, tokenStorage]);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const displayedChartData = useMemo(() => {
        if (screenWidth < 768) {
            const currentMonth = new Date().getMonth();
            const quarterStart = Math.floor(currentMonth / 4) * 4;
            return chartData.slice(quarterStart, quarterStart + 4);
        }
        return chartData;
    }, [chartData, screenWidth]);

    const total = useMemo(() => ({
        pemasukan: chartData.reduce((acc, curr) => acc + curr.pemasukan, 0),
        pengeluaran: chartData.reduce((acc, curr) => acc + curr.pengeluaran, 0),
    }), [chartData]);

    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col px-5 pb-5">
                <div className="flex flex-1 flex-col gap-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kantong Utama</CardTitle>
                                <CardDescription>Kantong utama untuk menyimpan dan mengelola keuangan Anda dengan mudah.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Rp {userData?.balance?.toLocaleString("id-ID") ?? 0}</p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Catatan Keuangan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Rencanakan keuangan dengan mencatat transaksi, anggaran, dan kebutuhan lainnya.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Kantong Rencana</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Buat dan atur kantong untuk tabungan, investasi, atau kebutuhan spesifik lainnya.</p>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Card className="min-h-[50vh] flex-1 rounded-xl md:min-h-min">
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                <CardTitle>Statistik Keuangan</CardTitle>
                                <CardDescription>{`Grafik transaksi ${screenWidth < 768 ? "4 bulan" : "1 tahun"} terakhir`}</CardDescription>
                            </div>
                            <div className="flex">
                                {["pemasukan", "pengeluaran"].map((key) => (
                                    <button
                                        key={key}
                                        data-active={activeChart === key}
                                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                        onClick={() => setActiveChart(key)}
                                    >
                                        <span className="text-xs text-muted-foreground">{chartConfig[key].label}</span>
                                        <span className="text-lg font-bold leading-none sm:text-3xl">
                                            {(total[key] ?? 0).toLocaleString()}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="aspect-auto h-48 w-full">
                                <BarChart
                                    accessibilityLayer
                                    key={activeChart}
                                    data={displayedChartData}
                                >
                                    <CartesianGrid vertical={false} />
                                        <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />}
                                        />
                                        <Bar dataKey={activeChart} fill={chartConfig[activeChart].color} radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
