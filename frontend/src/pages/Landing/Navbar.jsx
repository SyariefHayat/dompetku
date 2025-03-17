import React from 'react'
import { motion } from 'framer-motion';
import { FaWallet } from 'react-icons/fa';

import { styles } from '@/style';
import EachUtils from '@/utilities/EachUtils';
import { LIST_NAVBAR_LD } from '@/constants/listNavbar';
import DefaultButton from '@modules/LandingPage/DefaultButton';

const Navbar = () => {

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            className={`absolute top-8 right-0 left-0 ${styles.flexBetween} py-5 px-16`}
        >
            <a href="/" className={`${styles.flexCenter} gap-3 cursor-pointer`}>
                <FaWallet size={30} color='#333'/>
                <h1 className="text-3xl text-[#333] font-bold">Dompetku</h1>
            </a>
            <div className="w-[35%] flex items-center justify-between">
                <EachUtils
                    of={LIST_NAVBAR_LD}
                    render={(item, index) => (
                        <a
                            href={item.url}
                            key={index}
                            className={`text-lg text-gray-500 hover:text-sky-500 transition-colors`}
                        >
                            {item.title}
                        </a>
                    )}
                />
            </div>
            <div className={`${styles.flexCenter} gap-2 text-xl`}>
                <DefaultButton 
                    text={"Login"}
                    path={"/auth"}
                    styles={"bg-sky-500 text-white"}
                />
                <DefaultButton
                    text={"Signup"}
                    path={"/auth"}
                    styles={"text-[#333]"}
                />
            </div>
        </motion.nav>
    )
}

export default Navbar