const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

userRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});
  
userRouter.post('/', async (request, response) => {
    const body = request.body;
    const salt = bcrypt.genSaltSync(10);
    console.log(body.password);
    return false;
    const passwordHash = bcrypt.hashSync(body.password, salt)

    const user = new User(request.body);
    const result = await user.save();
    response.status(201).json(result);    
});

userRouter.delete('/:id', async (request, response) => {
  const result = await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = userRouter;