from flask import Blueprint, jsonify
from db import get_db

batches_bp = Blueprint("batches", __name__)

@batches_bp.route("/", methods=["GET"])
def get_batches():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM batches")

    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return jsonify(data)