const logger = require('./logger');
// const morgan = require('morgan');

// const requestMorgan = (morgan((tokens, request, response) => {
//   return [
//     tokens.method(request, response),
//     tokens.url(request, response),
//     tokens.status(request, response), ' ',
//     tokens.res(request, response, 'content-length'), ' - ',
//     tokens['response-time'](request, response), 'ms ',
//     tokens.method(request, response) === 'POST'
//     ?`${request.headers['content-type']} {name : ${request.body['name']}, number :${request.body['number']}}`
//     :''
//   ]. join('');
// }));

const requestLogger = (request, response, next) => {
  logger.info('Content Type:', request.headers['content-type']);
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  logger.info(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'This Person Was already deleted or the id is malformated' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'ivalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler
};