import { debugWarn } from "helpers/debug";
import { getBaseUrl } from "helpers/url";

export async function get(relativeUrl) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url).catch((error) => {
      throw new Error(error, url);
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message);
    error.response = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

export async function post(relativeUrl, body, headers) {
  const url = `${getBaseUrl()}${relativeUrl}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
      debugWarn("Response from POST not parseble JSON", error);
    }
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message);
    error.response = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

export async function put(relativeUrl, body, headers) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.message);
    error.response = response;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
export async function remove(relativeUrl, body, header) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...header
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
