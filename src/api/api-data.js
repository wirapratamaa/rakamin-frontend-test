const base_url = "https://todos-project-api.herokuapp.com";

const publicPost = (param) => {
  const requestMethod = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(param),
  };
  return requestMethod;
};
const postMethod = (param, method) => {
  const requestMethod = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: new URLSearchParams(param),
  };
  return requestMethod;
};
const patchMethod = (param) => {
  const requestMethod = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: new URLSearchParams(param),
  };
  return requestMethod;
};
const deleteMethod = () => {
  const requestMethod = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  return requestMethod;
};

export const getData = (url) => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetch(base_url + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          return resp;
        }
      })
      .catch((err) => {
        throw err;
      });
  }
};

export const postData = async (url, payload) => {
  try {
    const response = await fetch(base_url + url, postMethod(payload));
    if (response.status < 200 && response.status > 299) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    let actualData = await response.json();
    return actualData;
  } catch (err) {
    console.error(err);
  }
};
export const editData = async (url, payload) => {
  try {
    const response = await fetch(base_url + url, patchMethod(payload));
    if (response.status < 200 && response.status > 299) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    let actualData = await response.json();
    return actualData;
  } catch (err) {
    console.error(err);
  }
};
export const deleteData = async (url) => {
  try {
    const response = await fetch(base_url + url, deleteMethod());
    if (response.status < 200 && response.status > 299) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const signIn = async (url, payload) => {
  try {
    const response = await fetch(base_url + url, publicPost(payload));
    if (response.status < 200 && response.status > 299) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    let actualData = await response.json();
    return actualData;
  } catch (err) {
    console.error(err);
  }
};
