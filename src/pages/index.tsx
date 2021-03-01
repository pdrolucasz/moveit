import { useState, ChangeEvent, useContext } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import Cookies from 'js-cookie'

import styles from '../styles/pages/Login.module.css'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
    const { login } = useContext(AuthContext)
    const [userName, setUserName] = useState('')

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    async function handleLogin() {
        if(!userName) {
            return
        }

        const user = {
            userName,
            name: 'Pedro',
            avatarUrl: `https://github.com/${userName}.png`
        }
        Cookies.set('user', user)

        login(user)

        Router.push('/home')
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Login | move.it</title>
            </Head>
            <div />
            <div>
                <img src="/logo.svg" alt="Logo"/>

                <h1>Bem-vindo</h1>

                <p>
                    <img src="/github.svg" alt="Githun logo"/>

                    Faça login com seu Github para começar
                </p>
                
                <div>
                    <input
                        type="text"
                        placeholder="Digite seu username"
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        onClick={handleLogin}
                        disabled={userName.length === 0}
                    >
                        <img src="/icons/arrow-right.svg"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { user } = ctx.req.cookies

    if(user) {
            return {
                redirect: {
                destination: '/home',
                permanent: false,
            },
        }
    }

    return {
        props: {
            user: user ?? "",
        }
    }
}
