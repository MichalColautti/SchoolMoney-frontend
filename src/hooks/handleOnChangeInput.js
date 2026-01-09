import {useState} from "react";

export const useOnChange = (initialState) => {
    const [data, setData] = useState(initialState)

    const resetState = () => setData(initialState)

    const onChangeInput = (value, field) => {
        setData({
            ...data,
            [field]: value
        })
    }

    return {
        data,
        setData,
        resetState,
        onChangeInput
    };
}