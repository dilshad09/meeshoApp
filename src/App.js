import React, { useState } from 'react'
import { authentication } from './firebase'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
export default function App() {

  const countryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState(countryCode)
  const [exandForm, setExpandForm] = useState(false)
  const [OTP, setOTP] = useState("")
  const generateRecaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        
      }
    },  authentication);
  }
  const requestOTP = (e)=>{
    e.preventDefault()
    if(phoneNumber.length >=12){
      console.log(phoneNumber)
      setExpandForm(true);
      generateRecaptcha()
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        console.log("OTP has been sent on this number")
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error)
      });
    }
  }

  const verifyOTP = (e)=>{
    e.preventDefault()
    // let otp = e.target.value
    // setOTP(otp)
    if(OTP.length ===6){
      alert("SignIn successfull")
      console.log("dilsad")
    }
  }
  return (
    <div>
        return <div>
        <form onSubmit={requestOTP}>
          <div id='sign-in-button'></div>
            <input type="mobile" name="mobile" placeholder="enter number" value={phoneNumber} onChange={(e)=>{
              setPhoneNumber(e.target.value)
            }}/>
            <button>Submit</button>
        </form>
        <form onSubmit={verifyOTP}>
            <input type="number" name="otp" placeholder="enter otp" value={OTP} onChange={(e)=>setOTP(e.target.value)}/>
            <button>Submit</button>
        </form>
    </div>
    </div>
  )
}
