import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { isAnimatedAtom, isLoginAtom, isRightAtom } from '@/jotai/atoms';

const Navbar = () => {
    const [isLogin, setIsLogin] = useAtom(isLoginAtom);
    const [isAnimated, setIsAnimated] = useAtom(isAnimatedAtom);
    const [isRight, setIsRight] = useAtom(isRightAtom);

    useEffect(() => {
    if (isAnimated) {
        const timer = setTimeout(() => {
            setIsAnimated(false);
        }, 2000);

        return () => clearTimeout(timer);
        }
    }, [isAnimated]);

    const handleLoginBtn = () => {
        setIsLogin(!isLogin);
        setIsAnimated(!isAnimated);

        setTimeout(() => {
            setIsRight(!isRight);
        }, 700)
    }


    return (
        <div className={`w-[40%] h-full flex flex-col items-center justify-center gap-3 bg-sky-500 rounded-md absolute transition-all duration-[2000ms] ${isLogin ? `translate-x-[480px] ${isAnimated ? 'animate-zoomIn' : ''}` : `translate-x-0 ${isAnimated ? 'animate-zoomIn' : ''}`} z-20`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isLogin ? "text-kanan" : "text-kiri"}
                    initial={{ x: isLogin ? 100 : 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-72 h-32 flex flex-col items-center justify-center text-center relative"
                >
                    <h3 className="text-2xl text-white">
                        {isLogin ? "Halo, Teman!" : "Selamat Datang Kembali!"}
                    </h3>
                    <p className="text-white/80 text-sm">
                        {isLogin ? "masukkan detail pribadi Anda dan mulailah perjalanan bersama kami" : "untuk tetap terhubung dengan kami, silakan login dengan info pribadi Anda"}
                    </p>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <button
                    onClick={handleLoginBtn} 
                    className={`w-[80%] py-3 text-white border border-white rounded-full relative ${isAnimated ? "cursor-not-allowed" : ""}`} 
                    disabled={isAnimated}
                >
                    {isRight ? (
                        <motion.p
                            key="btn-daftar"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Daftar
                        </motion.p>
                    ) : (
                        <motion.p
                            key="btn-masuk"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Masuk
                        </motion.p>
                    )}
                </button>
            </AnimatePresence>
        </div>
    )
}

export default Navbar