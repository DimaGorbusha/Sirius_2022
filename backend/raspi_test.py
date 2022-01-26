"""#-------------------Протокол UART-------------------
import serial
import sys
import time
import glob
import logging
from loggers import *


#----Поиск открытых портов----
def find_serial_ports():
    system_logger_write("Ports searching")
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Неподдерживаемая платформа')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result


#----Функции логики----
def serial_port_setup(baudrate, coms_arr):
    ser = serial.Serial()
    ser.baudrate = baudrate
    print(*coms_arr)
    ser.port = coms_arr[0]
    str = "Selected: "
    str += coms_arr[0]
    logger_write(0, str)
    del str
    ser.open()


def write_arduino(message):
    ser.flush()
    ser.write(message)


def test_write_to_arduino():
    ser.flush()
    while True:
        ser.write(b"Hello from RPI!\n")
        line = ser.readline().decode('utf-8').rstrip()
        print(line)
        time.sleep(3)


def test_read_from_arduino():
    ser.flush()
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)


def read_arduino():
    ser.flush()
    data = ser.readline().decode('utf-8').rstrip()
    loggers_write(1, data)
    data = list(data.split())


def start_engine():
    system_loggers_write(0, "Start engine")
    write_arduino("f")


def stop_engine():
    system_loggers_write(0, "Engine stop")
    write_arduino("s")


#serial_port_setup(115200, list(find_serial_ports()))
"""
