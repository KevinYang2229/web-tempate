import Joi from 'joi'

const validateLogin = (req, res, next) => {
  const { username, password } = req.body

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  })

  const { error } = schema.validate({ username, password })

  if (error) {
    res.statusCode = 400
    return next(error)
  }
  next()
}

export { validateLogin }
