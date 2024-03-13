const { describe, expect, test, beforeAll, afterAll } = require('@jest/globals')
const request = require('supertest')
const app = require('./testapp')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
})

describe('Profile API', function () {
  let profileID = null

  test('Create profile', async () => {
    const res = await request(app).post('/profiles').send({
      name: 'B Martinez',
      description: 'Bertrand Rudolph Martinez II.',
      mbti: 'ISFJ',
      enneagram: '9w8',
      variant: 'sp/so',
      tritype: 725,
      socionics: 'SEE',
      sloan: 'RCOEN',
      psyche: 'FEVL',
      image: 'https://soulverse.boo.world/images/1.png'
    })

    const { profile } = res.body
    profileID = profile._id

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('profile')
  })

  test('Get profile', async () => {
    const res = await request(app).get(`/profiles/${profileID}`)
    expect(res.statusCode).toBe(200)
  })

  test('Update profile', async () => {
    const res = await request(app).post(`/profiles/${profileID}`).send({
      name: 'C Martinez',
      description: 'Christophorus Alexander Martinez',
      mbti: 'ISFJ',
      enneagram: '9w8',
      variant: 'sp/so',
      tritype: 725,
      socionics: 'SEE',
      sloan: 'RCOEN',
      psyche: 'FEVL',
      image: 'https://soulverse.boo.world/images/1.png'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('profile')
    expect(res.body.profile.name).toEqual('C Martinez')
    expect(res.body.profile._id).toEqual(profileID)
  })
})

describe('User API', function () {
  let userID = null

  test('Create user', async () => {
    const res = await request(app).post('/users').send({
      name: 'A Martinez'
    })

    const { user } = res.body
    userID = user._id

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('user')
  })

  test('Get user', async () => {
    const res = await request(app).get(`/users/${userID}`)
    expect(res.statusCode).toBe(200)
  })

  test('Update user', async () => {
    const res = await request(app).post(`/users/${userID}`).send({
      name: 'B Martinez'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.name).toEqual('B Martinez')
    expect(res.body.user._id).toEqual(userID)
  })
})

describe('Comment API', function () {
  let userID = null
  let profileID = null
  let commentID = null

  test('Create user', async () => {
    const res = await request(app).post('/users').send({
      name: 'A Martinez'
    })

    const { user } = res.body
    userID = user._id

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('user')
  })

  test('Create profile', async () => {
    const res = await request(app).post('/profiles').send({
      name: 'B Martinez',
      description: 'Bertrand Rudolph Martinez II.',
      mbti: 'ISFJ',
      enneagram: '9w8',
      variant: 'sp/so',
      tritype: 725,
      socionics: 'SEE',
      sloan: 'RCOEN',
      psyche: 'FEVL',
      image: 'https://soulverse.boo.world/images/1.png'
    })

    const { profile } = res.body
    profileID = profile._id

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('profile')
  })

  test('Create comment', async () => {
    const res = await request(app).post('/comments').send({
      user: userID,
      profile: profileID,
      title: 'He\'s definitely INTP',
      content: 'I want him to be INTP more than anyone, but he isn\'t',
      mbti: 'INTP',
      enneagram: '1w2',
      zodiac: 'Pisces'
    })

    const { comment } = res.body
    commentID = comment._id

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comment')
  })

  test('Get comment', async () => {
    const res = await request(app).get(`/comments/${commentID}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comment')
  })

  test('Update comment', async () => {
    const res = await request(app).post(`/comments/${commentID}`).send({
      user: userID,
      profile: profileID,
      title: 'Should be INTJ',
      content: 'I want him to be INTJ more than anyone, but he isn\'t',
      mbti: 'INTP',
      enneagram: '1w2',
      zodiac: 'Pisces'
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comment')
    expect(res.body.comment.title).toEqual('Should be INTJ')
    expect(res.body.comment._id).toEqual(commentID)
  })

  test('Like comment', async () => {
    const res = await request(app).post(`/comments/${commentID}/like`).send({
      user: userID
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comment')
    expect(res.body.comment.likes.length).toBeGreaterThan(0)
  })

  test('Dislike comment', async () => {
    const res = await request(app).post(`/comments/${commentID}/like`).send({
      user: userID
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comment')
    expect(res.body.comment.likes.length).toEqual(0)
  })

  test('List comments', async () => {
    const res = await request(app).get('/comments').send({
      mbti: '',
      enneagram: '',
      zodiac: '',
      sort: 'best',
      limit: 20
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('comments')
    expect(res.body.comments.length).toBeGreaterThan(0)
  })
})
