import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SecretPage from './pages/SecretPage'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path='/' exact component={SecretPage} />
          <Route path='/signin' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
