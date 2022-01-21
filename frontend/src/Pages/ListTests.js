import React from 'react'
import { useState, useEffect } from 'react'
import TestItem from '../TestItem'
import Test from '../Test'
import Context from '../Context'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Link } from "react-router-dom"


function ListTests() {


    let [state, setState] = useState({})

    
    useEffect(()=> {
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
                <h1 style={styles.h1}>Двигатель для <span className="part_title" style={styles.part_title}>наноспутника </span></h1>
                <button style={styles.btnCreateTest}>
                    <Link to='/create-test' style={styles.createTestTitle}>Создать тест</Link>
                </button>

            </header>

            {tests.length ? <Test tests={tests} /> : <p style={styles.h1}>Тестов нет</p>}
        </div>

    );

}

export default ListTests;