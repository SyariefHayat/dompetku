import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, ChevronDown } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAtom } from "jotai";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";
import { getDataUser } from "@/services/data/getDataUser";

// Kolom Tabel
const columns = [
    {
        accessorKey: "_id",
        header: "Id",
        cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
        accessorKey: "transactionType",
        header: "Tipe",
        cell: ({ row }) => <div className="capitalize">{row.getValue("transactionType")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Tanggal
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            const formattedDate = date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
            return <div className="capitalize ml-4">{formattedDate}</div>;
        },    
    },
    {
        accessorKey: "paymentType",
        header: "Metode",
        cell: ({ row }) => <div className="capitalize">{row.getValue("paymentType")}</div>,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Nominal
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formattedAmount = amount.toLocaleString("id-Id")
            return <div className="ml-4 font-medium">Rp {formattedAmount}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Activity = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const [userData, setUserData] = useState([]);

    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getDataUser(emailStorage, tokenStorage).then((result) => {
                setUserData(result?.data?.transactions || []);
            })
        }
    }, [emailStorage, tokenStorage])

    const table = useReactTable({
        data: userData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <DashboardLayout>
            <ScrollArea className="w-[200%] sm:w-full h-full px-5 pb-5">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter ID..."
                        value={table.getColumn("id")?.getFilterValue() ?? ""}
                        onChange={(event) =>
                            table.getColumn("id")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>

                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center">No results.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </div>
            </ScrollArea>
        </DashboardLayout>
    );
};

export default Activity;
