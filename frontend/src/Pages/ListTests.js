import React from 'react'
import { useState, useEffect } from 'react'
import TestItem from '../TestItem'
import Test from '../Test'
import Context from '../Context'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import { server_link } from '../Constants'

function ListTests() {


    let [state, setState] = useState({})
    const link_list = server_link + "/list_tests"

    useEffect(() => {
        fetch(link_list, {
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

    //let [isLoggedIn, setIsLoggedIn] = useState(false)
    const [display, setDisplay] = useState('block')
    function checkLoggin(is_login) {
        if (is_login == true) {
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }
    //checkLoggin(isLoggedIn)




    const styles = {
        h1: {
            marginLeft: '90px',
            marginTop: '50px',
            marginBottom: '20px'
        },
        part_title: {
            color: '#F2901D'
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
                <Link to='/create-test' style={{
                    textDecoration: 'none',
                    marginLeft: 'auto'
                }}>
                    <button style={{
                        textDecoration: 'none',
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
                        textDecoration: 'none',
                        display: display
                    }}><span style={styles.createTestTitle}>Создать тест</span>
                    </button>
                </Link>

            </header>

            {tests.length ? <Test tests={tests} /> : <p style={styles.h1}>Тестов нет</p>}
        </div>

    );

}

export default ListTests;