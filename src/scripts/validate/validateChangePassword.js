import {isNullOrEmpty} from "./utils/isNullOrEmpty";

export const emptyChangePasswordErrors = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
}

const changePasswordErrorsMessages = {
    oldPassword: "Stare hasło jest wymagane!",
    newPassword: "Nowe hasło jest wymagane!",
    repeatPassword: "Powtórzenie hasła jest wymagane!",
    differentPasswords: "Hasła nie są identyczne!"
}

export function validateChangePassword(data, setErrors) {
    const newErrors = {...emptyChangePasswordErrors}

    if(isNullOrEmpty(data.oldPassword)) newErrors.oldPassword = changePasswordErrorsMessages.oldPassword
    if(isNullOrEmpty(data.newPassword)) newErrors.newPassword = changePasswordErrorsMessages.newPassword
    if(isNullOrEmpty(data.repeatPassword)) newErrors.repeatPassword = changePasswordErrorsMessages.repeatPassword

    if(!Object.values(newErrors).every(err => err === "")){
        setErrors(newErrors)

        return true
    }

    if(data.newPassword !== data.repeatPassword) {
        newErrors.newPassword = changePasswordErrorsMessages.differentPasswords
        newErrors.repeatPassword = changePasswordErrorsMessages.differentPasswords
    }

    setErrors(newErrors)

    return Object.values(newErrors).every(err => err === "");
}