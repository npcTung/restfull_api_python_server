import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Select } from "components";
import { useForm } from "react-hook-form";
import * as apis from "apis";
import { toast } from "react-toastify";

const gender = ["nam", "nữ"];

const Students = () => {
  const [studentsData, setStudentsData] = useState(null);
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleAddStudent = async (data) => {
    if (data.birth_date) {
      const birth_date_arr = data.birth_date.split("-");
      data.day = birth_date_arr[2];
      data.month = birth_date_arr[1];
      data.year = birth_date_arr[0];
      delete data.birth_date;
    }
    const response = await apis.api_add_student(data);
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

  const feachGetAllStudents = async () => {
    const response = await apis.api_get_all_students();
    if (response.success) setStudentsData(response.students_data);
  };

  const deleteStudent = async (aid) => {
    const response = await apis.api_delete_student(aid);
    if (response.success) {
      toast.success(response.mes);
      rerender();
    } else toast.error(response.mes);
  };

  useEffect(() => {
    feachGetAllStudents();
  }, [update]);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <h1 className="w-full uppercase text-3xl text-center font-semibold p-5">
        authors management
      </h1>
      <form
        onSubmit={handleSubmit(handleAddStudent)}
        className="w-full flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-5">
          <InputForm
            register={register}
            id={"name"}
            wf
            label={"Tên học sinh"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            placeholder={"Nhập tên học sinh..."}
          />
          <InputForm
            register={register}
            id={"birth_date"}
            wf
            label={"ngày sinh"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            placeholder={"Nhập ngày sinh..."}
            type="date"
          />
        </div>
        <div className="w-full flex justify-between gap-5">
          <Select
            register={register}
            id={"gender"}
            wf
            label={"giới tính"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            options={gender.map((el) => ({ code: el, value: el }))}
          />
          <InputForm
            register={register}
            id={"class_name"}
            wf
            label={"Tên lớp"}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
            placeholder={"Nhập tên lớp..."}
          />
        </div>
        <div className="w-full flex justify-between">
          <span></span>
          <Button
            name={"Add Student"}
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
            <th>birth date</th>
            <th>gender</th>
            <th>class name</th>
            <th className="w-[10%]">action</th>
          </tr>
        </thead>
        <tbody>
          {studentsData &&
            studentsData?.length &&
            studentsData.map((el, idx) => (
              <tr key={el.id}>
                <td className="w-[5%]">{idx + 1}</td>
                <td>{el.name}</td>
                <td>{el.birth_date}</td>
                <td>{el.gender}</td>
                <td>{el.class_name}</td>
                <td className="w-[10%]">
                  <span className="flex gap-3">
                    <span className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
                      xem
                    </span>
                    <span className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
                      sửa
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-blue-500 transition-all"
                      onClick={() => deleteStudent(el.id)}
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

export default Students;
