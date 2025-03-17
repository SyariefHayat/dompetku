import React from 'react'
import { FaPlus } from 'react-icons/fa'

const UserSection = () => {
    return (
        <div>
            <div className="w-4/5 flex items-center justify-between mx-auto rounded-md">
                <div className="flex items-center justify-center">
                    <h3 className="text-5xl font-semibold text-[#333]">$50M</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        TRANSAKSI
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <h3 className="text-5xl font-semibold text-[#333]">$50M</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        TRANSAKSI
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <h3 className="text-5xl font-semibold text-[#333]">$50M</h3>
                    <FaPlus size={30} color='#333' />
                    <p className="ml-3 mt-1 text-2xl bg-gradient-to-tr from-sky-500 to-sky-800 bg-clip-text text-transparent">
                        TRANSAKSI
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserSection