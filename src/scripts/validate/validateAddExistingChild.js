const REGEX_ID = /^[0-9]+$/;

export function validateAddExistingChild(childId) {
    return childId && REGEX_ID.test(childId);
}