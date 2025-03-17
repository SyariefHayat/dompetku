import React, { useState } from "react";
import { motion } from "framer-motion";

import EachUtils from "@/utilities/EachUtils";
import { LIST_NAVBAR_LD } from '@/constants/listNavbar';
import { FaWallet } from "react-icons/fa";


// Variants untuk sidebar animasi
const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 80% 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(10px at 15% 25px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

// Komponen Path untuk membuat garis pada ikon hamburger
const Path = (props) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="#333"
        strokeLinecap="round"
        {...props}
    />
);

const Hamburger = () => {
    // State untuk mengatur apakah menu terbuka atau tertutup
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-screen h-screen">
            {/* Hamburger menu */}
            <div
                className={`absolute z-20 w-10 h-10 flex items-center justify-center pt-1 pl-[2px] rounded-full top-[7px] left-0 cursor-pointer bg-[#f3f3f3]`}
                onClick={() => setIsOpen(!isOpen)} // Mengubah state saat tombol diklik
            >
                <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 23 23"
                    initial={false}
                    animate={isOpen ? "open" : "closed"} // Animasi berdasarkan state
                >
                    {/* Garis atas */}
                    <Path
                        variants={{
                            closed: { d: "M 2 2.5 L 20 2.5" },
                            open: { d: "M 3 16.5 L 17 2.5" },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* Garis tengah */}
                    <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    {/* Garis bawah */}
                    <Path
                        variants={{
                            closed: { d: "M 2 16.346 L 20 16.346" },
                            open: { d: "M 3 2.5 L 17 16.346" },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.svg>
            </div>

            {/* Sidebar animasi */}
            <motion.div
                className="relative z-10 top-0 left-0 w-1/6 h-screen p-3 text-white bg-[#f3f3f3]"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
            >
                <div className="w-full flex items-end justify-end">
                    <div className="flex items-center gap-3">
                        <FaWallet size={20} color='#333'/>
                        <h1 className="text-xl text-[#333] font-bold">Dompetku</h1>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hamburger;
