import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

import AnimatedLine from '../AnimatedLine';

const InfoSection = () => {
    const refUserActive = useRef(null);
    const refTransactions = useRef(null);
    const refGoals = useRef(null);

    const isUserActiveInView = useInView(refUserActive, { once: true });
    const isTransactionsInView = useInView(refTransactions, { once: true });
    const isGoalsInView = useInView(refGoals, { once: true });

    return (
        <div
            className="w-full h-screen py-5 px-16 relative"
        >
            <ul className="w-full h-full relative">
                <AnimatedLine/>
                <motion.li
                    ref={refUserActive}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{  y: isUserActiveInView ? 0 : 100, opacity: isUserActiveInView ? 1 : 0, scale: isUserActiveInView ? 1 : 0 }}
                    className="flex items-center justify-center p-5 bg-gray-300 rounded-md absolute top-20 left-10"
                >
                    <h3 className="text-5xl font-semibold text-[#333]">10,000</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        PENGGUNA AKTIF
                    </p>
                </motion.li>

                <motion.li
                    ref={refTransactions}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{  y: isTransactionsInView ? 0 : 100, opacity: isTransactionsInView ? 1 : 0, scale: isTransactionsInView ? 1 : 0 }}
                    className="flex items-center justify-center p-5 bg-gray-300 rounded-md absolute top-56 right-32"
                >
                    <h3 className="text-5xl font-semibold text-[#333]">$50M</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        TRANSAKSI
                    </p>
                </motion.li>

                <motion.li
                    ref={refGoals}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{  y: isGoalsInView ? 0 : 100, opacity: isGoalsInView ? 1 : 0, scale: isGoalsInView ? 1 : 0 }}
                    className="flex items-center justify-center p-5 bg-gray-300 rounded-md absolute bottom-20 left-32"
                >
                    <h3 className="text-5xl font-semibold text-[#333]">1,200</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        TUJUAN KEUANGAN
                    </p>
                </motion.li>
            </ul>
        </div>
    );
};

export default InfoSection;
