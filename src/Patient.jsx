import './App.css';
import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const myAPI = 'apie8c58eaa'
const path = '/patients'; 

const Patient = () => {
    const [patients, setpatients] = useState([])
    const [input, setInput] = useState("")

    //Function to fetch from our backend and update patients array
    function getpatient(e) {
      let patientId = e.input
      API.get(myAPI, path + "/" + patientId)
         .then(response => {
           console.log(response)
           let newpatients = [...patients]
           newpatients.push(response)
           setpatients(newpatients)
  
         })
         .catch(error => {
           console.log(error)
         })
    }
  return (
    <div className="App">
    <h1>React App</h1>
    <div>
        <input placeholder="patient id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
    </div>
    <br/>
    <button onClick={() => getpatient({input})}>Get patient From Backend</button>

    <h2 style={{visibility: patients.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
    {
     patients.map((thispatient, index) => {
       return (
      <div key={thispatient.patientId}>
        <span><b>patientId:</b> {thispatient.patientId} - <b>patientName</b>: {thispatient.patientName}</span>
      </div>)
     })
    }
  </div>
  )
}

export default Patient