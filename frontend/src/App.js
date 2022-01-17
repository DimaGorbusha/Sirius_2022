import React from 'react'
import TestItem from './TestItem'
import Test from './Test'
import Context from './Context'
import 'bootstrap/dist/css/bootstrap.css'
import CreateTest from './Pages/CreateTest'
//import { Router, Route } from 'react-router-dom'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './Pages/';
import SignUp from './Pages/SignUp';
import ListTests from './Pages/ListTests'
import TestDetail from './Pages/TestDetail'

function App() {


    return (
        <Router>
            <Routes>
                <Route exact path='/' exact element={<SignUp />} />
                <Route path='/list-tests' element={<ListTests />} />
                <Route path='/test-detail' element={<TestDetail />} />
                <Route path='/test-detail/:test_id' element={<TestDetail />} />
                <Route path='/create-test' element={<CreateTest />} />
            </Routes>
        </Router>

    );

}

export default App;