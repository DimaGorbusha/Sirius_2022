#----Создание и основные методы работы с базой данных----

import pymysql
from loggers import *


def DB_connect():
	try:
		con = pymysql.connect(
			'localhost', 
			'admin_uzver', 
		    's$eCr//et', 
		    'local_data_base'
		    )

	except Exception as ex:
		logger_write(0, "Connection error")



def create_table():
	DB_connect()
	try:
		with con.cursor() as cursor:
			cursor.execute("CREATE TABLE 'tests' (test_number smallint AUTO_INCREMENT, duration smallint, borehole smallint, imp_mode double_precision, before_time int, status varchar(7))")
			logger_write(0, "Table created")

	finally:
		con.close()



def insert_data(duration, borehole, imp_mode, before_time, status ):
	DB_connect()
	try:
		with con.cursor() as cursor:
			cursor.execute("INSERT INTO 'tests' (duration, borehole, imp_mode, before_time, status) VALUES (duration, borehole, imp_mode, before_time, status)")
			cursor.commit()
			logger_write(0, "Data inserted")

	finally:
		con.close()


def import_to_csv():
	DB_connect()
	data = ""
	with con.cursor() as cursor:
		cursor.execute("SELECT * FROM tests")
		rows = cursor.fetchall()
		with open("data_base_copy.txt", 'w') as file:
			for row in rows:
    			data = "{0} {1} {2} {3} {4} {5}".format(row[0], row[1], row[2], row[3], row[4], row[5]) + "\n"
    			file.write(data)
    			data = ""

