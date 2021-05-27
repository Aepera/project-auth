import React from 'react'
import styled from 'styled-components/macro'

const Button = ({ text }) => {
  return (
    <ButtonOne>
      {text}
    </ButtonOne>
  )
}

export default Button

const ButtonOne = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: #B4D5F0;
  color: ;
  box-shadow: 0px 8px 15px rgba(12, 20, 80, 0.5);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`