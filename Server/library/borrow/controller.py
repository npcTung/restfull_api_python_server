from flask import Blueprint

from .services import (
    add_borrow_service,
    delete_borrow_service,
    get_all_borrows_service,
    get_borrow_by_id_service,
    update_borrow_service,
)

borrows = Blueprint("borrow", __name__)


# add borrow
@borrows.route("/api/book-manager/borrow", methods=["POST"])
def add_borrow():
    return add_borrow_service()


# get borrow
@borrows.route("/api/book-manager/borrow/<int:br_id>", methods=["GET"])
def get_borrow(br_id):
    return get_borrow_by_id_service(br_id)


# get all borrow
@borrows.route("/api/book-manager/borrows", methods=["GET"])
def get_all_borrows():
    return get_all_borrows_service()


# update borrow
@borrows.route("/api/book-manager/borrow/<int:br_id>", methods=["PUT"])
def update_borrow(br_id):
    return update_borrow_service(br_id)


# delete borrow
@borrows.route("/api/book-manager/borrow/<int:br_id>", methods=["DELETE"])
def delete_borrow(br_id):
    return delete_borrow_service(br_id)
