import request from 'supertest'
import { describe, test, expect } from '@jest/globals'
import app from '../src/servers/api-server.js'
import { API_VERSION } from '../src/configs/constants.js'

describe('Authentication Middleware', () => {
  // test("register a new user", async () => {
  //   const response = await request(app).post("/api/v1/auth/register").send({
  //     username: "testuserzzz",
  //     password: "testpasswordzzzz",
  //     email: "testuserzzz@example.com",
  //   });

  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     "User registered successfully",
  //   );
  // });

  test('login with valid credentials', async () => {
    const response = await request(app)
      .post(`${API_VERSION}/auth/login`)
      .send({ username: 'testuser', password: 'testpassword' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
