import os

from flask import Flask
from flask_cors import CORS

from .author.controller import authors
from .books.controller import books
from .borrow.controller import borrows
from .category.controller import categories
from .extension import db, ma
from .model import Author, Books, Borrow, Category, Students
from .students.controller import students


def create_db(app):
    if not os.path.exists("library/library.db"):
        with app.app_context():
            db.create_all()
            print("Created DB!")


def init_index(app):
    app.register_blueprint(books)
    app.register_blueprint(students)
    app.register_blueprint(borrows)
    app.register_blueprint(authors)
    app.register_blueprint(categories)


def create_app(config_file="config.py"):
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile(config_file)
    db.init_app(app)
    ma.init_app(app)
    create_db(app)
    init_index(app)
    return app
