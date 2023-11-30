from flask import Blueprint

from .services import (
    add_book_service,
    delete_book_by_id_service,
    get_all_books_service,
    get_book_by_id_service,
    update_book_by_id_service,
)

books = Blueprint("books", __name__)


# get all books
@books.route("/api/book-manager/books", methods=["GET"])
def get_all_books():
    return get_all_books_service()


# add book
@books.route("/api/book-manager/book", methods=["POST"])
def add_book():
    return add_book_service()


# get books by id
@books.route("/api/book-manager/book/<int:bid>", methods=["GET"])
def get_book(bid):
    return get_book_by_id_service(bid)


# update book
@books.route("/api/book-manager/book/<int:bid>", methods=["PUT"])
def update_book_by_id(bid):
    return update_book_by_id_service(bid)


# delete book
@books.route("/api/book-manager/book/<int:bid>", methods=["DELETE"])
def delete_book_by_id(bid):
    return delete_book_by_id_service(bid)
