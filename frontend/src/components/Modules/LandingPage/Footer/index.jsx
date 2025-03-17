import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaLinkedin, FaWallet } from 'react-icons/fa'

import EachUtils from '@/utilities/EachUtils'
import { LIST_FOOTER } from '@/constants/listFooter'

const Footer = () => {
    return (
        <div className="w-full h-full px-5 pt-16 pb-5 bg-gray-600">
            <div className="flex justify-between">
                <a href='#home' className="flex p-5 items-center gap-3">
                    <FaWallet size={30} color="#0ea5e9" />
                    <h1 className="text-3xl text-white font-bold">Dompetku</h1>
                </a>
                <div className="grid grid-cols-3 gap-5">
                    <EachUtils
                        of={LIST_FOOTER}
                        render={(item, index) => {
                            return (
                                <div key={index}>
                                    <a href={item.url} className="text-xl font-medium text-white hover:text-sky-500 transition-colors ml-14 cursor-pointer">
                                        {item.title}
                                    </a>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
            <div className="w-full h-1 bg-white mt-10 mb-5"></div>
            <div className="flex justify-between">
                <p className="text-xl">2024 Dompetku, Hak cipta dilindungi undang-undang</p>
                <div className="flex gap-3">
                    <FaInstagram size={30} className='cursor-pointer'/>
                    <FaFacebook size={30} className='cursor-pointer'/>
                    <FaXTwitter size={30} className='cursor-pointer'/>
                    <FaLinkedin size={30} className='cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

export default Footer