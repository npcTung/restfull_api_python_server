import json
from datetime import date

from flask import jsonify, request
from library.extension import db
from library.library_ma import StudentsSchema
from library.model import Borrow, Students

student_schema = StudentsSchema()
students_schema = StudentsSchema(many=True)


def add_student_service():
    data = request.json
    if (
        data
        and ("name" in data)
        and ("day" in data)
        and ("month" in data)
        and ("year" in data)
        and ("gender" in data)
        and ("class_name" in data)
    ):
        name = data["name"]

        birth_date = date(int(data["year"]), int(data["month"]), int(data["day"]))
        gender = data["gender"]
        class_name = data["class_name"]
        try:
            new_student = Students(name, birth_date, gender, class_name)
            db.session.add(new_student)
            db.session.commit()
            return (
                jsonify({"success": True, "mes": "add new student successfully!"}),
                200,
            )
        except IndentationError:
            db.session.rollback()
            return jsonify({"success": False, "mes": "Can not add student!"}), 400
    else:
        return jsonify({"success": False, "mes": "Missing input!"}), 400


def get_student_by_id_service(sid):
    if sid:
        student = Students.query.get(sid)
        if student:
            student_data = json.loads(
                student_schema.jsonify(student).data.decode("utf8")
            )
            return jsonify({"success": True, "student_data": student_data}), 200
        else:
            return jsonify({"success": False, "mes": "Can not find student!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def get_all_students_service():
    students = Students.query.all()
    if students:
        students_data = json.loads(
            students_schema.jsonify(students).data.decode("utf-8")
        )
        return jsonify({"success": True, "students_data": students_data}), 200
    else:
        return jsonify({"success": False, "mes": "Can not find students!"}), 404


def update_student_service(sid):
    if sid:
        student = Students.query.get(sid)
        if student:
            data = request.json
            if (
                data
                and ("day" in data)
                and ("month" in data)
                and ("year" in data)
                and ("gender" in data)
                and ("class_name" in data)
            ):
                birth_date = date(data["year"], data["month"], data["day"])
                try:
                    student.birth_date = birth_date
                    student.gender = data["gender"]
                    student.class_name = data["class_name"]
                    db.session.commit()
                    return (
                        jsonify(
                            {"success": True, "mes": "Updated student successfully!"}
                        ),
                        200,
                    )
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not update student"}),
                        400,
                    )
            else:
                return jsonify({"success": False, "mes": "Missing input!"}), 400
        else:
            return jsonify({"success": False, "mes": "can not find student!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def delete_student_service(sid):
    if sid:
        student = Students.query.get(sid)
        if student:
            borrows = Borrow.query.filter(Borrow.student_id == sid).all()
            try:
                db.session.delete(student)
                for borrow in borrows:
                    db.session.delete(borrow)
                db.session.commit()
                return (
                    jsonify({"success": True, "mes": "Deleted student successfully!"}),
                    200,
                )
            except IndentationError:
                db.session.rollback()
                return (
                    jsonify({"success": False, "mes": "Can not delete student!"}),
                    400,
                )
        else:
            return jsonify({"success": False, "mes": "Can not find student!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404
