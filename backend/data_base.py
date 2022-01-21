#----Создание и основные методы работы с базой данных----
# AdmIn//1857
# admin

# script_user
# 10.34.206.231
# 1857
# BeB//RocHk#a


import pymysql
from loggers import *
from time import sleep

global connection

def DB_connect():
	global connection
	connection = pymysql.connect(host='localhost', # 10.34.206.231
		user='bd_uzver', # admin
		password='123', # AdmIn//1857
		db='bd_uzver', # bebrochk
		autocommit=True)


def create_table():
	DB_connect()
	try:
		with connection.cursor() as cursor:
			cursor.execute("CREATE TABLE IF NOT EXISTS tests \
			(test_id SMALLINT AUTO_INCREMENT PRIMARY KEY, \
			duration SMALLINT, borehole SMALLINT, imp_mode DOUBLE, \
			before_time INT, status VARCHAR(7), time_after_start SMALLINT, \
			akb_voltage DOUBLE, pressure DOUBLE, tank_temp DOUBLE, engine_wall_temp DOUBLE, \
			valve_temp DOUBLE, valve_current DOUBLE, heating_current DOUBLE)")

	finally:
		connection.close()


def insert_data(duration, borehole, imp_mode, before_time, status, time_after_start, \
	akb_voltage, press, tank_temp, engine_wall_temp, valve_temp, \
	valve_current, heating_current):

	DB_connect()
	try:
		with connection.cursor() as cursor:
			sql_query = "INSERT INTO tests (duration, \
				borehole, \
				imp_mode, \
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
			cursor.execute(sql_query, \
				(duration, borehole, imp_mode, before_time, status, \
				time_after_start, akb_voltage, press, tank_temp, engine_wall_temp, \
				valve_temp, valve_current, heating_current))

	finally:
		connection.close()


def export_data_json(data_test_id):
	DB_connect()
	try:
		with connection.cursor() as cursor:
				cursor.execute("SELECT * FROM `testinging` WHERE 'test_id' = {}".format(data_test_id))
				data = cursor.fetchone()
				data_json = {
					'test_id': data[0],
					'duration': data[1],
					'borehole': data[2],
					'imp_mode': data[3],
					'before_time': data[4],
					'status': data[5],
					'time_after_start': data[6],
					'akb_voltage': data[7],
					'pressure': data[8],
					'tank_temp': data[9],
					'engine_wall_temp': data[10],
					'valve_temp': data[11],
					'valve_current': data[12],
					'heating_current': data[13]
				}
				sleep(1)

	finally:
		connection.close()

	return data_json

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
insert_data(22, 12, 33, 41, "УСПЕХ", 21, \
	22.0, 44.55, 78.66, 797.00066, 120555.69, \
	666.666, 789.999)