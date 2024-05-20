import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

//GET requests

export async function fetchPosts({ page, filter, token }) {
  let url = `/api/articles?page=${page.pageParam}`;

  if (filter && Object.keys(filter).length > 0) {
    url += `&filter=${JSON.stringify(filter)}`;
  }
  const headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const res = await fetch(url, {
    headers: headers,
  });

  await handleResponseError(res);
  const articles = await res.json();
  return articles;
}

export async function fetchUser({ page, params, token }) {
  const headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  const res = await fetch(`/api/user/${params}?page=${page.pageParam}`, {
    headers: headers,
  });
  await handleResponseError(res);
  const articles = await res.json();
  return articles;
}

export async function fetchValues({ token }) {
  const res = await fetch("/api/form", {
    headers: { Authorization: "Bearer " + token },
  });
  await handleResponseError(res);
  const values = await res.json();
  return values;
}

export async function fetchArticle({ id, token }) {
  const res = await fetch(`/api/edit/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  await handleResponseError(res);
  const article = await res.json();
  return article;
}

export async function fetchPopulation() {
  const res = await fetch("/api/population");
  await handleResponseError(res);
  const population = await res.json();
  return population;
}

export async function fetchPopular(century) {
  const res = await fetch(`/api/popular?year=${century}`);
  await handleResponseError(res);
  const population = await res.json();
  return population;
}

export async function fetchCivil() {
  const res = await fetch("/api/civil");
  await handleResponseError(res);
  const civil = await res.json();
  return civil;
}

//Post requests

export async function createPost({ article, token }) {
  const res = await fetch("/api/post-article", {
    method: "POST",
    body: JSON.stringify(article),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return true;
}

export async function editPost({ id, article, token }) {
  const res = await fetch(`/api/edit/${id}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData.message);
    throw new Error(errorData.message);
  }
  return true;
}

export async function deleteArticle({ id, token }) {
  const res = await fetch("/api/delete", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return true;
}

export async function like({ id, token }) {
  const res = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return true;
}

//AUTH requests

export async function login({ email, password }) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    const { token, id } = responseData;
    const remainingMilliseconds = 60 * 60 * 11900;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
  } catch (error) {
    throw error;
  }
}

export async function register({ email, password, username, confirmation }) {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ email, password, username, confirmation }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
  return true;
}

//helper functions

async function handleResponseError(response) {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message);
    error.status = response.status;
    error.data = response.statusText;
    throw error;
  }
}
