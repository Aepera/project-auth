import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Signup from '../components/Signup'
import Button from '../components/Button'

const SignupPage = () => {
  return (
    <Main>
      <Signup />
      <Link to='/signin'>
        <Button
          text='BACK TO LOG IN'
        />
      </Link>
    </Main>
  )
}

export default SignupPage

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ff7b54;
  height: 100vh;
  width: 100%;
`