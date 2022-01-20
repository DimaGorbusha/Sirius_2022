#-------------------Протокол UART-------------------
import serial
import sys
import time
import glob
from loggers import *

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


def read_arduino(test_id, voltage, pres, t_b, t_s, t_k, c_k, c_n):
    # ser.flush()
    # data = ser.readline().decode('utf-8').rstrip()
    # data_logger_write(data, 1)
    # data = list(data.split())
    
    json_data = {
        'test_id': test_id,
        'voltage_akb': voltage,
        'pressure': pres,
        'temperature_back': t_b,
        'temperature_stenka': t_s,
        'temperature_klapan': t_k,
        'current_klapan': c_k,
        'current_nagrev': c_n
    }

    return json_data


def start_engine():
    system_logger_write("Start engine")
    write_arduino("f")


def stop_engine():
    system_logger_write("Engine stop")
    write_arduino("s")


# serial_port_setup(115200, list(find_serial_ports()))


json_data = read_arduino(1, 3, 5, 7, 6, 6, 8, 9)