import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function CreateTest() {


    let [state, setState] = useState({})


    useEffect(() => {
        fetch("http://127.0.0.1:5000/list_tests", {
            method: 'GET'
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
        }).then(data => {
            setState(data.tests)
        })
            .then(error => console.log(error))
    }, [])

    let tests = [];
    tests = state

    /* 
    //POST-запрос
        fetch('https://mywebsite.com/endpoint/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
    })
    })
    */

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
            flexFlow: 'wrap'
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