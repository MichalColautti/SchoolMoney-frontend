import { REACT_APP_API_BASE_URL } from './utils/request'
import UserIcon from "../assets/user_icon.svg"

export const getImageUrl = (imageId) => {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!imageId || !uuidV4Regex.test(imageId)) {
        return UserIcon;
    }
    else {
        return `${REACT_APP_API_BASE_URL}/image/get/${imageId}`
    }
}