import React from 'react'
import { useHref } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Router, Route, browserHistory } from 'react-router';


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

  return (
    <div className="SignUp" style={styles.SignUp}>
      <h1 style={styles.h1}>
        Вход
      </h1>
      <input className="formPass" style={styles.formPass} placeholder="Пароль" type="password"></input>
      <button className="btnSign" id="btnSign" onMouseEnter={handleMouseEnter} style={styles.btnSign}>
        <Link className="btnSign1" id="btnSign1" style={styles.btnSign1} to='/list-tests'>
          Вход
        </Link>
      </button>

    </div>
  );
}

export default SignUp;