import { useCallback } from "react";

export const useFormatDate = () => {
    const formatToShortDateString = useCallback((date) => {
        return date.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }, [])

    const formatToDateString = useCallback((date) => {
        return date.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
        })
    }, [])

    return {
        formatToShortDateString,
        formatToDateString,
    }
}