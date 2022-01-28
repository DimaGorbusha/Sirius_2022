# ----------------------main----------------------
from flask import Flask, render_template, session, request, jsonify
from data_base import insert_data
from data_base import export_all_data
from raspi_data import read_arduino, start_engine, find_serial_ports, serial_port_setup
from loggers import *
from flask_cors import CORS, cross_origin
from data_base import export_data_json
from time import sleep


app = Flask(__name__)
CORS(app)

password = "17091857"


"""@app.route("/")
def index():
    return render_template("index.html")"""


"""@app.route("/test-status")
def test_status():
    if request.method == "POST":
        if 
"""


@app.route("/list_tests", methods=['GET'])
@cross_origin()
def list_test():
    data = export_all_data()
    return data


@app.route("/test-detail/<test_id>", methods=["GET", "POST"])
def show_test_detail(test_id):
    data = export_data_json(test_id)
    print(str(data))
    return data


@app.route("/create_test", methods=["POST"])
def create_test():
    # insert_data(23,242,24,34,True,35,235,325,325,235,325,235,352)
    data = request.get_json()
    print(str(data))
    insert_data(
        data['duration'], data['preheat_time'],
        data['duty_cycle'], data['pulse_period'],
        None, None, None, None, None, None, None, None,
        None
    )
    return str(data)


@app.route("/launch-test", methods=["POST", "GET"])
def launch_test():
    if request.method == 'POST':
        data = request.get_json()
        print(str(data))
        read_arduino(data['duration'], data['duty_cycle'], data['pulse_period'], data['preheat_time'], data['status'])
        return str(data)
    
    # if request.method == "POST":
    #     count = 0
    #     serial_port_setup(115200, find_serial_ports())
    #     start_engine()
    #     while count != int(request.form["duration"]) - 1:
    #         count += 1
    #         test_duration = request.form["duration"]
    #         test_borehole_opn = request.form["borehole_opn"]
    #         test_heat_time = request.form["heating_time"]
    #         test_borehole_cls = request.form["borehole_cls"]
    #         test_status = None
    #         read_arduino(test_duration, test_borehole_opn,
    #                      test_heat_time, test_borehole_cls, test_status)
    #         sleep(1)

    #     test_duration = request.form["duration"]
    #     test_borehole_opn = request.form["borehole_opn"]
    #     test_heat_time = request.form["heating_time"]
    #     test_borehole_cls = request.form["borehole_cls"]
    #     test_status = True

    #     read_arduino(test_duration, test_borehole_opn,
    #                  test_heat_time, test_borehole_cls, test_status)
    


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
