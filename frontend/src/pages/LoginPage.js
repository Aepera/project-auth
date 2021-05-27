import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Login from '../components/Login'
import Button from '../components/Button'

const LoginPage = () => {
  return (
    <Main>
      <Login />
      <Link to='/signup'>
        <Button
          text='SIGN UP HERE'
        />
      </Link>
    </Main>
  )
}

export default LoginPage

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ff7b54;
  height: 100vh;
  width: 100%;
`
