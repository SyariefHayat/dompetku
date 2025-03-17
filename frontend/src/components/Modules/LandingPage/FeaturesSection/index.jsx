import React, { useRef } from 'react';
import { useInView, motion } from "framer-motion";

import EachUtils from '@/utilities/EachUtils';
import { LIST_FEATURES } from '@/constants/listFeatures';

const FeaturesSection = () => {
    const refTitle = useRef(null);
    const refCard = useRef(null);

    const isTitleInView = useInView(refTitle, { once: true });
    const isCardInView = useInView(refCard, { once: true, margin: "0px 0px -300px 0px" });

    return (
        <section id='features' className="w-full h-screen py-5 px-16 my-20 flex flex-col justify-between">
            <div ref={refTitle} className="w-full h-1/5 p-5 flex items-center justify-center">
                <motion.h3
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: isTitleInView ? 0 : -200, opacity: isTitleInView ? 1 : 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.17, 0.55, 0.55, 1],
                        delay: 0.5
                    }}
                    className="text-5xl font-medium"
                >
                    Kenapa Menggunakan Dompetku
                </motion.h3>
            </div>
            <div ref={refCard} className="w-full h-[75%] flex items-center gap-5">
                <EachUtils 
                    of={LIST_FEATURES}
                    render={(item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: 1000, opacity: 0 }}
                            animate={{ x: isCardInView ? 0 : 500, opacity: isCardInView ? 1 : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 12,
                                duration: 0.9,
                                ease: [0.17, 0.55, 0.55, 1],
                                delay: index * 0.2 
                            }}
                            className="w-1/4 h-full flex flex-col items-center justify-between bg-gray-300 rounded-md featured-card"
                        >
                            <div className="w-1/2 m-auto">
                                <img src={`/${item.icon}.png`} alt={item.icon} />
                            </div>
                            <div className="w-full h-1/2 flex flex-col gap-5 px-5 pb-5">
                                <p className="text-2xl font-semibold text-center">{item.title}</p>
                                <p>{item.desc}</p>
                            </div>
                        </motion.div>
                    )}
                />
            </div>
        </section>
    )
}

export default FeaturesSection