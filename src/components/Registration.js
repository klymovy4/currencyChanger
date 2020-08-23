import React, { useState, useEffect } from 'react'
import './registration.scss'
import cn from 'classnames/bind'

export const Registration = () => {
    const [log, setLog] = useState(false)

    const styleUp = ['signup']
    const styleIn = ['login']
    if (log) {
        styleUp.push('slide-up')
    }else{
        styleIn.push('slide-up')
    }

    const changeLogin = () => {
        setLog(!log)
    }
    return (
        <div className='register-form'>
            <div className="form-structor">
                <div className={cn(styleUp, {[styleUp]: log})}>
                    <h2 className="form-title" onClick={changeLogin} id="signup"><span>or</span>Sign up</h2>
                    <div className="form-holder">
                        <input type="text" className="input" placeholder="Name" />
                        <input type="email" className="input" placeholder="Email" />
                        <input type="password" className="input" placeholder="Password" />
                    </div>
                    <button className="submit-btn">Sign up</button>
                </div>
                <div className={cn(styleIn, {[styleIn]: !log})}>
                    <div className="center">
                        <h2 className="form-title" onClick={changeLogin} id="login"><span>or</span>Log in</h2>
                        <div className="form-holder">
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Password" />
                        </div>
                        <button className="submit-btn" >Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}