import { useAtom } from 'jotai';
import { FaMinus, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from 'react';


import Modal from '../Modal';
import { getInitial } from '@/utilities/getInitial';
import { isOpenModalAtom, userDataAtom, isTransactionAtom } from '@/jotai/atoms';
import { getGreeting } from '../../../../utilities/greeting';

const HeroSection = () => {
    const [userData] = useAtom(userDataAtom);
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
    const [isTransaction, setIsTransaction] = useAtom(isTransactionAtom);

    const [animatedBalance, setAnimatedBalance] = useState(userData.balance);

    useEffect(() => {
        if (isTransaction) {
            const startValue = animatedBalance;
            const endValue = userData.balance;
            const duration = 1; // Durasi animasi dalam detik
            const stepTime = 10; // Interval untuk update setiap 50ms

            let step = (endValue - startValue) / (duration * 1000 / stepTime); // Hitung berapa banyak angka yang harus ditambahkan setiap interval

            const interval = setInterval(() => {
                setAnimatedBalance(prev => {
                    const nextValue = prev + step;

                    if (Math.abs(nextValue - endValue) < Math.abs(step)) {
                        clearInterval(interval);
                        return endValue; // Pastikan angka berhenti di nilai akhir
                    }

                return nextValue;
                });
            }, stepTime);

            return () => {clearInterval(interval)}; // Bersihkan interval ketika komponen dibersihkan
        }

        return setIsTransaction(false);
    }, [userData.balance, isTransaction]);

    return (
        <div className="w-full p-5 bg-gradient-to-tr from-sky-500 to-sky-800 mb-3 rounded-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                        <p className="text-xl font-bold text-white">
                            {getInitial(userData.username)}
                        </p>
                    </div>
                    <div>
                        <p className="text-white">{getGreeting()} ,</p>
                        <p className="text-white text-xl">{userData.username}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setIsOpenModal(true)} className="flex items-center gap-2 py-2 px-3 bg-sky-500 rounded-full text-white cursor-pointer">
                        <FaPlus />
                        <p>Topup</p>
                    </button>
                    <button onClick={() => setIsOpenModal(true)} className="flex items-center gap-2 py-2 px-3 bg-sky-500 rounded-full text-white cursor-pointer">
                        <FaMinus />
                        <p>Bayar</p>
                    </button>
                </div>
            </div>

            {isOpenModal && <Modal />}

            <div className="flex items-center justify-between mt-12">
                <div className="flex flex-col gap-3">
                    <p className="text-xl font-semibold text-white">
                        Saldo Utama
                    </p>
                    <p className="text-5xl font-semibold text-white">
                        Rp {animatedBalance.toLocaleString('id-ID')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection