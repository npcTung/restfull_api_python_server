import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, ShowItem } from "components";
import { useForm } from "react-hook-form";
import * as apis from "apis";
import { toast } from "react-toastify";

const Author = () => {
  const [authorsData, setAuthorsData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [author, setAuthor] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleAddAuthor = async (data) => {
    const response = await apis.api_add_author(data);
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

  const feachGetAllAuthors = async () => {
    const response = await apis.api_get_all_author();
    if (response.success) setAuthorsData(response.authors_data);
  };

  const feachGetAuthor = async (aid) => {
    const response = await apis.api_get_author(aid);
    if (response.success) setAuthorData(response.author_data);
  };

  const deleteAuthor = async (aid) => {
    const response = await apis.api_delete_author(aid);
    if (response.success) {
      toast.success(response.mes);
      rerender();
    } else toast.error(response.mes);
  };

  useEffect(() => {
    feachGetAllAuthors();
    if (author) feachGetAuthor(author);
  }, [update, author]);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <h1 className="w-full uppercase text-3xl text-center font-semibold p-5">
        authors management
      </h1>
      {author && (
        <div
          className="fixed inset-0 bg-overlay60 z-50"
          onClick={() => setAuthor(null)}
        >
          <ShowItem />
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleAddAuthor)}
        className="w-full flex flex-col gap-5"
      >
        <InputForm
          register={register}
          id={"name"}
          wf
          label={"Tên tác giả"}
          errors={errors}
          validate={{ required: "Điền thông tin bắt buộc." }}
          placeholder={"Nhập tên tác giả..."}
        />
        <div className="w-full flex justify-between">
          <span></span>
          <Button
            name={"Add Author"}
            styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
            type="submit"
          />
        </div>
      </form>
      <table className="table table-zebra">
        <thead className="table-header-group bg-sky-500 text-white capitalize">
          <tr>
            <th className="w-[5%]">#</th>
            <th className="w-[75%]">name</th>
            <th className="w-[10%]">action</th>
          </tr>
        </thead>
        <tbody>
          {authorsData &&
            authorsData?.length &&
            authorsData.map((el, idx) => (
              <tr key={el.id}>
                <td className="w-[5%]">{idx + 1}</td>
                <td className="w-[75%]">{el.name}</td>
                <td className="w-[10%]">
                  <span className="flex gap-3">
                    <span
                      className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
                      onClick={() => setAuthor(el.id)}
                    >
                      xem
                    </span>
                    <span className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
                      sửa
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
                      onClick={() => deleteAuthor(el.id)}
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

export default Author;
