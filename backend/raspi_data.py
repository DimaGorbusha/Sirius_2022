#-------------------Протокол UART-------------------
import serial
import sys
import glob
from loggers import system_logger_write, data_logger_write
from data_base import insert_data

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
    str = "Selected: "
    str += coms_arr[0]
    system_logger_write(str)
    del str
    ser.open()


def write_parametrs(duration, borehole_opn, borehole_cls, before_time):
    write_arduino(duration)
    write_arduino(borehole_opn)
    write_arduino(borehole_cls)
    write_arduino(before_time)


def write_arduino(message):
    global ser
    ser.write(message)


def start_engine():
    system_logger_write("Start engine")
    write_arduino(b'f')



def read_arduino(duration, borehole_opn, borehole_cls, before_time, status):
    global ser
    global test_id
    test_id += 1
    log_data = str(duration) + " " + str(borehole_opn) + " " + \
    str(borehole_cls) + " " + str(before_time) + " " + str(status) 
    
    write_parametrs(duration, borehole_opn, borehole_cls, before_time)

    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').rstrip()
            data = list(data.split())

            if data == "stop":
                break

            for i in range(len(data)):
                log_data += data[i] + " "

            insert_data(duration, borehole_opn, borehole_cls, before_time, status, \
            int(data[0]), float(data[1]), float(data[2]), float(data[3]), float(data[4]), float(data[5]), float(data[6]), \
            float(data[7]))

            data_logger_write(log_data, test_id)


def stop_engine():
    system_logger_write("Engine stop")
    write_arduino("s")


def test():
    global test_id
    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8').rstrip()
        data = list(data.split())


        log_data = "22" + " " + "55" + " " + \
        "55" + " " + "44" + " " + "65"

        for i in range(len(data)):
                    log_data += data[i] + " "

        data_logger_write(log_data, test_id)

