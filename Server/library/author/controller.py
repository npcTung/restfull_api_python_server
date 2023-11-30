from flask import Blueprint

from .services import (
    add_author_service,
    delete_author_service,
    get_all_author_services,
    get_author_service,
    update_author_service,
)

authors = Blueprint("author", __name__)


# add author
@authors.route("/api/book-manager/author", methods=["POST"])
def add_author():
    return add_author_service()


# get author
@authors.route("/api/book-manager/author/<int:aid>", methods=["GET"])
def get_author(aid):
    return get_author_service(aid)


# get all authors
@authors.route("/api/book-manager/authors", methods=["GET"])
def get_all_authors():
    return get_all_author_services()


# update author
@authors.route("/api/book-manager/author/<int:aid>", methods=["PUT"])
def update_author(aid):
    return update_author_service(aid)


# delete author
@authors.route("/api/book-manager/author/<int:aid>", methods=["DELETE"])
def delete_author(aid):
    return delete_author_service(aid)
