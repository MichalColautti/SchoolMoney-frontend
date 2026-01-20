export const useFormatDate = () => {
    const formatToShortDateString = (date) => {
        return date.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
    }

    const formatToDateString = (date) => {
        return date.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit"
        })
    }

    const parseDate = (date) => {
        if (!date) return null;

        if(date instanceof Date) return new date;

        if(typeof date !== "string") return null;

        try {
            const parts = date.split(', ');
            const datePart = parts[0];
            const timePart = parts[1];

            const [day, month, year] = datePart.split('.');

            const d = new Date(Number(year), Number(month) - 1, Number(day));

            if (timePart) {
                const [hours, minutes] = timePart.split(':');
                d.setHours(Number(hours), Number(minutes), 0, 0);
            } else {
                d.setHours(0, 0, 0, 0);
            }

            return isNaN(d.getTime()) ? null : d;
        } catch (e) {
            console.error("Błąd parsowania daty:", date);
            return null;
        }
    }

    return {
        formatToShortDateString,
        formatToDateString,
        parseDate
    }
}