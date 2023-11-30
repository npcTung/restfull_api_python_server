import json

from flask import jsonify, request
from library.extension import db
from library.library_ma import AuthorSchema
from library.model import Author, Books, Borrow

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)


def add_author_service():
    data = request.json
    if data and "name" in data:
        name = data["name"]
        Author_name = Author.query.filter(Author.name == name).first()
        if not Author_name:
            try:
                new_author = Author(name)
                db.session.add(new_author)
                db.session.commit()
                return (
                    jsonify({"success": True, "mes": "add author successfully!"}),
                    200,
                )
            except IndentationError:
                db.session.rollback()
                return jsonify({"success": False, "mes": "Can not add author!"}), 400
        else:
            return jsonify({"success": False, "mes": "Can not add author!"}), 400
    else:
        return jsonify({"success": False, "mes": "Missing input!"}), 404


def get_author_service(aid):
    if aid:
        author = Author.query.get(aid)
        if author:
            author_data = json.loads(author_schema.jsonify(author).data.decode("utf8"))
            return (
                jsonify({"success": True, "author_data": author_data}),
                200,
            )
        else:
            return jsonify({"success": False, "mes": "Can not find author!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def get_all_author_services():
    authors = Author.query.all()
    if authors:
        authors_data = json.loads(authors_schema.jsonify(authors).data.decode("utf8"))
        return jsonify({"success": True, "authors_data": authors_data}), 200
    else:
        return jsonify({"success": False, "mes": "Can not find authors!"}), 404


def update_author_service(aid):
    if aid:
        author = Author.query.get(aid)
        if author:
            data = request.json
            if data and ("name" in data):
                try:
                    author.name = data["name"]
                    db.session.commit()
                    return jsonify({"success": True, "mes": "Updated author!"}), 200
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not update author!"}),
                        400,
                    )
            else:
                return jsonify({"success": False, "mes": "Missing input!"}), 400
        else:
            return jsonify({"success": False, "mes": "Can not find author!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def delete_author_service(aid):
    if aid:
        author = Author.query.get(aid)
        if author:
            try:
                books = Books.query.filter(Books.author_id == aid).all()
                db.session.delete(author)
                if books:
                    for book in books:
                        borrows = Borrow.query.filter(Borrow.book_id == book.id)
                        if borrows:
                            for borrow in borrows:
                                db.session.delete(borrow)
                        db.session.delete(book)
                db.session.commit()
                return jsonify({"success": True, "mes": "Deleted author!"}), 200
            except IndentationError:
                db.session.rollback()
                return jsonify({"success": False, "mes": "can not update author"}), 400
        else:
            return jsonify({"success": False, "mes": "Can not find author!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404
