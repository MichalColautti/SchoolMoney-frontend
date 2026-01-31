import {request} from "./utils/request";

export async function addClass(data, token) {
    try {
        const formData = new FormData();

        const addClassDto = {
            name: data.name,
            year: data.year,
        }

        formData.append('addClassDto', new Blob([JSON.stringify(addClassDto)], {
            type: 'application/json'
        }));

        formData.append('classPhoto', data.photo);

        return request("/treasurer/add-class", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": token
            }
        })
    } catch (err) {
        throw err;
    }
}

export const deleteChildFromClass = async (classId, childId, token) => {
    const url = `/treasurer/delete-child-from-class/class/${classId}/child/${childId}`;

    return request(url, {
        method: 'POST',
        headers: {
            "Authorization": token
        }
    })
}