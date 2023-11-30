import axiosConfig from "axiosConfig";

export const api_add_borrow = (data) =>
  axiosConfig({
    url: "/borrow",
    method: "post",
    data,
  });

export const api_get_all_borrows = () =>
  axiosConfig({
    url: "/borrows",
    method: "get",
  });

export const api_delete_borrow = (br_id) =>
  axiosConfig({
    url: "/borrow/" + br_id,
    method: "delete",
  });
