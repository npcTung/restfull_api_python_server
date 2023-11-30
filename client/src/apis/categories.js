import axiosConfig from "axiosConfig";

export const api_add_category = (data) =>
  axiosConfig({
    url: "/category",
    method: "post",
    data,
  });

export const api_get_all_categories = () =>
  axiosConfig({
    url: "/categories",
    method: "get",
  });

export const api_delete_category = (bid) =>
  axiosConfig({
    url: "/category/" + bid,
    method: "delete",
  });
