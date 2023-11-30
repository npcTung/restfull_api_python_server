from flask import Blueprint

from .services import (
    add_category_service,
    delete_category_service,
    get_all_categories_services,
    get_category_service,
    update_category_service,
)

categories = Blueprint("category", __name__)


# add category
@categories.route("/api/book-manager/category", methods=["POST"])
def add_category():
    return add_category_service()


# get category
@categories.route("/api/book-manager/category/<int:cid>", methods=["GET"])
def get_category(cid):
    return get_category_service(cid)


# get all categories
@categories.route("/api/book-manager/categories", methods=["GET"])
def get_all_categories():
    return get_all_categories_services()


# update category
@categories.route("/api/book-manager/category/<int:cid>", methods=["PUT"])
def update_category(cid):
    return update_category_service(cid)


# delete category
@categories.route("/api/book-manager/category/<int:cid>", methods=["DELETE"])
def delete_category(cid):
    return delete_category_service(cid)
