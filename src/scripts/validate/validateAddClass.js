import {isNullOrEmpty} from "./utils/isNullOrEmpty";

export const emptyAddClassErrors = {
    name: "",
    year: "",
    photo: "",
};

const errorMessages = {
    name: "Imię jest wymagane!",
    year: "Rocznik jest wymagany!",
    photo: "Zdjęcie jest wymagane!",
}

export function validateAddClass(data, setErrors) {
    const newErrors = { ...emptyAddClassErrors };

    if (isNullOrEmpty(data.name)) newErrors.name = errorMessages.name;
    if (isNullOrEmpty(data.year)) newErrors.year = errorMessages.year;
    if (data.photo === null) newErrors.photo = errorMessages.photo;

    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === "");
}