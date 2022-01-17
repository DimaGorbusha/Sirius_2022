import logging

rec_data_logger = logging.getLogger("RECIEVED")
system_logger = logging.getLogger("SYSTEM")

rec_data_logger.setLevel(logging.INFO)
system_logger.setLevel(logging.INFO)

logger_system_fh = logging.FileHandler("system_log.log")
logger_data_fh = logging.FileHandler("data_log.log")

logger_formatter = logging.Formatter('%(asctime)s - %(name)s - %(message)s')

logger_system_fh.setFormatter(logger_formatter)
logger_data_fh.setFormatter(logger_formatter)

rec_data_logger.addHandler(logger_data_fh)
system_logger.addHandler(logger_system_fh)


def system_logger_write(message, number):
    system_logger.info(message)


def data_logger_write(message, number):
    data = "Test № " + str(number) + ": " + message
    rec_data_logger.info(data)
    data = ""

