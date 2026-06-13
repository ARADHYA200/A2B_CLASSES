from flask import Blueprint, jsonify
from db import get_db

teachers_bp = Blueprint("teachers", __name__)

@teachers_bp.route("/", methods=["GET"])
def get_teachers():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM teachers")

    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return jsonify(data)