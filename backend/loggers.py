import logging

rec_data_logger = logging.getLogger("RECIEVED")
system_logger = logging.getLogger("SYSTEM")

rec_data_logger.setLevel(logging.INFO)
system_logger.setLevel(logging.INFO)
 
logger_system_fh = logging.FileHandler("system_log.log")

logger_formatter = logging.Formatter('%(asctime)s - %(message)s')

logger_system_fh.setFormatter(logger_formatter)
system_logger.addHandler(logger_system_fh)


def system_logger_write(message):
    system_logger.info(message)


def data_logger_write(message, number):
    logger_data_fh = logging.FileHandler("backend/logs/test_data_log{}.log".format(number))
    logger_data_fh.setFormatter(logger_formatter)
    rec_data_logger.addHandler(logger_data_fh)

    data = "Test " + str(number) + ": " + message
    rec_data_logger.info(data)
    data = ""

