# ----------------------main----------------------
from crypt import methods
from flask import Flask, render_template, session, request
from raspi_data import read_arduino, start_engine, stop_engine, \
    serial_port_setup, find_serial_ports

from loggers import *
from flask_cors import CORS, cross_origin
from time import sleep
from data_base import export_data_json


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


@app.route("/test-detail/<int:test_number>", methods=["GET", "POST"])
def show_test_detail(test_id):
    data = export_data_json(test_id)
    return data


@app.route("/create-test", methods=["POST", "GET"])
def create_test():
    if request.method == "POST":
        count = 0
        serial_port_setup(115200, find_serial_ports())
        start_engine()
        while count != int(request.form["duration"]) - 1:
            count += 1
            test_duration = request.form["duration"]
            test_borehole = request.form["borehole"]
            test_heat_time = request.form["heating_time"]
            test_imp_mode = request.form["imp_mode"]
            test_status = "Выполняется"
            read_arduino(test_duration, test_borehole,
                         test_heat_time, test_imp_mode, test_status)
            sleep(1)

        test_duration = request.form["duration"]
        test_borehole = request.form["borehole"]
        test_heat_time = request.form["heating_time"]
        test_imp_mode = request.form["imp_mode"]
        test_status = "Завершён"

        read_arduino(test_duration, test_borehole, test_heat_time, test_imp_mode, test_status)
        stop_engine()


@app.route("/sign-up", methods=["POST", "GET"])
def sign_up():

    if session["userLogged"] == True:
        json_data = {
            "isLogged": session["userLogged"]
        }
        return json_data

    elif request.method == "POST" and request.form["formPass"] == password:
        system_logger_write("User logged as admin")
        session["userLogged"] = True
        json_data = {
            "isLogged": session["userLogged"]
        }
        return json_data


if __name__ == '__main__':
    app.run(debug=True)
