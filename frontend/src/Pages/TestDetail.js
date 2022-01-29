import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ListTests from './ListTests'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { server_link } from '../Constants'


function TestDetail() {

    let current_index = Number(window.location.pathname.toString().replace('/test-detail/', '')) - 1;

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
        containerTest: {
            padding: '30px',
            boxSizing: 'border-box',
            width: 'auto',
            height: 'maxHeight',
            borderStyle: 'solid',
            borderRadius: '20px',
            borderWidth: '2px',
            borderColor: 'black',
            marginLeft: '90px',
            marginRight: '90px',
            marginTop: '30px',
            marginBottom: '30px'
        },
        title_Test: {
            padding: '20px'
        },
        title_status: {
            marginLeft: 'auto',
            marginRight: '10px',
            padding: '20px'
        },
        title_success: {
            color: '#F2901D'
        },
        titles: {
            display: 'flex'
        },
        sensors_info_rect: {
            display: 'table',
            marginLeft: '20px'
        },
        sensors_titles: {
            fontFamily: 'Montserrat-Medium',
            marginBottom: '15px'
        },
        graph: {
            marginTop: '30px'
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
            marginTop: '15px',
            textColor: 'white',
            textDecoration: 'none',
            marginLeft: '20px'
        },
        spanStart: {
            textDecoration: 'none',
            fontFamily: 'Montserrat-Medium',
            textColor: 'white',
            color: 'white'
        },
        containerBtn: {
            display: 'flex'
        },
        btn_logs: {
            marginLeft: 'auto',
            marginRight: '20px',
            backgroundColor: '#F2901D',
            borderRadius: '75px',
            fontFamily: 'Montserrat-Regular',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'white',
            fontSize: '2vw',
            width: '20vw',
            height: '60px',
            marginTop: '15px',
            textColor: 'white',
            textDecoration: 'none'
        }

    }

    let [data_tests, setDataTests] = useState({})
    //let [isLoggedIn, setIsLoggedIn] = useState(false)

    const api = axios.create({
        baseURL: server_link
    })

    const switchState = async () => {
        let res = await api.post('/launch-test', {
            duration: duration,
            preheat_time: preheat_time,
            duty_cycle: duty_cycle,
            pulse_period: pulse_period,
            status: null
        })
        console.log(res)
    }

    let link_ = server_link + "/test-detail/" + (current_index + 1).toString()

    useEffect(() => {
        fetch(link_, {
            method: 'GET'
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
        }).then(data => {
            setDataTests(data)
        })
            .then(error => console.log(error))
    }, [])

    let tests = data_tests;
    const [display, setDisplay] = useState('block')

    function checkLoggin(is_login) {
        if (is_login == true) {
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }
    //checkLoggin(isLoggedIn)

    let arr_valve = []
    let arr_temp1 = []
    let arr_temp2 = []
    let arr_temp3 = []
    let arr_tyaga = []
    let arr_speed = []
    let arr_akb_klap = []
    let arr_press = []
    let arr_amper_nagrev = []

    const options = {
        title: {
            text: 'График'
        },

        xAxis: {
            tickInterval: 1,
            type: 'logarithmic',
            accessibility: {
                rangeDescription: 'Range: 1 to 10'
            }
        },

        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0.1,
            accessibility: {
                rangeDescription: 'Range: 0.1 to 1000'
            }
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'время : {point.x} секунд, показания : {point.y}'
        },

        series: [{
            data: arr_valve,
            pointStart: 1,
            name: 'Напряжение'
        },
        {
            data: arr_temp1,
            pointStart: 1,
            name: 'Температура 1'
        },
        {
            data: arr_temp2,
            pointStart: 1,
            name: 'Температура 2'
        },
        {
            data: arr_temp3,
            pointStart: 1,
            name: 'Температура 3'
        },
        {
            data: arr_tyaga,
            pointStart: 1,
            name: 'Тяга'
        },
        {
            data: arr_speed,
            pointStart: 1,
            name: 'Скорость'
        },
        {
            data: arr_akb_klap,
            pointStart: 1,
            name: 'Ток клапана'
        },
        {
            data: arr_press,
            pointStart: 1,
            name: 'Давление'
        },
        {
            data: arr_amper_nagrev,
            pointStart: 1,
            name: 'Ток нагревателя'
        }
        ]
    }




    /*
    function showDetail(index) {
        let current_res = tests[index];
        return current_res;
    }
    */

    let duration = "Нет данных"
    let duty_cycle = "Нет данных"
    let preheat_time = "Нет данных"
    let pulse_period = 'Нет данных'
    //let is_successfull = "Нет данных"
    let status_success = 'Неизвестно'



    try {
        duration = tests.duration.toString() ?? "Нет данных"
        duty_cycle = tests.brh_opn.toString() ?? "Нет данных"
        preheat_time = tests.before_time.toString() ?? "Нет данных"
        pulse_period = tests.brh_cls.toString() ?? "Нет данных"
        if (tests.status == true && tests.status != null) {
            status_success = 'Успешно'
        } else if (tests.status == false && tests.status != null) {
            status_success = 'Неудачно'
        } else {
            status_success = 'Неизвестно'
        }
    } catch (e) {
        duration = "Нет данных"
        duty_cycle = "Нет данных"
        preheat_time = "Нет данных"
        status_success = "Нет данных (ошибка)"


    }

    let [color, setColor] = useState('#4DD15A');
    let [textColor, setTextColor] = useState('white');
    let [text, setText] = useState('Старт');

    const changeColor = () => {
        if (color == "#4DD15A") { //если старт
            setColor("red");
            setText("Стоп");
            switchState()
        } else { //если стоп
            setColor("#4DD15A");
            setText("Старт");

        }

    }


    const updateData = async () => {
        
    }
    //test upd
    function liveProcess() {

        setInterval(() => {
            // let data = new Date().getSeconds().toString()
            // pulse_period = data//тест чтобы проверить как обновляется


        }, 1000)
    }

    //liveProcess()
    let download_log = "/logs/data_log" + (current_index + 1).toString() + ".log"



    return (
        <div>
            <header>
                <h1 style={styles.h1}>Двигатель для <span className="part_title" style={styles.part_title}>
                    <Link style={styles.part_title} to='/list-tests'>наноспутника</Link> </span>
                </h1>
            </header>
            <div className="containerTest" style={styles.containerTest}>
                <div className="titles" style={styles.titles}>
                    <h1 style={styles.title_Test}>Тест № {current_index + 1}</h1>
                    <h1 className="title_status" style={styles.title_status}>Статус: <span style={styles.title_success}>{status_success}</span></h1>
                </div>
                <div className="sensors_info_rect" style={styles.sensors_info_rect}>
                    <h2 className="sensors_titles" style={styles.sensors_titles}>Продолжительность: {duration}</h2>
                    <h2 className="sensors_titles" style={styles.sensors_titles}>Скважность: {duty_cycle} </h2>
                    <h2 className="sensors_titles" style={styles.sensors_titles}>Время предпускового нагрева: {preheat_time}</h2>
                    <h2 className="sensors_titles" style={styles.sensors_titles}>Период импульсного режима работы: {pulse_period}</h2>
                </div>
                <div style={styles.containerBtn}>
                    <button id="btnControl" className="btnControl" style={{
                        display: display,
                        background: color,
                        color: textColor,
                        borderRadius: '75px',
                        fontFamily: 'Montserrat-Regular',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: 'white',
                        fontSize: '2vw',
                        width: '20vw',
                        height: '60px',
                        marginTop: '15px',
                        textDecoration: 'none',
                        marginLeft: '20px'
                    }}
                        onClick={changeColor}>
                        <span style={styles.spanStart} >{text}</span></button>
                    <a style={{
                        marginLeft: 'auto',
                        height: '60px'
                    }} href={download_log} download><button style={styles.btn_logs} ><span style={styles.spanStart} >Скачать лог</span></button></a>
                </div>
                <div style={styles.graph}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>

            </div>
        </div>

    );
}


export default TestDetail;