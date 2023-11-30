from .extension import ma


class StudentsSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "birth_date", "gender", "class_name")


class BooksSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "page_count", "author_id", "category_id")


class BorrowSchema(ma.Schema):
    class Meta:
        fields = ("id", "book_id", "student_id", "borrow_date", "return_date")


class CategorySchema(ma.Schema):
    class Meta:
        fields = ("id", "name")


class AuthorSchema(ma.Schema):
    class Meta:
        fields = ("id", "name")
