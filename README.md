# Project Auth

The project was to build a backend and a frontend with authentication where a user can sign up and log in. When logged in the user gets access to a "hidden" site, which is not accessible when not logged in.

## The problem

The project consists of two parts, a backend with an API and a React frontend. On the backend we created a user mongoose model with username, password and accesstoken (crypted by crypto) . The two POST endpoints /signup and /signin uses bcrypt and salt to secure and hash the password. To the username we also added min- and maxlength as validation parameters.

On the frontend, a user can fill in a form to login or register, which posts to the API. Once logged in, the user gets an accesstoken in the store which grants access to a "secret page" consisting of hard-coded data. The secret page has a log out button that clears the username and accesstoken and redirects to sign in page.

## View it live


