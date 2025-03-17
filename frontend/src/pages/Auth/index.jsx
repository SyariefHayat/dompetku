import React from 'react';
import { useAtom } from 'jotai';
import { FaWallet } from 'react-icons/fa';
import { ToastContainer } from "react-toastify";

import Navbar from '@/pages/Auth/Navbar';
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/services/firebase/firebase";
import LoginForm from '@modules/AuthPage/LoginForm';
import SignupForm from '@modules/AuthPage/SignupForm';
import { isLoginAtom, isRightAtom } from '@/jotai/atoms';
import { useAuthState } from "react-firebase-hooks/auth";
import { emailStorageAtom, tokenStorageAtom } from "@/jotai/atoms";


const Auth = () => {
    const [isLogin] = useAtom(isLoginAtom);
    const [isRight] = useAtom(isRightAtom);
    const [emailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage] = useAtom(tokenStorageAtom);
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (user && emailStorage && tokenStorage) return location.replace("/dashboard");

    return (
        <div className="w-full h-screen flex items-center justify-center font-poppins bg-gray-300">
            <div className="w-[800px] h-[450px] flex items-center justify-between bg-white rounded-md relative">
                <div className={`w-full flex items-center justify-start gap-2 ${isLogin ? "text-sky-500" : "text-white"} absolute top-5 left-5 z-30`}>
                    <FaWallet size={30} />
                    <h2 className="text-2xl">Dompetku</h2>
                </div>
                <Navbar />
                <div className={`w-[60%] h-full flex flex-col items-center justify-center text-center rounded-md absolute right-0 transition-transform duration-[2000ms] ${isLogin ? '-translate-x-[320px]' : 'translate-x-0'} absolute z-10`}>
                    {isRight ? <LoginForm /> : <SignupForm />}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Auth