import json
from datetime import date

from flask import jsonify, request
from library.extension import db
from library.library_ma import BorrowSchema
from library.model import Borrow

borrow_schema = BorrowSchema()
borrows_schema = BorrowSchema(many=True)


def add_borrow_service():
    data = request.json
    if (
        data
        and ("book_id" in data)
        and ("student_id" in data)
        and ("day" in data)
        and ("month" in data)
        and ("year" in data)
    ):
        try:
            book_id = data["book_id"]
            student_id = data["student_id"]
            borrow_date = date.today()
            return_date = date(int(data["year"]), int(data["month"]), int(data["day"]))
            if return_date >= borrow_date:
                new_borrow = Borrow(book_id, student_id, borrow_date, return_date)
                db.session.add(new_borrow)
                db.session.commit()
                return (
                    jsonify({"success": True, "mes": "add borrow successfully!"}),
                    200,
                )
            else:
                return (
                    jsonify({"success": False, "mes": "ngày trả phải sau ngày mượn!"}),
                    400,
                )
        except IndentationError:
            return jsonify({"success": False, "mes": "can not add borrow!"}), 400
    else:
        return jsonify({"success": False, "mes": "missing input!"}), 400


def get_borrow_by_id_service(br_id):
    if br_id:
        borrow = Borrow.query.get(br_id)
        if borrow:
            borrow_data = json.loads(borrow_schema.jsonify(borrow).data.decode("utf8"))
            return jsonify({"success": True, "borrow_data": borrow_data}), 200
        else:
            return jsonify({"success": False, "mes": "can not find borrow!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def get_all_borrows_service():
    borrows = Borrow.query.all()
    if borrows:
        borrows_data = json.loads(borrows_schema.jsonify(borrows).data.decode("utf8"))
        return (
            jsonify(
                {
                    "success": True,
                    "borrows_data": borrows_data,
                }
            ),
            200,
        )
    else:
        return jsonify({"success": False, "mes": "Can not find borrows!"}), 404


def update_borrow_service(br_id):
    if br_id:
        borrow = Borrow.query.get(br_id)
        data = request.json
        if borrow:
            if (
                data
                and ("book_id" in data)
                and ("student_id" in data)
                and ("day" in data)
                and ("month" in data)
                and ("year" in data)
            ):
                return_date = date(data["year"], data["month"], data["day"])
                try:
                    borrow.book_id = data["book_id"]
                    borrow.student_id = data["student_id"]
                    borrow.return_date = return_date
                    db.session.commit()
                    return jsonify({"success": True, "mes": "Udated borrow!"}), 200
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not update borrow!"}),
                        400,
                    )
            else:
                return jsonify({"success": False, "mes": "Missing input!"}), 400
        else:
            return jsonify({"success": False, "mes": "Can not find borrow!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def delete_borrow_service(br_id):
    if br_id:
        borrow = Borrow.query.get(br_id)
        if borrow:
            db.session.delete(borrow)
            db.session.commit()
            return jsonify({"success": True, "mes": "Deleted borrow!"}), 200
        else:
            return jsonify({"success": False, "mes": "can not delete borrow!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404
