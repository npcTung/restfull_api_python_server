import axiosConfig from "axiosConfig";

export const api_add_student = (data) =>
  axiosConfig({
    url: "/student",
    method: "post",
    data,
  });

export const api_get_all_students = () =>
  axiosConfig({
    url: "/students",
    method: "get",
  });

export const api_delete_student = (aid) =>
  axiosConfig({
    url: "/student/" + aid,
    method: "delete",
  });
