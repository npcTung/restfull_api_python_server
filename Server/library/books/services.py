import json

from flask import jsonify, request
from sqlalchemy.sql import func

from library.extension import db
from library.library_ma import BooksSchema
from library.model import Author, Books, Borrow, Category

book_schema = BooksSchema()
books_schema = BooksSchema(many=True)


def add_book_service():
    data = request.json
    if (
        data
        and ("name" in data)
        and ("page_count" in data)
        and ("author_id" in data)
        and ("category_id" in data)
    ):
        name = data["name"]
        page_count = data["page_count"]
        author_id = data["author_id"]
        category_id = data["category_id"]
        try:
            new_book = Books(name, page_count, author_id, category_id)
            db.session.add(new_book)
            db.session.commit()
            return jsonify({"success": True, "mes": "add new book successfully!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"success": False, "mes": "Can not add book!"}), 400
    else:
        return jsonify({"success": False, "mes": "missing input!"}), 400


def get_book_by_id_service(bid):
    if bid:
        book = Books.query.get(bid)
        if book:
            book_data = json.loads(book_schema.jsonify(book).data.decode("utf-8"))
            return jsonify({"success": True, "book_data": book_data}), 200
        else:
            return jsonify({"success": False, "mes": "Not found book!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def get_all_books_service():
    books = None
    author_name = request.args.get("author_name")
    category_name = request.args.get("category_name")
    if author_name or category_name:
        books = (
            Books.query.join(Author)
            .filter(
                func.lower(
                    Author.name.ilike(f"%{author_name}%")
                    or Category.name.ilike(f"%{category_name}%")
                )
            )
            .all()
        )
    else:
        books = Books.query.all()
    if books:
        books_data = json.loads(books_schema.jsonify(books).data.decode("utf-8"))
        return jsonify({"success": True, "books_data": books_data}), 200
    else:
        return jsonify({"success": False, "mes": "Not found books!"}), 404


def update_book_by_id_service(bid):
    if bid:
        book = Books.query.get(bid)
        data = request.json
        if book:
            if data and ("page_count" in data):
                try:
                    book.page_count = data["page_count"]
                    db.session.commit()
                    return (
                        jsonify({"success": True, "mes": "Updated book successfully!"}),
                        200,
                    )
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not update book!"}),
                        400,
                    )
            else:
                return (jsonify({"success": False, "mes": "Missing input!"}), 400)
        else:
            return jsonify({"success": False, "mes": "Not found book!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404


def delete_book_by_id_service(bid):
    if bid:
        book = Books.query.get(bid)
        if book:
            borrows = Borrow.query.filter(Borrow.book_id == bid).all()
            if borrows:
                try:
                    db.session.delete(book)
                    for borrow in borrows:
                        db.session.delete(borrow)
                    db.session.commit()
                    return (
                        jsonify({"success": True, "mes": "Delete book successfully!"}),
                        200,
                    )
                except IndentationError:
                    db.session.rollback()
                    return (
                        jsonify({"success": False, "mes": "Can not delete book!"}),
                        400,
                    )
            else:
                return jsonify({"success": False, "mes": "Can not find borrow!"}), 404
        else:
            return jsonify({"success": False, "mes": "Not found book!"}), 404
    else:
        return jsonify({"success": False, "mes": "Request error!"}), 404
