from flask import Blueprint, request, jsonify
from db import get_db

students_bp = Blueprint("students", __name__)

# ================= GET ALL =================

@students_bp.route("/", methods=["GET"])
def get_students():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        cursor.execute("SELECT * FROM students ORDER BY ID_NO DESC")
        students = cursor.fetchall()

        return jsonify(students), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= ADD =================

@students_bp.route("/", methods=["POST"])
def add_student():
    try:
        data = request.json

        db = get_db()
        cursor = db.cursor()

        query = """
        INSERT INTO students
        (FIRST_NAME, LAST_NAME, CITY)
        VALUES (%s, %s, %s)
        """

        cursor.execute(
            query,
            (
                data.get("first_name"),
                data.get("last_name", "NA"),
                data.get("city", "NA")
            )
        )

        db.commit()

        return jsonify({
            "message": "Student added successfully",
            "student_id": cursor.lastrowid
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= UPDATE =================

@students_bp.route("/<int:id>", methods=["PUT"])
def update_student(id):
    try:
        data = request.json

        db = get_db()
        cursor = db.cursor()

        query = """
        UPDATE students
        SET FIRST_NAME=%s,
            LAST_NAME=%s,
            CITY=%s
        WHERE ID_NO=%s
        """

        cursor.execute(
            query,
            (
                data.get("first_name"),
                data.get("last_name", "NA"),
                data.get("city", "NA"),
                id
            )
        )

        db.commit()

        return jsonify({"message": "Student updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= DELETE =================

@students_bp.route("/<int:id>", methods=["DELETE"])
def delete_student(id):
    try:
        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            "DELETE FROM students WHERE ID_NO=%s",
            (id,)
        )

        db.commit()

        return jsonify({"message": "Student deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ================= SEARCH =================

@students_bp.route("/search", methods=["GET"])
def search_students():
    try:
        value = request.args.get("value", "")

        db = get_db()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT *
        FROM students
        WHERE FIRST_NAME LIKE %s
           OR LAST_NAME LIKE %s
           OR CITY LIKE %s
        """

        search_term = f"%{value}%"

        cursor.execute(
            query,
            (search_term, search_term, search_term)
        )

        result = cursor.fetchall()

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500