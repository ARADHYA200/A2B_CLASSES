import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Ar@20050227",
        database="A2B_CLASSES"
    )