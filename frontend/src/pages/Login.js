import React, { useState } from 'react'

import api from '../services/api.js'
import Logo from '../assets/logo.svg'
import './Login.css'

export default function Login({ history }) {
    const [username, setUsername] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await api.post('/dev', {
            username,
        })

        const { _id } = response.data

        history.push(`/dev/${_id}`)
    }


    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img
                    src={Logo}
                    alt='Tindev' />

                <input
                    placeholder='Digite seu usuário no Github'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type='submit'>Entrar</button>
            </form>
        </div>
    )
}

