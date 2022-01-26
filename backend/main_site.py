# ----------------------main----------------------
from asyncio.windows_events import NULL
from flask import Flask, url_for, render_template, session, redirect, request
from data_base import export_all_data
from raspi_data import read_arduino, stop_engine, start_engine, find_serial_ports, serial_port_setup
from loggers import *
from flask_cors import CORS, cross_origin
from data_base import export_data_json
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
    data = export_all_data
    return data


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
            test_borehole_opn = request.form["borehole_opn"]
            test_heat_time = request.form["heating_time"]
            test_borehole_cls = request.form["borehole_cls"]
            test_status = NULL
            read_arduino(test_duration, test_borehole_opn,
                         test_heat_time, test_borehole_cls, test_status)
            sleep(1)

        test_duration = request.form["duration"]
        test_borehole_opn = request.form["borehole_opn"]
        test_heat_time = request.form["heating_time"]
        test_borehole_cls = request.form["borehole_cls"]
        test_status = True

        read_arduino(test_duration, test_borehole_opn, test_heat_time, test_borehole_cls, test_status)


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
