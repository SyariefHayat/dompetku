import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { MdEmail, MdLock } from 'react-icons/md';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { emailAtom } from '@/jotai/atoms';
import { auth } from '@/services/firebase/firebase';
import { apiInstanceExpress } from '@/services/express/apiInstance';
import { isAnimatedAtom, isLoginAtom, isRightAtom } from '@/jotai/atoms';

const SignupForm = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(null);
    
    const [email, setEmail] = useAtom(emailAtom)

    const [isLogin, setIsLogin] = useAtom(isLoginAtom);
    const [isRight, setIsRight] = useAtom(isRightAtom);
    const [isAnimated, setIsAnimated] = useAtom(isAnimatedAtom);

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerPromise = new Promise(async (resolve, reject) => {
            try {
                const register = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                if (register) {
                    await signOut(auth);
                    const addUser = await apiInstanceExpress.post("signup", {
                        username,
                        email,
                        password,
                    });

                    if (addUser.status === 201) {
                        setIsLogin(!isLogin);
                        setIsAnimated(!isAnimated);

                        setTimeout(() => {
                            setIsRight(!isRight);
                        }, 700)
                    }
                }
                resolve('Registration successful!');
            } catch (error) {
                reject(error.message);
            }
        });

        toast.promise(registerPromise, {
            pending: 'Mendaftarkan akun Anda...',
            success: 'Registrasi berhasil!',
            error: 'Registrasi gagal.',
        });
    }

    return (
        <AnimatePresence mode="wait">
            <form action="" className="w-full h-full flex flex-col items-center justify-center gap-3">
                <h2>Buat Akun</h2>

                <div className="w-[60%] relative border">
                    <label htmlFor="username" className="absolute top-1/2 left-3 -translate-y-1/2">
                        <FaUser color='#d1d5db' />
                    </label>
                    <input 
                        id="username" 
                        type="text" 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)} placeholder="Nama Pengguna" 
                        className="w-full border pl-9 py-2" 
                    />
                </div>

                <div className="w-[60%] relative border">
                    <label htmlFor="email" className="absolute top-1/2 left-3 -translate-y-1/2">
                        <MdEmail color='#d1d5db' />
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)} placeholder="Email" 
                        className="w-full border pl-9 py-2" 
                    />
                </div>

                <div className="w-[60%] relative border">
                    <label htmlFor="password" className="absolute top-1/2 left-3 -translate-y-1/2">
                        <MdLock color='#d1d5db' />
                    </label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" 
                        className="w-full border pl-9 py-2" 
                    />
                </div>

                <button onClick={handleRegister} className="w-[30%] py-3 rounded-full bg-sky-500 text-white">
                    Daftar
                </button>
            </form>
        </AnimatePresence>
    )
}

export default SignupForm