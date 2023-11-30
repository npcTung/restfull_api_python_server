from flask import Blueprint

from .services import (
    add_student_service,
    delete_student_service,
    get_all_students_service,
    get_student_by_id_service,
    update_student_service,
)

students = Blueprint("student", __name__)


# add student
@students.route("/api/book-manager/student", methods=["POST"])
def add_student():
    return add_student_service()


# get student
@students.route("/api/book-manager/student/<int:sid>", methods=["GET"])
def get_student(sid):
    return get_student_by_id_service(sid)


# get all students
@students.route("/api/book-manager/students", methods=["GET"])
def get_all_students():
    return get_all_students_service()


# update student
@students.route("/api/book-manager/student/<int:sid>", methods=["PUT"])
def update_student(sid):
    return update_student_service(sid)


# delete student
@students.route("/api/book-manager/student/<int:sid>", methods=["DELETE"])
def delete_student(sid):
    return delete_student_service(sid)
