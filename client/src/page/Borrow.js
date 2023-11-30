import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as apis from "apis";
import { Button, InputForm, Select } from "components";
import { toast } from "react-toastify";

const Borrow = () => {
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
    reset,
  } = useForm();
  const [booksData, setBooksData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [borrowsData, setBorrowsData] = useState(null);

  const handleAddBorrow = async (data) => {
    if (data.return_date) {
      const return_date_arr = data.return_date.split("-");
      data.day = return_date_arr[2];
      data.month = return_date_arr[1];
      data.year = return_date_arr[0];
      delete data.return_date;
    }
    const response = await apis.api_add_borrow(data);
    if (response.success) {
      reset();
      rerender();
      toast.success(response.mes);
    } else {
      reset();
      toast.error(response.mes);
    }
  };

  const feachAllBooks = async () => {
    const response = await apis.api_get_all_book();
    if (response.success) setBooksData(response.books_data);
  };

  const feachAllStudents = async () => {
    const response = await apis.api_get_all_students();
    if (response.success) setStudentsData(response.students_data);
  };

  const feachAllBorrows = async () => {
    const response = await apis.api_get_all_borrows();
    if (response.success) setBorrowsData(response.borrows_data);
  };

  const deleteBorrow = async (br_id) => {
    const response = await apis.api_delete_borrow(br_id);
    if (response.success) {
      rerender();
      toast.success(response.mes);
    } else toast.error(response.mes);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    feachAllBooks();
    feachAllStudents();
    feachAllBorrows();
  }, [update]);

  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <h1 className="w-full uppercase text-3xl text-center font-semibold p-5">
        borrows management
      </h1>
      <form
        onSubmit={handleSubmit(handleAddBorrow)}
        className="flex flex-col gap-5"
      >
        <Select
          label={"Sách mượn"}
          id={"book_id"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          options={
            booksData &&
            booksData.map((el) => ({ code: el.id, value: el.name }))
          }
        />
        <Select
          label={"Học sinh mượn"}
          id={"student_id"}
          register={register}
          validate={{ required: "Điền thông tin bắt buộc." }}
          errors={errors}
          wf
          options={
            studentsData &&
            studentsData.map((el) => ({ code: el.id, value: el.name }))
          }
        />
        <InputForm
          label={"Ngày trả dự kiến"}
          id={"return_date"}
          register={register}
          errors={errors}
          validate={{ required: "Điền thông tin bắt buộc." }}
          type="date"
          wf
        />
        <div className="w-full flex justify-between">
          <span></span>
          <Button
            name={"Add borrow"}
            styles={`text-white ${isDirty ? "btn-info" : "btn-disabled"}`}
            type="submit"
          />
        </div>
      </form>
      <table className="table table-zebra">
        <thead className="table-header-group bg-sky-500 text-white capitalize">
          <tr>
            <th className="w-[5%]">#</th>
            <th>sách mượn</th>
            <th>học sinh mượn</th>
            <th>ngày mượn</th>
            <th>ngày trả</th>
            <th className="w-[10%]">action</th>
          </tr>
        </thead>
        <tbody>
          {borrowsData &&
            borrowsData?.length &&
            borrowsData.map((el, idx) => (
              <tr key={el.id}>
                <td className="w-[5%]">{idx + 1}</td>
                <td>
                  {booksData &&
                    booksData.find((els) => els.id === el.book_id).name}
                </td>
                <td>
                  {studentsData &&
                    studentsData.find((els) => els.id === el.student_id).name}
                </td>
                <td>{el.borrow_date}</td>
                <td>{el.return_date}</td>
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
                      onClick={() => deleteBorrow(el.id)}
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

export default Borrow;
