import json

from flask import jsonify, request
from library.extension import db
from library.library_ma import CategorySchema
from library.model import Books, Borrow, Category

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


def add_category_service():
    data = request.json
    if data and "name" in data:
        name = data["name"]
        try:
            new_category = Category(name)
            db.session.add(new_category)
            db.session.commit()
            return jsonify({"success": True, "mes": "add category successfully!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"success": False, "mes": "can not add author!"}), 400
    else:
        return jsonify({"success": False, "mes": "Missing input!"}), 400


def get_category_service(cid):
    if cid:
        category = Category.query.get(cid)
        if category:
            category_data = json.loads(
                category_schema, jsonify(category).data.decode("utf8")
            )
            return jsonify({"success": True, "category_data": category_data}), 200
        else:
            return jsonify({"success": False, "mes": "Can not find category!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def get_all_categories_services():
    categories = Category.query.all()
    if categories:
        categories_data = json.loads(
            categories_schema.jsonify(categories).data.decode("utf-8")
        )
        return jsonify({"success": True, "categories_data": categories_data}), 200
    else:
        return jsonify({"success": False, "mes": "Can not find categories!"}), 404


def update_category_service(cid):
    if cid:
        category = Category.query.get(cid)
        if category:
            data = request.json
            if data and ("name" in data):
                try:
                    category.name = data["name"]
                    db.session.commit()
                    return jsonify({"success": True, "mes": "Updated category!"}), 200
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not update category!"}),
                        400,
                    )
            else:
                return jsonify({"success": False, "mes": "Missing input!"}), 400
        else:
            return jsonify({"success": False, "mes": "Can not find category!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def delete_category_service(cid):
    if cid:
        category = Category.query.get(cid)
        if category:
            books = Books.query.filter(Books.category_id == cid).all()
            db.session.delete(category)
            if books:
                for book in books:
                    borrows = Borrow.query.filter(Borrow.book_id == book.id)
                    if borrows:
                        for borrow in borrows:
                            db.session.delete(borrow)
                    else:
                        return (
                            jsonify({"success": False, "mes": "Can not find borrow!"}),
                            404,
                        )
                    db.session.delete(book)
            db.session.commit()
            return jsonify({"success": True, "mes": "Deleted author!"}), 200
        else:
            return jsonify({"success": False, "mes": "Can not delete author!"}), 400
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404
