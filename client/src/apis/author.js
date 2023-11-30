import axiosConfig from "axiosConfig";

export const api_add_author = (data) =>
  axiosConfig({
    url: "/author",
    method: "post",
    data,
  });

export const api_get_all_author = () =>
  axiosConfig({
    url: "/authors",
    method: "get",
  });

export const api_delete_author = (aid) =>
  axiosConfig({
    url: "/author/" + aid,
    method: "delete",
  });

export const api_get_author = (aid) =>
  axiosConfig({
    url: "/author/" + aid,
    method: "get",
  });
