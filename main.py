#----------------------main----------------------
from flask import Flask, url_for

app = Flask(__name__)


@app.route("/")
def index():
	print(url_for('index'))
	return "index"


@app.route("/admin")
def admin():
	print(url_for('admin'))
	return "bebras"


@app.route("/test/<int:test_number>")
def test_info(test_number):
	return f"Номер теста: {test_number}"


@app.route("/create_test")
def create_test():
	return "abeba"


if __name__ == "__main__":
	app.run(debug = True)
