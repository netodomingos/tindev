import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import api from '../services/api.js'

import Logo from '../assets/logo.svg'
import Like from '../assets/like.svg'
import Dislike from '../assets/dislike.svg'
import itsaMatch from '../assets/itsamatch.png'
import './Main.css'

export default function Main({ match }) {
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/dev', {
                headers: {
                    user: match.params.id
                }
            })

            setUsers(response.data)
        }

        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/dev/${id}/likes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/dev/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id))
    }

    return (
        <div className='main-container'>
            <Link to='/'>
                <img src={Logo} alt='Tindev' />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.avatar} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className='main-buttons'>
                                <button type='button'
                                    onClick={() => handleDislike(user._id)}>
                                    <img src={Dislike} />
                                </button>
                                <button type='button'
                                    onClick={() => handleLike(user._id)}>
                                    <img src={Like} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className='empty'>
                        <h1>Acabou :(</h1>
                    </div>
                )}
            {matchDev && (
                <div className='match-container'>
                    <img src={itsaMatch} alt='its a match' />
                    <img className='avatar' src={matchDev.avatar} />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button type='button' onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            )}
        </div>
    )
}