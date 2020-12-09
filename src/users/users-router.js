/* eslint-disable no-unused-vars */
  
const express = require('express')
const path = require('path')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, user_name, email } = req.body

    for (const field of ['user_name', 'password', 'email'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Form must be filled out`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })
        
        UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              email,
              password: hashedPassword,
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .json({user_name:user.user_name})
              })
          })
      })
      .catch(next)
  })

module.exports = usersRouter