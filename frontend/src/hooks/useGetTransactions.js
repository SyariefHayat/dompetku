import { useAtom } from "jotai";
import { useEffect } from "react";
import { emailStorageAtom, tokenStorageAtom, transactionsAtom, userDataAtom } from "../jotai/atoms";
import { apiInstanceExpress } from '@/services/express/apiInstance'

const useGetTransactions = () => {
    const [emailStorage, setEmailStorage] = useAtom(emailStorageAtom);
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom);
    const [transactions, setTransactions] = useAtom(transactionsAtom);
    const [userData, setUserData] = useAtom(userDataAtom);

    const getTransactions = async () => {
        try {
            const url = `dashboard/${emailStorage}/${tokenStorage}`;
            const response = await apiInstanceExpress.get(url);

            if (response.status === 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (emailStorage && tokenStorage) {
            getTransactions().then((result) => {
                setUserData(result.data);
                setTransactions(result.data.transactions);
            })
        }
    })
}

export default useGetTransactions;