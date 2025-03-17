import { useState } from "react";
import { emailValidation } from "../utilities/emailValidation";
import { useAtom } from "jotai";
import { emailAtom } from "../jotai/atoms";

const useEmailValidation = () => {
    const [isMessage, setIsMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [email, setEmail] = useAtom(emailAtom);

    const validateEmail = (data) => {
        setEmail(data);
        setIsEmailValid(false);

        if (emailValidation(data)) {
            setEmailMessage(null);
            return setIsEmailValid(true);
        } 
            
        if (isMessage && !data) {
            return setEmailMessage("Email harus di isi");
        }

        if (isMessage && !emailValidation(data)) {
            return setEmailMessage("Masukkan alamat email yang valid");
        }

    };

    const handleEmail = () => {

        if (isEmailValid) {
            return setIsMessage(false);
        }

        if (!email) {
            setIsMessage(true);
            setEmailMessage("Email harus diisi");
        } else {
            setIsMessage(true);
            setEmailMessage("Masukkan alamat email yang valid");
        }
    }

    return {
        emailMessage,
        validateEmail,
        handleEmail,
    }
}

export default useEmailValidation;