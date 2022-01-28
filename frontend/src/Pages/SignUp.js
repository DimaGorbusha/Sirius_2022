import React from 'react'
import { useHref } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useNavigate as UseNavigate } from 'react-router-dom'
import { Router, Route, browserHistory } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios'

const SignUp = () => {

  const styles = {
    h1: {
      marginTop: '15%'
    },
    formPass: {
      height: '50px',
      width: '100vw',
      maxWidth: '500px',
      borderStyle: 'solid',
      borderRadius: '75px',
      borderColor: 'black',
      borderWidth: '1px',
      paddingLeft: '15px'
    },
    SignUp: {
      display: 'table-caption',
      marginLeft: '50px',
      marginRight: '50px',
      marginTop: '25%'
    },
    btnSign: {
      backgroundColor: '#F2901D',
      borderRadius: '75px',
      fontFamily: 'Montserrat-Bold',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'white',
      fontSize: 'small',
      width: '140px',
      height: '50px',
      marginTop: '15px',
      textColor: 'white',
      textDecoration: 'none'
    },
    btnSign1: {
      textDecoration: 'none',
      color: 'black',
      fontSize: 'small',
      fontFamily: 'Montserrat-Bold'
    }

  }

  const handleMouseEnter = e => {
    e.target.style.textColor = "white"
  }

  const [password, setPassword] = useState('');
  let isLoggedIn = false
  const api = axios.create({
    baseURL: 'http://localhost:5000/'
  })

  const sendPass = async () => {
    let result = await api.post('/sign-up', {
      password: password
    })
    console.log(result)
  }

  const getStatus = async () => {
    try {
      let data = await api.get('/sign-up').then(({ data }) => data);
      isLoggedIn = data.isLogged
    } catch (error) {
      console.log(error)
    }

  }
  let navigate = UseNavigate()

  const checkLogin = () => {
    if (password=='') {
      isLoggedIn = false
      navigate('/list-tests', isLoggedIn)
    } else {
      sendPass()
      getStatus()
      if (isLoggedIn == true) {
        navigate('/list-tests', isLoggedIn)
      } else {
        alert('Неверный пароль')
      }
    }
  }

  return (
    <div className="SignUp" style={styles.SignUp}>
      <h1 style={styles.h1}>
        Вход
      </h1>
      <input name="formPass" style={styles.formPass} placeholder="Пароль" type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
      <button className="btnSign" id="btnSign" type="submit" onMouseEnter={handleMouseEnter} style={styles.btnSign} onClick={checkLogin}>
        <span style={styles.btnSign1}>Вход</span>
      </button>
    </div>
  );
}

export default SignUp;