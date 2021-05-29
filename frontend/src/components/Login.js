import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import Swal from 'sweetalert2'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  },[accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
        } else {
            dispatch(user.actions.setErrors(data))
            Swal.fire(data.message)
        }
      })
      .catch()
  }

  return (
    <Form onSubmit={onFormSubmit}>
    <Title>Log in! </Title>
      <Label
        htmlFor='username'>
          Username
      </Label>
      <Input
        id='username'
        type='text'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Label
        htmlFor='password'>
          Password
      </Label>
      <Input
        id='password'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type='submit'
        onClick={() => setMode('signin')}>
        LOGIN
      </Button>
    </Form>
  )
}

export default Login

const Title = styled.h1`
  font-size: 30px;
  margin: 0px;
  padding: 20px 0;
    @media (min-width: 768px) {
      font-size: 45px;
    }
    @media (min-width: 1025px) {
      font-size: 30px;
    }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #939b62;
  width: 80%;
  padding: 15px 10px;
  border-radius: 10px;
    @media (min-width: 768px) {
      width: 50%;
      padding: 30px 25px;
    }
    @media (min-width: 1025px) {
      width: 20%;
      padding: 30px 25px;
    }
`
const Label = styled.label`
  font-size: 18px;
    @media (min-width: 768px) {
      font-size: 25px;
    }
    @media (min-width: 1025px) {
      font-size: 18px;
    }
`
const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: ;
  box-shadow: 0px 8px 15px rgba(100, 80, 18, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`
const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
`