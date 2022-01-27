import React from 'react'
import TestItem from './TestItem'
import PropTypes from 'prop-types'




function Test(props) {
    return (
        <div>
            {
                props.tests.map((test, index) => {
                    return <TestItem test={test} key={test.id} index={index} is_successfull={test.status} duration={test.duration} duty_cycle={test.duty_cycle} preheat_time={test.preheat_time} pulse_period={test.pulse_period} />
                })
            }
        </div>
    );
}


export default Test;