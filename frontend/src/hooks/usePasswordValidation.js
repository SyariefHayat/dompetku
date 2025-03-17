import { useState } from "react"

const usePasswordValidation = () => {
    const [passwordMessage, setPasswordMessage] = useState("");

    const handlePassword = (data) => {
        if (!data) {
            return setPasswordMessage("Password harus diisi");
        }

        if (data.length < 8) {
            return setPasswordMessage("Password minimal 8 karakter");
        }

        return setPasswordMessage(null);
    }

    return {
        passwordMessage,
        handlePassword,
    }
}

export default usePasswordValidation