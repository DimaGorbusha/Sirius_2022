#----------------------main----------------------
from flask import Flask, url_for, render_template, session, redirect, request
from loggers import *

from raspi_data import json_data

app = Flask(__name__)


password = "17091857"

@app.route("/")
def index():
<<<<<<< HEAD:main_site.py
	
	# return render_template("frontend\public\index.html")
=======
	return render_template("index.html")
>>>>>>> 9aa6c6009c6bf84dc977b4a49dac7d3ed6a50e2e:backend/main_site.py


@app.route("/list-tests")
def list_test():
<<<<<<< HEAD:main_site.py

	# return render_template("frontend\public\index.html")
=======
	return render_template("index.html")
>>>>>>> 9aa6c6009c6bf84dc977b4a49dac7d3ed6a50e2e:backend/main_site.py


@app.route("/test-detail/<int:test_number>")
def show_test_detail(index):
	
<<<<<<< HEAD:main_site.py
	# return render_template("frontend\public\index.html", json_data[index])
=======
	return render_template("index.html", json_data[index])
>>>>>>> 9aa6c6009c6bf84dc977b4a49dac7d3ed6a50e2e:backend/main_site.py



@app.route("/create-test", methods=["POST", "GET"])
def create_test():
<<<<<<< HEAD:main_site.py
	# return render_template("frontend\public\index.html")
=======
	return render_template("index.html")
>>>>>>> 9aa6c6009c6bf84dc977b4a49dac7d3ed6a50e2e:backend/main_site.py


@app.route("/sign-up", methods=["POST", "GET"])
def sign_up():
	if 'userLogged' in session:
		# json_data = {
		# 	"is_logged": True
		# }
		# # return redirect(url_for("/list-tests"))

	elif request.method == 'POST' and request.form['password'] == password:
		system_logger_write
		# json_data = {
		# 	"is_logged": True
		# }
		# # return redirect(url_for("/list-tests"))

	# return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)