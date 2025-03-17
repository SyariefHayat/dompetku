import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';

import { emailAtom } from '@/jotai/atoms';
import { auth } from '@/services/firebase/firebase';
import useEmailValidation from '@/hooks/useEmailValidation';
import usePasswordValidation from '@/hooks/usePasswordValidation';
import { emailStorageAtom, tokenStorageAtom } from '@/jotai/atoms';
import { apiInstanceExpress } from '@/services/express/apiInstance';


const LoginForm = () => {
    const [password, setPassword] = useState("");
    const [email] = useAtom(emailAtom);

    const [, setEmailStorage] = useAtom(emailStorageAtom);
    const [, setTokenStorage] = useAtom(tokenStorageAtom);

    const {emailMessage, validateEmail, handleEmail} = useEmailValidation();
    const {passwordMessage, handlePassword} = usePasswordValidation();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const registerPromise = new Promise(async (resolve, reject) => {
            try {
                const login = await signInWithEmailAndPassword(auth, email, password)
            
                if (login) {
                    const firebaseToken = await getIdToken(login.user);
                    const addToken = await apiInstanceExpress.post("my-token", {
                        email,
                        password,
                        token: firebaseToken,
                    })

                    if (addToken.status === 200) {
                        setTokenStorage(firebaseToken);
                        setEmailStorage(login.user.email);

                        resolve('Login berhasil!');
                    
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 2000);
                    }
                }
            } catch (error) {
                reject(error.message);
            }
        });

        toast.promise(registerPromise, {
                pending: 'Memeriksa akun Anda...',
                success: 'Login berhasil!',
                error: 'Login gagal.',
        });
    }

    return (
        <AnimatePresence mode="wait">
            <form action="" className="w-full h-full flex flex-col items-center justify-center gap-3">
                <h2>Masuk Ke Dompetku</h2>

                <div className="w-[60%] relative border">
                    <label htmlFor="username" className="absolute top-1/2 left-3 -translate-y-1/2">
                        <FaUser color='#d1d5db' />
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={(e) => validateEmail(e.target.value)}
                        onBlur={handleEmail}
                        className="w-full border pl-9 py-2" 
                    />
                </div>

                {emailMessage && (
                    <div className="flex items-center gap-1">
                        <IoIosCloseCircleOutline size={23} className="text-red-600" />
                        <p className="text-red-600 text-sm">{emailMessage}</p>
                    </div>
                )}

                <div className="w-[60%] relative border">
                    <label htmlFor="password" className="absolute top-1/2 left-3 -translate-y-1/2">
                        <MdLock color='#d1d5db' />
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => handlePassword(e.target.value)}
                        className="w-full border pl-9 py-2" 
                    />
                </div>

                {passwordMessage && (
                    <div className="flex items-center justify-start gap-1">
                        <IoIosCloseCircleOutline size={23} className="text-red-600" />
                        <p className="text-red-600 text-sm">{passwordMessage}</p>
                    </div>
                )}

                <a href="#">Lupa Kata Sandimu ?</a>
                <button onClick={handleLogin} className="w-[30%] py-3 rounded-full bg-sky-500 text-white">
                    Masuk
                </button>

            </form>
        </AnimatePresence>
    )
}

export default LoginForm