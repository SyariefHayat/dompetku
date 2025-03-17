import React from 'react';
import {motion} from 'framer-motion';

import { styles } from '@/style';
import EachUtils from '@/utilities/EachUtils';
import AnimatedGrid from '../AnimatedGrid';
import { LIST_JUMBOTRON } from '@/constants/listJumbotron';

const Jumbotron = () => {
    return (
        <>
            <EachUtils
                of={LIST_JUMBOTRON}
                render={(item, index) => (
                    <section id="home" key={index} className={`w-full h-screen ${styles.flexCenter} text-center overflow-hidden`}>
                        <div className={`w-[60%] mt-12 ${styles.flexCenter} flex-col gap-5 relative z-10`}>
                            <motion.h2
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1, }}
                                transition={{ duration: 1, delay: 2, }}  
                                className="text-7xl font-medium text-[#333]"
                            >
                                {item.title}
                            </motion.h2>

                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 2.5 }}
                                className="w-4/5 mx-auto text-lg text-gray-500"
                            >
                                <p>
                                    {item.desc}
                                </p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 3.5 }}
                                className="w-1/4 py-3 bg-sky-500 rounded-full text-white text-xl shadow-lg shadow-gray-500 hover:shadow-gray-500 hover:shadow-xl hover:bottom-3 duration-300"
                            >
                                <a href="/auth">
                                    {item.btn}
                                </a>
                            </motion.button>
                        </div>
                    </section>
                )}
            />
            <AnimatedGrid/>
        </>
    )
}

export default Jumbotron