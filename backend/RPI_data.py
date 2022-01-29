#-------------------Протокол UART-------------------
import serial
import time
import sys
import glob
from loggers import system_logger_write, data_logger_write
# from data_base import insert_data

test_id = 1

#----Поиск открытых портов----
def find_serial_ports():
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
    global ser
    ser = serial.Serial()
    ser.baudrate = baudrate
    ser.port = coms_arr[0]
    ser.timeout = 1
    str = "Selected: "
    str += coms_arr[0]
    system_logger_write(str)
    del str
    ser.open()


def write_arduino_arr(data):
    global ser
    for i in range(len(data)):
        ser.write((str(data[i])  + "\n").encode())


def write_arduino(msg):
    global ser
    ser.write(msg.encode())


"""def start_engine():
    system_logger_write("Start engine")
    write_arduino(b'f')"""


def read_arduino(duration, borehole_opn, borehole_cls, before_time, status):
    global ser
    global test_id
    test_id += 1

    data = [duration, borehole_opn, borehole_cls, before_time]

    ser.flush()

    write_arduino_arr(data)
    write_arduino_arr(data)

    start_cycle_time = time.perf_counter()
    
    ser.flush()

    while True:
        if time.perf_counter() - start_cycle_time >= duration:
            stop_engine()
            ser.flush()
            return
        
        print("ЦИКЛ")
        
        while ser.in_waiting <= 0:
            pass

        # if ser.in_waiting > 0: # Ожидаем данные
        print("ДАННЫЕ ПОЛУЧЕНЫ")
        recieve_data = ser.readline().decode('utf-8').rstrip()
        # recieve_data_arr = list(recieve_data.split())
        print(recieve_data)

        log_data = str(duration) + " " + str(borehole_opn) + " " + \
        str(borehole_cls) + " " + str(before_time) + " " + str(status) + " " + recieve_data

        data_logger_write(log_data, test_id)

        """if recieve_data == "stop":
            stop_engine()
            return"""

        log_data = ""

        """insert_data(duration, borehole_opn, borehole_cls, before_time, status, \
        int(recieve_data[0]), float(recieve_data[1]), float(recieve_data[2]), float(recieve_data[3]), float(recieve_data[4]), float(recieve_data[5]), float(recieve_data[6]), \
        float(recieve_data[7]))"""


def stop_engine():
    system_logger_write("Engine stop")
    write_arduino("stop")


"""def test():
    global test_id
    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8').rstrip()
        data = list(data.split())


        log_data = "22" + " " + "55" + " " + \
        "55" + " " + "44" + " " + "65"

        for i in range(len(data)):
                    log_data += str(data[i]) + " "

        data_logger_write(log_data, test_id)

    data = [22, 33, 55, 7879]
    ser.flush()
    ser.write(data[0])"""


serial_port_setup(115200, find_serial_ports())

read_arduino(20, 10, 10, 10, True)

"""transmit_data = [5, 80, 20, 10]

while True:
    ser.flush()
    write_arduino_arr(transmit_data)
    if ser.in_waiting > 0:
        rec_data = ser.readline().decode('utf-8').rstrip()
        print(rec_data)
        data_logger_write(rec_data, 1)"""
