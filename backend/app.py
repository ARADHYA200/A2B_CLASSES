from flask import Flask
from flask_cors import CORS

from routes.students import students_bp
from routes.teachers import teachers_bp
from routes.batches import batches_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(students_bp, url_prefix="/students")
app.register_blueprint(teachers_bp, url_prefix="/teachers")
app.register_blueprint(batches_bp, url_prefix="/batches")

if __name__ == "__main__":
    app.run(debug=True)