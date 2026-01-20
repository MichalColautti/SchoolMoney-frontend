import {isNullOrEmpty} from "./utils/isNullOrEmpty";

export const emptyJoinClassErrors = {
    childId: "",
    accessCode: ""
}

const accessCodeErrorMessages = {
    emptyOrNotLongEnough: "Kod jest wymagany (32 znaki)!",
    badCode: "Kod składa się z dużych i małych liter oraz cyfr!"
}

const ACCESS_CODE_REGEX = /^[A-Za-z0-9]{32}$/;

export function validateJoinClass(data, setErrors) {
    const newErrors = { ...emptyJoinClassErrors };

    if(isNullOrEmpty(data.childId)) newErrors.childId = "Nie wybrano dziecka!";
    if(isNullOrEmpty(data.accessCode) || data.accessCode.trim().length !== 32) newErrors.accessCode = accessCodeErrorMessages.emptyOrNotLongEnough;
    if(!ACCESS_CODE_REGEX.test(data.accessCode)) newErrors.accessCode = accessCodeErrorMessages.badCode;

    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === "");
}