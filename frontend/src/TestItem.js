import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const styles = {
    test_item: {

        boxSizing: 'border-box',
        height: '100px',
        width: 'max-width',
        borderRadius: '20px',
        borderWidth: '2px',
        borderColor: 'black',
        display: 'flex',
        borderStyle: 'solid',
        marginLeft: '90px',
        marginRight: '90px',
        marginBottom: '20px'
    },
    title_test: {
        fontSize: '25pt',
        alignSelf: 'center',
        marginLeft: '10px',
        color: 'black',
        textDecoration: 'none'
    },
    title_status: {
        fontSize: '25pt',
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: '10px'
    },
    title_success: {
        color: '#F2901D'
    }
}

function TestItem({ test, index, is_successfull, duration, duty_cycle, preheat_time, pulse_period }) {
    let status_success = 'Неизвестно';
    if (is_successfull == true) {
        status_success = 'Успешен';
    } else if (is_successfull == false) {
        status_success = 'Прерван';
    }

    const link = "/test-detail/" + (index + 1).toString()


    return (
        <div className="test_item" style={styles.test_item}>
            <a className="title_test" style={styles.title_test} href={link}><h1 style={styles.title_test}>
            Тест №{index + 1}
            </h1></a>
            <h1 className="title_status" style={styles.title_status}>Статус <span style={styles.title_success}>{status_success}</span></h1>
        </div>
    );
}

TestItem.propTypes = {
    test: PropTypes.object.isRequired,
    index: PropTypes.number,
    is_successfull: PropTypes.bool
}

export default TestItem;