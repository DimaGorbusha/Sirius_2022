import React from 'react'
import { Link } from "react-router-dom"

function CreateTest() {


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
            color: '#F2901D',
            textDecoration: 'none'
        },

        header: {
            display: 'flex',
            alignItems: 'baseline',

        },

        input_data: {
            height: '50px',
            width: '100vw',
            maxWidth: '250px',
            borderStyle: 'solid',
            borderRadius: '75px',
            borderColor: 'black',
            borderWidth: '2px',
            paddingLeft: '15px',
            marginTop: '10px'
        },
        containerID: {
            marginLeft: '90px',
            marginTop: '20px',
            padding: '0px',


        },
        allID: {
            display: 'flex',
            width: 'auto',
            flexFlow:'wrap'
        },
        spanStart: {
            fontFamily: 'Montserrat-Medium',
            textColor: 'white',
            color: 'white',
            textDecoration: 'none'
        },
        btn_start: {
            backgroundColor: '#4DD15A',
            borderRadius: '75px',
            fontFamily: 'Montserrat-Regular',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'white',
            fontSize: '2vw',
            width: '20vw',
            height: '60px',
            marginTop: '25px',
            textColor: 'white',
            textDecoration: 'none',
            marginLeft: '90px'

        },

    }
    let lastIndex = tests.length

    const link = "/test-detail/" + (lastIndex + 1).toString()

    return (
        <div>
            <header className='wrapper' style={styles.header}>
                <h1 style={styles.h1}>Двигатель для <span className="part_title" style={styles.part_title}>
                    <Link style={styles.part_title} to='/list-tests'>наноспутника</Link>
                </span>
                </h1>
            </header>
            <div style={styles.allID}>
                <div>
                    <div style={styles.containerID}>
                        <h1>Продолжительность</h1>
                        <input style={styles.input_data} placeholder="Введите число" type="number" ></input>
                        <span style={{ marginLeft: '1em' }}>С</span>
                    </div>
                    <div style={styles.containerID}>
                        <h1>Скважность</h1>
                        <input style={styles.input_data} placeholder="Введите число" type="number" ></input>
                        <span style={{ marginLeft: '1em' }}>С</span>
                    </div>
                </div>

                <div>
                    <div style={styles.containerID}>
                        <h1>Время предпускового нагрева</h1>
                        <input style={styles.input_data} placeholder="Введите число" type="number" ></input>
                        <span style={{ marginLeft: '1em' }}>C</span>
                    </div>
                    <div style={styles.containerID}>
                        <h1>Период импульсного режима работы</h1>
                        <input style={styles.input_data} placeholder="Введите число" type="number" ></input>
                        <span style={{ marginLeft: '1em' }}>C</span>
                    </div>
                </div>


            </div>
            <button id="btnControl" className="btnControl" style={styles.btn_start}>
                <span >
                    <Link style={styles.spanStart} to={link}>
                        Старт
                    </Link>
                </span>
            </button>


        </div>
    )
}

export default CreateTest