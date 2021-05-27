import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
/* import { Link } from 'react-router-dom' */
import styled from 'styled-components/macro'


const SecretPage = () => {

  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  return (
    <Main>
      <Title>Welcome in!</Title>
    </Main>
  )
}

export default SecretPage

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 48px;
`