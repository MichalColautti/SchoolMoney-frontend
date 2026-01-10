import {isNullOrEmpty} from "./utils/isNullOrEmpty";

export const emptyChildDataErrors = {
    name: "",
    surname: "",
    birthday: "",
    photo: "",
}

const errorMessages = {
    name: "Imię jest wymagane!",
    surname: "Nazwisko jest wymagane!",
    photo: "Zdjęcie jest wymagane!",
}

const birthdayErrors = {
    null: "Data jest wymagana!",
    futureDate: "Data nie może być z przyszłości",
    tooYoung: "Dziecko nie może być młodsze niż 5 lat!",
}

export function validateAddChild(data, setErrors) {
    const newErrors = { ...emptyChildDataErrors };

    const currentDate = new Date();
    const dateFiveYearsAgo = new Date().setFullYear(currentDate.getFullYear() - 5);

    if (isNullOrEmpty(data.name)) newErrors.name = errorMessages.name;
    if (isNullOrEmpty(data.surname)) newErrors.surname = errorMessages.surname;
    if (data.birthday === null) newErrors.birthday = birthdayErrors.null;
    else if(data.birthday > currentDate) newErrors.birthday = birthdayErrors.futureDate;
    else if(data.birthday > dateFiveYearsAgo) newErrors.birthday = birthdayErrors.tooYoung;
    if (data.photo === null) newErrors.photo = errorMessages.photo;

    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === "");
}