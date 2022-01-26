#-------------------Протокол UART-------------------
import serial
import sys
import time
import glob
from loggers import system_logger_write, data_logger_write
from data_base import insert_data
#from data_base import return_data

test_id = 1

#----Поиск открытых портов----
def find_serial_ports():
    system_logger_write("COM-ports searching")
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
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
    system_logger_write(str)
    del str
    ser.open()


def write_arduino(message):
    ser.flush()
    ser.write(message)


def read_arduino(duration, borehole, imp_mode, before_time, status):
    global test_id
    test_id += 1 
    
    ser.flush()
    log_data = str(duration) + " " + str(borehole) + " " + \
    str(imp_mode) + " " + str(before_time) + " " + str(status) 

    data = ser.readline().decode('utf-8').rstrip()
    data_logger_write(data, 1)
    data = list(data.split())

    for i in range(len(data)):
        log_data += data[i] + " "

    insert_data(duration, borehole, imp_mode, before_time, status, \
    data[0], data[1], data[2], data[3], data[4], data[5], data[6], \
    data[7])

    data_logger_write(log_data, test_id)


def start_engine():
    system_logger_write("Start engine")
    write_arduino("f")


def stop_engine():
    system_logger_write("Engine stop")
    write_arduino("s")


serial_port_setup(115200, list(find_serial_ports()))
json_data = read_arduino(1, 3, 5, 7, 6, 6, 8, 9)