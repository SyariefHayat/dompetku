import { useAtom } from 'jotai';
import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { ChevronLeft, TrendingUp } from "lucide-react";

import { 
    Bar, 
    BarChart, 
    Area, 
    AreaChart, 
    CartesianGrid, 
    XAxis, 
    Label, 
    Pie, 
    PieChart, 
    Legend
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { getDataUser } from '@/services/data/getDataUser';
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { emailStorageAtom, tokenStorageAtom, userDataAtom } from '@/jotai/atoms';

const chartDataMonthly = [
    { month: "Januari", pemasukan: 0, pengeluaran: 0 },
    { month: "Februari", pemasukan: 0, pengeluaran: 0 },
    { month: "Maret", pemasukan: 0, pengeluaran: 0 },
    { month: "April", pemasukan: 0, pengeluaran:  0 },
    { month: "Mei", pemasukan: 0, pengeluaran: 0 },
    { month: "Juni", pemasukan: 0, pengeluaran: 0 },
];

const chartDataWeekly = [
    { week: "M-1", pemasukan: 0, pengeluaran: 0 },
    { week: "M-2", pemasukan: 0, pengeluaran: 0 },
    { week: "M-3", pemasukan: 0, pengeluaran: 0 },
    { week: "M-4", pemasukan: 0, pengeluaran: 0 },
    { week: "M-5", pemasukan: 0, pengeluaran: 0 },
]

const chartDataDaily = [
    { day: "Senin", pemasukan: 0, pengeluaran: 0 },
    { day: "Selasa", pemasukan: 0, pengeluaran: 0 },
    { day: "Rabu", pemasukan: 0, pengeluaran: 0 },
    { day: "Kamis", pemasukan: 0, pengeluaran: 0 },
    { day: "Jumat", pemasukan: 0, pengeluaran: 0 },
    { day: "Sabtu", pemasukan: 0, pengeluaran: 0 },
    { day: "Ahad", pemasukan: 0, pengeluaran: 0 },
]

const chartData1 = [
    { 
        month: "Januari", 
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
    { 
        month: "Februari",
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
    { 
        month: "Maret",
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
    { 
        month: "April",
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
    { 
        month: "Mei",
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
    { 
        month: "Juni",
        category: [
            {
                type: "makanan",
                pengeluaran: 0,
                fill: "var(--color-chrome)",
            },
            {
                type: "pendidikan",
                pengeluaran: 0,
                fill: "var(--color-safari)",
            },
            {
                type: "tabungan",
                pengeluaran: 0,
                fill: "var(--color-firefox)",
            },
            {
                type: "belanja",
                pengeluaran: 0,
                fill: "var(--color-edge)",
            },
            {
                type: "lainnya",
                pengeluaran: 0,
                fill: "var(--color-other)"
            }
        ]
    },
]

const chartConfig1 = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
}

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#4ade80",
    },
    mobile: {
        label: "Mobile",
        color: "#f87171",
    }
}

export default function Analithyc() {
    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);
    const [, setUserData] = useAtom(userDataAtom);

    const [selectedRange, setSelectedRange] = useState("month");
    const [chartData, setChartData] = useState(chartDataMonthly);
    const [chartDataArea, setChartDataArea] = useState(chartDataWeekly);
    const [chartDataPie, setChartDataPie] = useState([]);

    const totalVisitors = React.useMemo(() => {
        return chartDataPie?.category?.reduce((acc, curr) => acc + (curr.pengeluaran || 0), 0)
    }, [chartDataPie])

    // Fungsi untuk menentukan minggu keberapa dalam bulan ini
    function getWeekOfMonth(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // Hari pertama dalam bulan
        return Math.ceil((date.getDate() + firstDay) / 7); // Hitung minggu keberapa
    }

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                if (!result?.data?.transactions) return;

                const allTransactions = result?.data.transactions;
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth();

                let startDate, endDate;

                if (currentMonth >= 0 && currentMonth <= 5) {
                    startDate = new Date(currentYear, 0, 1); // 1 januari
                    endDate = new Date(currentYear, 6, 0, 23, 59, 59); // 30 juni
                } else {
                    startDate = new Date(currentYear, 6, 1); // 1 juli
                    endDate = new Date(currentYear, 11, 31, 23, 59, 59) // 31 desember
                }

                let updatedChartDataMonthly = JSON.parse(JSON.stringify(chartDataMonthly))
                let updatedChartDataWeekly = JSON.parse(JSON.stringify(chartDataWeekly))
                let updatedChartDataDaily = JSON.parse(JSON.stringify(chartDataDaily))
                let updatedChartDataPie = JSON.parse(JSON.stringify(chartData1));

                const filteredTransactions = allTransactions.filter((transaction) => {
                    const transactionDate = new Date(transaction.createdAt);
                    return transactionDate >= startDate && transactionDate <= endDate;
                });

                if (selectedRange === "month") {
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

                        if (monthIndex === currentMonth) {
                            updatedChartDataPie[monthIndex].category.forEach((data) => {
                                if (data.type === transaction.category) {
                                    data.pengeluaran += transaction.amount
                                }
                            })
                        }
                    })

                    setChartDataPie(updatedChartDataPie[currentMonth]);
                    setChartData(updatedChartDataMonthly);
                    return setUserData({ ...result.data, transactions: filteredTransactions });
                } else if (selectedRange === "week") {
                    // Proses transaksi untuk update data mingguan
                    filteredTransactions.forEach((transaction) => {
                        const date = new Date(transaction.createdAt);
                        const weekIndex = getWeekOfMonth(date) - 1; // -1 karena array mulai dari 0
                        if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
                            if (transaction.transactionType === "income") {
                                updatedChartDataWeekly[weekIndex].pemasukan += transaction.amount;
                            } else if (transaction.transactionType === "expense") {
                                updatedChartDataWeekly[weekIndex].pengeluaran += transaction.amount;
                            }
                        }
                    });
                    setChartDataArea(updatedChartDataWeekly);
                    return setUserData({ ...result.data, transactions: filteredTransactions });
                } else {
                    filteredTransactions.forEach((transaction) => {
                        const date = new Date(transaction.createdAt);
                        const weekIndex = getWeekOfMonth(date) - 1;
                        const dayIndex = date.getDay(); // 0 (Minggu) - 6 (Sabtu)
                
                        if (date.getFullYear() === currentYear && date.getMonth() === currentMonth && weekIndex === 1) { // Minggu ke-2
                            if (transaction.transactionType === "income") {
                                updatedChartDataDaily[dayIndex].pemasukan += transaction.amount;
                            } else if (transaction.transactionType === "expense") {
                                updatedChartDataDaily[dayIndex].pengeluaran += transaction.amount;
                            }
                        }
                    });
                
                    setChartDataArea(updatedChartDataDaily);
                    return setUserData({ ...result.data, transactions: filteredTransactions });
                }
            })
        }
    }, [emailStorage, tokenStorage, selectedRange])

    return (
        <DashboardLayout>
            <div className="w-full h-full md:h-[90%] px-5 pb-5 grid grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-5">
                <Card className="w-full h-full md:col-span-2 rounded-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Analisis Pemasukan & Pengeluaran</CardTitle>
                            <CardDescription>Januari - Juni 2025</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-24 sm:h-44 w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                    <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <Bar dataKey="pemasukan" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="pengeluaran" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="w-full h-full flex md:block md:row-span-2 rounded-md">
                    <CardHeader>
                        <CardTitle>Analisis Pengeluaran</CardTitle>
                        <CardDescription>
                            <div className="w-full flex items-center justify-center gap-5 mt-5">
                                <Button variant="outline" size="icon">
                                    <ChevronLeft />
                                </Button>

                                <div className="flex flex-col items-center justify-center text-[#333]">
                                    <p className="font-semibold tracking-tight text-xl">Maret</p>
                                    <p>2025</p>
                                </div>

                                <Button variant="outline" size="icon">
                                    <ChevronRight />
                                </Button>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig1}
                            className="mx-auto aspect-square max-h-[300px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartDataPie.category}
                                    dataKey="pengeluaran"
                                    nameKey="type"
                                    innerRadius={80}
                                    strokeWidth={5}
                                >
                                <Label
                                    content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-3xl font-bold"
                                            >
                                                {totalVisitors.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                Visitors
                                            </tspan>
                                        </text>
                                        )
                                    }
                                    }}
                                />
                                </Pie>
                                <Legend
                                    align="center"
                                    verticalAlign="bottom"
                                    formatter={(value) => <span className="text-sm">{value}</span>}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm hidden sm:block">
                        <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                <Card className="w-full h-full md:col-span-2 rounded-md">
                    <CardHeader>
                        <CardTitle>
                            {selectedRange === "month" 
                                ? "Januari - Juni 2025" 
                                : selectedRange === "week" 
                                ? "Maret 2025" 
                                : selectedRange === "daily" 
                                ? "Maret 2025" 
                                : "Minggu ke-2 Maret 2025"
                            }
                        </CardTitle>

                        <CardDescription className="relative">
                            <Select onValueChange={(value) => setSelectedRange(value)}>
                                <SelectTrigger className="w-[120px] sm:w-[180px] absolute right-0 -top-8">
                                    <SelectValue placeholder="Bulanan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="month">Bulanan</SelectItem>
                                    <SelectItem value="week">Mingguan</SelectItem>
                                    <SelectItem value="day">Harian</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-24 sm:h-44 w-full">
                            <AreaChart
                                accessibilityLayer
                                data={selectedRange === "month" ? chartData : chartDataArea}
                                margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey={selectedRange}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                    />
                                    <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                    />
                                    <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                    />
                                </linearGradient>
                                </defs>
                                <Area
                                dataKey="pengeluaran"
                                type="natural"
                                fill="url(#fillMobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                                />
                                <Area
                                dataKey="pemasukan"
                                type="natural"
                                fill="url(#fillDesktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>

    );
}