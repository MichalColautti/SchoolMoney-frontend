export function isNullOrEmpty(data) {
    return data === undefined || data === null || data.trim().length === 0;
}