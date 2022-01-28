# ----Создание и основные методы работы с базой данных----
# AdmIn//1857
# script_user

import pymysql
from loggers import *
from time import sleep
import json

global connection


def DB_connect():
    global connection
    connection = pymysql.connect(host='localhost',  # 10.34.206.231
                                 user='bd_uzver',  # admin
                                 password='123',  # AdmIn//1857
                                 db='bd_uzver',  # bebrochk
                                 autocommit=True,
                                 cursorclass=pymysql.cursors.DictCursor)


def create_table():
    DB_connect()
    try:
        with connection.cursor() as cursor:
            cursor.execute("CREATE TABLE IF NOT EXISTS tests \
			(test_id SMALLINT AUTO_INCREMENT PRIMARY KEY, \
			duration SMALLINT, brh_opn SMALLINT, brh_cls SMALLINT, \
			before_time INT, status BOOLEAN, time_after_start SMALLINT, \
			akb_voltage DOUBLE, pressure DOUBLE, tank_temp DOUBLE, engine_wall_temp DOUBLE, \
			valve_temp DOUBLE, valve_current DOUBLE, heating_current DOUBLE)")

    finally:
        connection.close()


def insert_data(duration, brh_opn, brh_cls, before_time, status, time_after_start,
                akb_voltage, press, tank_temp, engine_wall_temp, valve_temp,
                valve_current, heating_current):

    DB_connect()
    try:
        with connection.cursor() as cursor:
            sql_query = "INSERT INTO tests (duration, \
				brh_opn, \
				brh_cls, \
				before_time,\
				status, \
				time_after_start, \
				akb_voltage, \
				pressure, \
				tank_temp, \
				engine_wall_temp, \
				valve_temp, \
				valve_current, \
				heating_current) \
				VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql_query,
                           (duration, brh_opn, brh_cls, before_time, status,
                            time_after_start, akb_voltage, press, tank_temp, engine_wall_temp,
                            valve_temp, valve_current, heating_current))
            cursor.execute('ALTER TABLE tests AUTO_INCREMENT=1')

    finally:
        connection.close()


def update_data(test_id, duration, brh_opn, brh_cls, before_time, status,
                time_after_start, akb_voltage, press, tank_temp, engine_wall_temp,
                valve_temp, valve_current, heating_current):
    # открываем соединение с бд, чтобы записывать изменения
    DB_connect()
    try:
        with connection.cursor() as cursor:
            # запрос
            sql = "UPDATE tests SET duration = %s, brh_open = %s, brh_cls = %s, before_time = %s, \
            status = %s, time_after_start = %s, akb_voltage = %s, press = %s, tank_temp = %s, engine_wall_temp = %s, \
            valve_temp = %s, valve_current = %s, heating_current = %s WHERE test_id = %s"
            # выполняем запрос
            cursor.execute(sql, (duration, brh_opn, brh_cls, before_time, status,
                                 time_after_start, akb_voltage, press, tank_temp, engine_wall_temp,
                                 valve_temp, valve_current, heating_current, test_id))
            # возвращаем результат
            return True

    except Exception as error:
        # возвращаем содержание ошибки
        return error
    finally:
        # закрытие соединения с бд
        connection.close()


def export_all_data():
    # открываем соединение с бд, чтобы записывать изменения
    DB_connect()
    try:
        with connection.cursor() as cursor:
            # запрос
            sql = "SELECT * FROM tests"
            # выполняем запрос
            cursor.execute(sql)
            rows = cursor.fetchall()
            rows_json = json.dumps(rows)
            print(rows_json)
            return rows_json

    except Exception as error:
        # возвращаем содержание ошибки
        return error
    finally:
        # закрытие соединения с бд
        connection.close()


def export_data_json(data_test_id):
    DB_connect()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM tests WHERE test_id = {}".format(data_test_id))
            data_json = cursor.fetchone()
            res_data_json = json.dumps(data_json)
            sleep(1)
            return res_data_json

    except Exception as error:
        return error
    finally:
        connection.close()


"""
def return_test_id(test_id):
	DB_connect()
	try:
		with connection.cursor() as cursor:
				cursor.execute("SELECT * FROM `testinging` WHERE 'test_id' = {}".format(test_id))
				data = cursor.fetchone()
				return data[0]
	finally:
		connection.close()"""


'''def export_to_csv():
	DB_connect()
	data = ""
	try:
		with connection.cursor() as cursor:
			csv_file = open(r'test.csv', 'wb')
			cursor.execute("SELECT * FROM tests")

			for row in cursor.fetchall():
				writer = csv.writer(csv_file)
				writer.writerow(row)

			

	finally:
		connection.close()
'''


create_table()
# insert_data(23,242,24,34,True,35,235,325,325,235,325,235,352)
