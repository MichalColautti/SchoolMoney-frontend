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

export const getAllClasses = async (token) => {
    return request("/treasurer/get-classes", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}

export const getTreasurerFundraisings = async (token) => {
    return request("/treasurer/get-fundraisings", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}

export const returnPayment = async (fundraisingId, childId, token) => {
    return request(`/treasurer/return-payments/${fundraisingId}/${childId}`, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    })
}

export const getTransactions = async (token) => {
    return request("/treasurer/get-transactions", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}

export const getTreasurerStatus = async (token) => {
  return request("/treasurer/status", {
      method: "GET",
      headers: {
          "Authorization": token
      }
  })
}

const convertDate = (dateStr) => {
    if (!dateStr || !dateStr.includes('.')) return dateStr;
    const [d, m, y] = dateStr.split('.');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

export async function addFundraising(data, token) {
    console.log(data)
    try {
        const formData = new FormData();

        const [day, month, year] = data.endDate.split('.').map(Number);

        const endDateObject = new Date(year, month - 1, day);

        const addFundraisingDto = {
            name: data.name,
            description: data.description,
            endDate: endDateObject,
            amount: Number(data.amount),
            classId: data.classId,
        }

        formData.append('dto', new Blob([JSON.stringify(addFundraisingDto)], {
            type: 'application/json'
        }));

        formData.append('file', data.photo);

        return request("/treasurer/add-fundraising", {
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