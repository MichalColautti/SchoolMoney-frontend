import { request } from "./utils/request";

export const addChild = async (data, token) => {
  try {
    const formData = new FormData();

    const addChildDto = {
      name: data.name,
      surname: data.surname,
      birthday: data.birthday.toISOString().split("T")[0],
    };

    formData.append(
      "childData",
      new Blob([JSON.stringify(addChildDto)], {
        type: "application/json",
      }),
    );

    formData.append("childPhoto", data.photo);

    return request("/parent/add-child", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const addChildById = async (childId, token) => {
  return request("/parent/add-child-by-id", {
    method: "POST",
    body: JSON.stringify(childId),
    headers: {
      Authorization: token,
    },
  });
};

export const findParent = async (name, token, limit = 5) => {
  return request(
    `/parent/find?name=${encodeURIComponent(name)}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    },
  );
};

export const getAllParents = async (token) => {
  return request("/get-all", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
};

export const changeBlockStatus = async (parentId, isLocked, token) => {
  return request(`/${parentId}/status?isLocked=${isLocked}`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
  });
};

export const joinClass = async (AddChildToClassDto, token) => {
  return request("/parent/join-class", {
    method: "POST",
    body: JSON.stringify(AddChildToClassDto),
    headers: {
      Authorization: token,
    },
  });
};

export const deleteChildFromClass = async (classId, childId, token) => {
  const url = "/parent/delete/class/" + classId + "/child/" + childId;

  return request(url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });
};

export const changePassword = async (dto, token) => {
  return request("/parent/change-password", {
    method: "POST",
    body: JSON.stringify(dto),
    headers: {
      Authorization: token,
    },
  });
};

export const editChild = async (data, token) => {
  try {
    const formData = new FormData();

    const addChildDto = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      birthday: data.birthday.toISOString().split("T")[0],
    };

    formData.append(
      "editChildDto",
      new Blob([JSON.stringify(addChildDto)], {
        type: "application/json",
      }),
    );

    if (data.photo) {
      formData.append("childPhoto", data.photo);
    }

    return request("/parent/edit-child", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const deleteChild = async (childId, token) => {
  const url = "/parent/delete-child/" + childId;

  return request(url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });
};
