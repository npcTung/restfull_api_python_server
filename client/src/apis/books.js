import axiosConfig from "axiosConfig";

export const api_add_book = (data) =>
  axiosConfig({
    url: "/book",
    method: "post",
    data,
  });

export const api_get_all_book = () =>
  axiosConfig({
    url: "/books",
    method: "get",
  });

export const api_delete_book = (bid) =>
  axiosConfig({
    url: "/book/" + bid,
    method: "delete",
  });
