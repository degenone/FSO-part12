const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')
const { Todo } = require('../mongo');

let getAsync
let setAsync

const initializeRedis = async () => {
  const added_todos = await Todo.countDocuments({});
  await setAsync('added_todos', added_todos);
};

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)
  initializeRedis();
}

module.exports = {
  getAsync,
  setAsync
}