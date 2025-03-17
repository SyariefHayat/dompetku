import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { emailStorageAtom, isOpenModalAtom, isTransactionAtom, tokenStorageAtom } from '../../../../jotai/atoms'
import { apiInstanceExpress } from "../../../../services/express/apiInstance";

const Modal = () => {
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom);
    const [isTransaction, setIsTransaction] = useAtom(isTransactionAtom);

    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        description: '',
        category: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            // Pastikan hanya angka yang diterima
            const parsedValue = parseInt(value, 10);
            if (isNaN(parsedValue)) return; // Abaikan input jika bukan angka
            setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (emailStorage && tokenStorage) {
                const addTransaction = await apiInstanceExpress.post("transactions", {
                    email: emailStorage,
                    token: tokenStorage,
                    ...formData
                });

                if (addTransaction.status !== 201) {
                    return console.log("gagal menambahkan transaksi baru");
                }
            }
            setIsTransaction(true); 
            setIsOpenModal(false); // Tutup modal setelah submit
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
                <button
                    onClick={() => setIsOpenModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <label htmlFor="type">Jenis:</label>
                    <select 
                        name="type" 
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        <option value=""></option>
                        <option value="income">Pemasukan</option>
                        <option value="expense">Pengeluaran</option>
                    </select>
                    <label htmlFor="amount">Nominal:</label>
                    <input 
                        id="amount" 
                        type="text" 
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full" 
                    />
                    <label htmlFor="description">Deskripsi:</label>
                    <input 
                        id="description" 
                        type="text" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full" 
                    />
                    <label htmlFor="category">Kategori:</label>
                    <select 
                        name="category" 
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        <option value=""></option>
                        <option value="makanan">Makanan</option>
                        <option value="gaji">Gaji</option>
                        <option value="lain-lain">Lain-lain</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-600"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Modal