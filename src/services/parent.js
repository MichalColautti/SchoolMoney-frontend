import {request} from "./utils/request";

export const addChild = async (data, token) => {
    try{
        const formData = new FormData();

        const addChildDto = {
            name: data.name,
            surname: data.surname,
            birthday: data.birthday.toISOString().split('T')[0],
        }

        formData.append('childData', new Blob([JSON.stringify(addChildDto)], {
            type: 'application/json'
        }));

        formData.append('childPhoto', data.photo);

        return request("/parent/add-child",{
            method: "POST",
            body: formData,
            headers: {
                "Authorization": token
            }
        })
    }
    catch(err){
        throw err;
    }
}

export const addChildById = async (childId, token) => {
    return request("/parent/add-child-by-id",{
        method: "POST",
        body: JSON.stringify(childId),
        headers: {
            "Authorization": token
        }
    })
}

export const joinClass = async (AddChildToClassDto, token) => {
    return request("/parent/join-class",{
        method: "POST",
        body: JSON.stringify(AddChildToClassDto),
        headers: {
            "Authorization": token
        }
    })
}

export const deleteChildFromClass = async (classId, childId, token) => {
    const url = "/parent/delete/class/" + classId + "/child/" + childId;

    return request(url, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    })
}

export const changePassword = async (dto, token) => {
    return request("/parent/change-password",{
        method: "POST",
        body: JSON.stringify(dto),
        headers: {
            "Authorization": token
        }
    })
}