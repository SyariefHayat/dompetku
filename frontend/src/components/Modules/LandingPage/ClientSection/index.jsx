import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import EachUtils from '@/utilities/EachUtils';
import { LIST_TESTIMONIAL } from "@/constants/listTestimonial";

const ClientSection = () => {
    const refTitle = useRef(null)

    const isTitleInView = useInView(refTitle, {once: true})

    return (
        <section id="clients" className="w-full h-screen py-5 px-16 flex flex-col justify-between">
            <div ref={refTitle}>
                <motion.h3
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: isTitleInView ? 0 : -200, opacity: isTitleInView ? 1 : 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.17, 0.55, 0.55, 1],
                        delay: 0.5
                    }}
                    className="text-5xl font-medium text-center mb-8"
                >
                    Apa yang klien katakan tentang kita
                </motion.h3>
            </div>

            <div className="slider w-full h-[80%] overflow-hidden relative">
                <EachUtils 
                    of={LIST_TESTIMONIAL}
                    render={(item, index) => (
                        <motion.div 
                            key={index}
                            className={`item w-72 h-96 p-5 flex flex-col justify-between bg-gray-300 rounded-md featured-card border absolute top-7 left-full animate-autoRun`}
                            style={{
                                animationDelay: `${index * 3}s`,
                            }}
                        >
                            <p>{item.desc}</p>
                            <div className="flex items-center gap-5 mt-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <img src={`/${item.image}.png`} alt={item.image} className="w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-sm text-[#333]">{item.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                />
            </div>
        </section>
    );
};

export default ClientSection;
