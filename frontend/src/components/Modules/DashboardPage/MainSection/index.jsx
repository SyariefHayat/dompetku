import { useAtom } from 'jotai'
import React from 'react'
import { totalTransactionsAtom, transactionsAtom } from '../../../../jotai/atoms'
import CustomPieChart from '../PieChart';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import EachUtils from "../../../../utilities/EachUtils"
import { formatDate } from '../../../../utilities/formatDate';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAddCircle } from "react-icons/md";


const MainSection = () => {
    const [transactions, setTransactions] = useAtom(transactionsAtom);
    const [totalTransactions, setTotalTransactions] = useAtom(totalTransactionsAtom);

    const latestTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Urutkan berdasarkan tanggal
    .slice(0, 3); // Ambil 3 transaksi terbaru

    return (
        <div className="w-full h-full flex bg-white rounded-md border border-gray-300 shadow-sm shadow-gray-500 overflow-hidden">
            <div className="w-[32%] h-full p-3">
                <p className="text-xl pt-1 text-center">November</p>
                <div className="w-full h-52 flex items-center justify-center my-3">
                    <CustomPieChart />
                </div>
                <p className="text-center">Rp {totalTransactions.toLocaleString('id-ID')}</p>
            </div>

            <div className="w-[32%] h-full p-3">
                <p className="text-xl pt-1">Aktivitas</p>
                <div className="w-full flex flex-col items-center justify-between gap-2 mt-3">
                    <AnimatePresence mode="wait">
                        {latestTransactions.length === 0 ? (
                            <motion.div
                                key="no-transactions"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 1 }}
                                className="flex items-center justify-center p-3 w-full bg-gray-300 rounded-md border"
                            >
                                <p className="text-gray-500">Tidak ada transaksi terbaru.</p>
                            </motion.div>
                        ) : (
                            <EachUtils 
                                of={latestTransactions}
                                render={(item, index) => (
                                    <motion.div 
                                        key={item._id}
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 1 }}
                                        className="flex items-center justify-between gap-2 p-3 w-full hover:outline outline-gray-500 outline-2 bg-gray-300 rounded-md border"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                                {item.type === 'income' ? 
                                                    <p className='text-green-500'>
                                                        <FaArrowUp size={25}/>
                                                    </p> 
                                                    : 
                                                    <p className='text-red-500'>
                                                        <FaArrowDown size={25}/>
                                                    </p>
                                                }
                                            </div>
                                            <div>
                                                <p>{item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</p>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-center">
                                            <p>Rp {item.amount.toLocaleString('id-ID')}</p>
                                            <p className="text-end text-sm text-gray-500">{formatDate(item.date)}</p>
                                        </div>
                                    </motion.div>
                                )}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-[32%] h-full p-3">
                <div className="w-full h-full">
                    <p className="text-xl pt-1">Rencana</p>
                    <div className="w-full h-4/5 mt-3 flex flex-wrap items-start gap-5">
                        <div className="w-[45%] h-[45%] bg-gray-300 rounded-md hover:outline outline-gray-500 outline-2">
                            <div className="w-full h-full p-3 flex flex-col items-center justify-center">
                                <MdAddCircle size={50} color='#6b7280'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection