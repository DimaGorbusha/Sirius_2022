#----------------------main----------------------
from flask import Flask, url_for, render_template, session, redirect, request
from loggers import *

from raspi_data import json_data

app = Flask(__name__)

password = "17091857"

@app.route("/")
def index():
	
	# return render_template("frontend\public\index.html")


@app.route("/list-tests")
def list_test():

	# return render_template("frontend\public\index.html")


@app.route("/test-detail/<int:test_number>")
def show_test_detail(index):
	
	# return render_template("frontend\public\index.html", json_data[index])



@app.route("/create-test", methods=["POST", "GET"])
def create_test():
	# return render_template("frontend\public\index.html")


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