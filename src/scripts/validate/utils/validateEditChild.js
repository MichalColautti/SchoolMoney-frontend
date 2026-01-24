import {emptyChildDataErrors} from "../validateAddChild";
import {isNullOrEmpty} from "./isNullOrEmpty";

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

export function validateEditChild(data, setErrors){
    const errors = {...emptyChildDataErrors}

    const currentDate = new Date();
    const dateFiveYearsAgo = new Date().setFullYear(currentDate.getFullYear() - 5);

    if(isNullOrEmpty(data.name)) errors.name = errorMessages.name
    if(isNullOrEmpty(data.surname)) errors.surname = errorMessages.surname

    if (data.birthday === null) errors.birthday = birthdayErrors.null;
    else if(data.birthday > currentDate) errors.birthday = birthdayErrors.futureDate;
    else if(data.birthday > dateFiveYearsAgo) errors.birthday = birthdayErrors.tooYoung;

    setErrors(errors);

    return Object.values(errors).every(err => err === "");
}