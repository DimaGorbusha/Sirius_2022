#----Создание и основные методы работы с базой данных----

import csv
import pymysql
import pymysql.cursors
from loggers import *


global connection

def DB_connect():
	global connection
	connection = pymysql.connect(host='localhost',
		user='bd_uzver',
		password='123',
		db='bd_uzver',
		autocommit=True)


def create_table():
	DB_connect()
	try:
		with connection.cursor() as cursor:
			cursor.execute("CREATE TABLE IF NOT EXISTS testinging (test_number SMALLINT AUTO_INCREMENT PRIMARY KEY, duration SMALLINT, borehole SMALLINT, imp_mode DOUBLE PRECISION, before_time INT, status VARCHAR(7))")

	finally:
		connection.close()


def insert_data(duration, borehole, imp_mode, before_time, status ):
	DB_connect()
	try:
		with connection.cursor() as cursor:
			cursor.execute("INSERT INTO tests (duration, borehole, imp_mode, before_time, status) VALUES (%s, %s, %s, %s, %s)",  (duration, borehole, imp_mode, before_time, status))
			connection.commit()

	finally:
		connection.close()


"""def export_to_csv():
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

"""
create_table()
insert_data(1, 4, 5, 6, "status")
