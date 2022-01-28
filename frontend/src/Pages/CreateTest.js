import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { BrowserRouter as Redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateTest() {


    let navigate = useNavigate()
    const [is_login, setIsLogin] = useState(true)



    function check(isLogin) {
        if (isLogin == false) {
            navigate("/list-tests")
        }
    }

    //test upd
    function liveProcess() {

        setInterval(() => {
            setIsLogin(true)
            check(is_login)
        }, 0)
    }

    liveProcess()





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


    let [state, setState] = useState({})


    useEffect(() => {
        fetch("http://127.0.0.1:5000/list_tests", {
            method: 'GET'
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
        }).then(data => {
            setState(data)
        })
            .then(error => console.log(error))
    }, [])

    let tests = [];
    tests = state

    let lastIndex = tests.length
    if (lastIndex == null) {
        lastIndex = 0
    }

    const link = "/test-detail/" + (lastIndex + 1).toString()

    const [duration, setDuration] = useState(30);
    const [preheat_time, setPreheatTime] = useState(40);
    const [duty_cycle, setDutyCycle] = useState(50);
    const [pulse_period, setPulsePeriod] = useState(60);

    const preset = { duration, preheat_time, duty_cycle, pulse_period };

    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    })

    const createData = async () => {
        let res = await api.post('/create_test', {
            duration: duration,
            preheat_time: preheat_time,
            duty_cycle: duty_cycle,
            pulse_period: pulse_period
        })
        console.log(res)
    }


    const sendData = () => {
        //POST-запрос



        // fetch("https://localhost:5000/create-test", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(preset)
        // }).then(() => {
        //     console.log("sent successfull")
        // })

    }


    //let [isLoggedIn, setIsLoggedIn] = useState(false)
    //const [display, setDisplay] = useState('block')


    /*
    function addRes() {
        let newRes = {
            duration: duration,
            preheat_time: preheat_time,
            duty_cycle: duty_cycle,
            pulse_period: pulse_period
        };
        return newRes
    }
    */


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
                        <input name="duration" style={styles.input_data} method="POST" placeholder="Введите число" type="number" value={duration} onChange={(event) => setDuration(event.target.value)}></input>
                        <span style={{ marginLeft: '1em' }}>С</span>
                    </div>
                    <div style={styles.containerID}>
                        <h1>Период открытого клапана</h1>
                        <input name="borehole_opn" style={styles.input_data} placeholder="Введите число" type="number" value={duty_cycle} onChange={(event) => setDutyCycle(event.target.value)} ></input>
                        <span style={{ marginLeft: '1em' }}>С</span>
                    </div>
                </div>

                <div>
                    <div style={styles.containerID}>
                        <h1>Время предпускового нагрева</h1>
                        <input name="heating_time" style={styles.input_data} placeholder="Введите число" type="number" value={preheat_time} onChange={(event) => setPreheatTime(event.target.value)}></input>
                        <span style={{ marginLeft: '1em' }}>C</span>
                    </div>
                    <div style={styles.containerID}>
                        <h1>Период закрытого клапана</h1>
                        <input name="borehole_cls" style={styles.input_data} placeholder="Введите число" type="number" value={pulse_period} onChange={(event) => setPulsePeriod(event.target.value)}></input>
                        <span style={{ marginLeft: '1em' }}>C</span>
                    </div>
                </div>


            </div>
            <Link to={link} >
                <button id="btnControl" className="btnControl" style={styles.btn_start} type="submit" onClick={createData} method="POST">
                    <span style={styles.spanStart}>
                        Создать
                    </span>

                </button>
            </Link>



        </div>
    )
}

export default CreateTest