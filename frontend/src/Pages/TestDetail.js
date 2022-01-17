import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import ListTests from './ListTests'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


function TestDetail() {

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
            height: 'minHeight',
            marginTop: '15px',
            textColor: 'white',
            textDecoration: 'none'
        }

    }

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
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            pointStart: 1,
            name: 'Напряжение'
        },
        {
            data: [25, 546, 84, 165, 648, 23, 78787],
            pointStart: 1,
            name: 'Температура 1'
        },
        {
            data: [13, 30, 40, 397, 94, 277, 155, 276],
            pointStart: 1,
            name: 'Температура 2'
        },
        {
            data: [1, 30, 4, 97, 94, 27, 55, 76],
            pointStart: 1,
            name: 'Температура 3'
        },
        {
            data: [91, 493, 90, 269, 34, 370, 442, 294],
            pointStart: 1,
            name: 'Тяга'
        },
        {
            data: [9, 93, 9, 69, 34, 70, 42, 24],
            pointStart: 1,
            name: 'Скорость'
        },
        {
            data: [32, 33, 24, 24, 22, 32, 89, 20],
            pointStart: 1,
            name: 'Ток клапана'
        },
        {
            data: [136, 398, 70, 305, 428, 181, 387, 422],
            pointStart: 1,
            name: 'Давление'
        },
        {
            data: [36, 98, 70, 35, 48, 81, 87, 42],
            pointStart: 1,
            name: 'Ток нагревателя'
        }
        ]
    }

    let current_index = Number(window.location.pathname.toString().replace('/test-detail/', '')) - 1;



    function showDetail(index) {
        let current_res = tests[index];
        return current_res;
    }

    let duration = "Нет данных"
    let duty_cycle = "Нет данных"
    let preheat_time = "Нет данных"
    let [pulse_period, setPulse_period ] = useState('Нет данных')
    let is_successfull = "Нет данных"
    


    if (current_index < tests.length) {

        duration = showDetail(current_index).duration.toString()
        duty_cycle = showDetail(current_index).duty_cycle.toString()
        preheat_time = showDetail(current_index).preheat_time.toString()
        //pulse_period = showDetail(current_index).pulse_period.toString()
        //setPulse_period(data)
        is_successfull = showDetail(current_index).is_successfull

    }


    let status_success = 'Неизвестно';
    if (is_successfull == true) {
        status_success = 'Успешен';
    } else if (is_successfull == false) {
        status_success = 'Прерван';
    }

    let [color, setColor] = useState('#4DD15A');
    let [textColor, setTextColor] = useState('white');
    let [text, setText] = useState('Старт');

    const changeColor = () => {
        if (color == "#4DD15A") {
            setColor("red");
            setText("Стоп");
        } else {
            setColor("#4DD15A");
            setText("Старт");
        }
    }

    function liveProcess() {
        
        setInterval(() => {
            let data = new Date().getSeconds().toString()
            setPulse_period(data)  //тест чтобы проверить как обновляется
        }, 1000)
    }

    liveProcess()


    return (
        <div>
            <header>
                <h1
                    style={styles.h1}>Двигатель для <span className="part_title" style={styles.part_title}>
                        <Link style={styles.part_title} to='/list-tests'>наноспутника</Link>
                    </span>
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
                    <button style={styles.btn_logs}><span style={styles.spanStart}>Скачать лог</span></button>
                </div>
                <div style={styles.graph}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>

            </div>
        </div>

    );
}


export default TestDetail;