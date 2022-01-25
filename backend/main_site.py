# ----------------------main----------------------
#from crypt import methods
#from crypt import methods
from crypt import methods
from flask import Flask, url_for, render_template, session, redirect, request
from data_base import export_all_data
from raspi_data import read_arduino
from loggers import *
from flask_cors import CORS, cross_origin
from data_base import insert_data, export_data_json
from time import sleep


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
def show_test_detail(index):
    return render_template("index.html", json_data[index])


@app.route("/create-test", methods=["POST", "GET"])
def create_test():
    if request.method == "POST":
        count = 0
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
        read_arduino(test_duration, test_borehole,
                     test_heat_time, test_imp_mode, test_status)


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
