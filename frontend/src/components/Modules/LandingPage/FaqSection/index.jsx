import { motion } from 'framer-motion'
import React, { useState } from 'react'

import EachUtils from '@/utilities/EachUtils'
import { LIST_FAQ_ID } from '@/constants/listFAQ'


const FaqSection = () => {
    const [openContentIndex, setOpenContentIndex] = useState(null);

    return (
        <section id='faq' className={`w-full h-screen py-5 px-16 my-20`}>
            <h3 className="text-5xl text-center mb-8">Tanya Jawab Umum</h3>
            <ul>
                <EachUtils 
                    of={LIST_FAQ_ID}
                    render={(item, index) => (
                        <li key={index} className="mb-2">
                            <div className="bg-gray-600 hover:bg-gray-500 text-white">
                                <button
                                    className="flex p-6 justify-between items-center w-full"
                                    onClick={() =>
                                        setOpenContentIndex(
                                            openContentIndex == index ? null : index
                                        )
                                    }
                                >
                                    <span className="font-semibold text-2xl">{item.title}</span>
                                    <motion.div
                                        animate={{ rotate: openContentIndex == index ? 135 : 0 }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 36 36"
                                            role="img"
                                            aria-hidden="true"
                                            className="elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </motion.div>
                                </button>
                            </div>
                            <motion.div
                                initial={{ translateY: -10 }}
                                animate={{ translateY: openContentIndex == index ? 0 : -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: openContentIndex == index ? "block" : "none",
                                }}
                                className="px-6 pt-4 pb-[1px] text-left text-white bg-gray-600 mt-[1px]"
                            >
                                {item.desc.split("\n").map((item, index) => (
                                    <p key={index} className="text-2xl mb-8">
                                        {item}
                                    </p>
                                ))}
                            </motion.div>
                        </li>
                    )}
                />
            </ul>
        </section>
    )
}

export default FaqSection