import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Select } from "components";
import { useForm } from "react-hook-form";
import * as apis from "apis";
import { toast } from "react-toastify";

const Books = () => {
  const [booksData, setBooksData] = useState(null);
  const [categoresData, setCategoresData] = useState(null);
  const [authorsData, setAuthorsData] = useState(null);
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleAddBook = async (data) => {
    const response = await apis.api_add_book(data);
    if (response.success) {
      reset();
      toast.success(response.mes);
      rerender();
    } else {
      reset();
      toast.error(response.mes);
    }
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const feachGetAllBooks = async () => {
    const response = await apis.api_get_all_book();
    if (response.success) setBooksData(response.books_data);
  };

  const feachGetAllCategories = async () => {
    const response = await apis.api_get_all_categories();
    if (response.success) setCategoresData(response.categories_data);
  };

  const feachGetAllAuthors = async () => {
    const response = await apis.api_get_all_author();
    if (response.success) setAuthorsData(response.authors_data);
  };

  const deleteBook = async (bid) => {
    const response = await apis.api_delete_book(bid);
    if (response.success) {
      toast.success(response.mes);
      rerender();
    } else toast.error(response.mes);
  };

  useEffect(() => {
    feachGetAllBooks();
    feachGetAllCategories();
    feachGetAllAuthors();
  }, [update]);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <h1 className="w-full uppercase text-3xl text-center font-semibold p-5">
        books management
      </h1>
      <form
        onSubmit={handleSubmit(handleAddBook)}
        className="w-full flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-5">
          <InputForm
            register={register}
            id={"name"}
            wf
            label={"Tên sách"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            placeholder={"Nhập tên sách..."}
          />
          <InputForm
            register={register}
            id={"page_count"}
            wf
            label={"số trang"}
            errors={errors}
            validate={{
              required: "Điền thông tin bắt buộc.",
            }}
            placeholder={"Nhập số trang..."}
            type="number"
          />
        </div>
        <div className="w-full flex justify-between gap-5">
          <Select
            register={register}
            id={"category_id"}
            wf
            label={"Tên thể loại"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            options={
              categoresData &&
              categoresData?.map((el) => ({ code: el.id, value: el.name }))
            }
          />
          <Select
            register={register}
            id={"author_id"}
            wf
            label={"Tên tác giả"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            options={
              authorsData &&
              authorsData?.map((el) => ({ code: el.id, value: el.name }))
            }
          />
        </div>
        <div className="w-full flex justify-between">
          <span></span>
          <Button
            name={"Add Book"}
            styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
            type="submit"
          />
        </div>
      </form>
      <table className="table table-zebra">
        <thead className="table-header-group bg-sky-500 text-white capitalize">
          <tr>
            <th className="w-[5%]">#</th>
            <th>name</th>
            <th>số trang</th>
            <th>tác giả</th>
            <th>thể loại</th>
            <th className="w-[10%]">action</th>
          </tr>
        </thead>
        <tbody>
          {booksData &&
            booksData?.length &&
            booksData.map((el, idx) => (
              <tr key={el.id}>
                <td className="w-[5%]">{idx + 1}</td>
                <td>{el.name}</td>
                <td>{el.page_count}</td>
                <td>{authorsData?.find((i) => i.id === el.author_id).name}</td>
                <td>
                  {categoresData?.find((i) => i.id === el.category_id).name}
                </td>
                <td className="w-[10%]">
                  <span className="flex gap-3">
                    <span className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
                      sửa
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
                      onClick={() => deleteBook(el.id)}
                    >
                      xóa
                    </span>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
