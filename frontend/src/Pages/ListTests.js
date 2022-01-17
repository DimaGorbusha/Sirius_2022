import React from 'react'
import TestItem from '../TestItem'
import Test from '../Test'
import Context from '../Context'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Link } from "react-router-dom"


function ListTests() {

    let tests = [
        {
            id: 1,
            is_successfull: true,
            duration: 20,
            duty_cycle: 10,
            preheat_time: 40,
            pulse_period: 50

        },
        {
            id: 2,
            is_successfull: true,
            duration: 60,
            duty_cycle: 70,
            preheat_time: 46,
            pulse_period: 23
        },
        {
            id: 3,
            is_successfull: true,
            duration: 78,
            duty_cycle: 234,
            preheat_time: 234,
            pulse_period: 45
        },
        {
            id: 4,
            is_successfull: false,
            duration: 46,
            duty_cycle: 75,
            preheat_time: 23,
            pulse_period: 79
        }
    ];

    const styles = {
        h1: {
            marginLeft: '90px',
            marginTop: '50px',
            marginBottom: '20px'
        },
        part_title: {
            color: '#F2901D'
        },
        btnCreateTest: {
            marginLeft: 'auto',
            marginRight: '90px',
            backgroundColor: '#F2901D',
            borderRadius: '75px',
            fontFamily: 'Montserrat-Medium',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'white',
            fontSize: '2vw',
            width: '20vw',
            height: '2em',
            marginTop: '15px',
            textColor: 'white',
            textDecoration: 'none'
        },
        header: {
            display: 'flex',
            alignItems: 'baseline',

        },
        createTestTitle: {
            textDecoration: 'none',
            textColor: 'white',
            color: 'white',
            fontFamily: 'Montserrat-Medium'
        }
    }


    return (
        <div>
            <header className='wrapper' style={styles.header}>
                <h1 style={styles.h1}>Двигатель для <span className="part_title" style={styles.part_title}>наноспутника</span></h1>
                <button style={styles.btnCreateTest}>
                    <Link to='/create-test' style={styles.createTestTitle}>Создать тест</Link>
                </button>
            </header>

            {tests.length ? <Test tests={tests} /> : <p>Тестов нет</p>}
        </div>

    );

}

export default ListTests;
