import {useState} from "react";

export const useOnChange = (initialState) => {
    const [data, setData] = useState(initialState)

    const clearData = () => setData(initialState)

    const onChangeInput = (value, field) => {
        setData({
            ...data,
            [field]: value
        })
    }

    return {
        data,
        setData,
        clearData,
        onChangeInput
    };
}