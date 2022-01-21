# ----------------------main----------------------
#from crypt import methods
#from crypt import methods
from flask import Flask, url_for, render_template, session, redirect, request
from loggers import *
from flask_cors import CORS, cross_origin
from raspi_data import json_data

app = Flask(__name__)
CORS(app)

password = "17091857"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/list_tests", methods=['GET'])
@cross_origin()
def list_test():
    return {
        "tests": [
        {
            "id": 1,
            "is_successfull": True,
            "duration": 20,
            "duty_cycle": 10,
            "preheat_time": 40,
            "pulse_period": 50

        },
        {
            "id": 2,
            "is_successfull": True,
            "duration": 60,
            "duty_cycle": 70,
            "preheat_time": 46,
            "pulse_period": 23
        },
        {
            "id": 3,
            "is_successfull": True,
            "duration": 78,
            "duty_cycle": 234,
            "preheat_time": 234,
            "pulse_period": 45
        },
        {
            "id": 4,
            "is_successfull": False,
            "duration": 46,
            "duty_cycle": 75,
            "preheat_time": 23,
            "pulse_period": 79
        }
    ],
        "list_tests": "hello"
    }


@app.route("/test-detail/<int:test_number>")
def show_test_detail(index):

    return render_template("index.html", json_data[index])


@app.route("/create-test", methods=["POST", "GET"])
def create_test():
    return render_template("index.html")


@app.route("/sign-up", methods=["POST", "GET"])
def sign_up():
    if 'userLogged' in session:
        json_data = {
            "is_logged": True
        }
        return redirect(url_for("/list-tests"))

    elif request.method == 'POST' and request.form['password'] == password:
        system_logger_write
        json_data = {
            "is_logged": True
        }
        return redirect(url_for("/list_tests"))

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
