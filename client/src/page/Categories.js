import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm } from "components";
import { useForm } from "react-hook-form";
import * as apis from "apis";
import { toast } from "react-toastify";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleAddCategory = async (data) => {
    const response = await apis.api_add_category(data);
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

  const feachGetAllCategories = async () => {
    const response = await apis.api_get_all_categories();
    if (response.success) setCategoriesData(response.categories_data);
  };

  const deleteCategory = async (aid) => {
    const response = await apis.api_delete_category(aid);
    if (response.success) {
      toast.success(response.mes);
      rerender();
    } else toast.error(response.mes);
  };

  useEffect(() => {
    feachGetAllCategories();
  }, [update]);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <h1 className="w-full uppercase text-3xl text-center font-semibold p-5">
        categories management
      </h1>
      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className="w-full flex flex-col gap-5"
      >
        <InputForm
          register={register}
          id={"name"}
          wf
          label={"Tên thể loại"}
          errors={errors}
          validate={{ required: "Điền thông tin bắt buộc." }}
          placeholder={"Nhập tên thế loại..."}
        />
        <div className="w-full flex justify-between">
          <span></span>
          <Button
            name={"Add Category"}
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
          {categoriesData &&
            categoriesData?.length &&
            categoriesData.map((el, idx) => (
              <tr key={el.id}>
                <td className="w-[5%]">{idx + 1}</td>
                <td className="w-[75%]">{el.name}</td>
                <td className="w-[10%]">
                  <span className="flex gap-3">
                    <span className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
                      sửa
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
                      onClick={() => deleteCategory(el.id)}
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

export default Categories;
