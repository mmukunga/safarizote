import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactUs } from '../pages/contact/ContactUs'

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post('/api/signIn', (req, res, ctx) => {
    const { username } = req.body;
    return res(ctx.json({id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda', username, firstName: 'John', lastName: 'Maverick'}))
  }),
  rest.post('/api/v1/auth/register/', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({email: 'Email exists'}))
  }),
  rest.get('/api/users', async (req, res, ctx) => {
    return res(ctx.text("The best interface is no interface"));
  })
];

const server = setupServer(...handlers);
server.listen({ onUnhandledRequest(req) {
    console.error(
      'Found an unhandled %s request to %s',
      req.method,
      req.url.href,
    )},
 })

describe('Form', () => {
  
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should allow a user to log in', async () => {
    render(<ContactUs />)

    await userEvent.type(screen.getByLabelText(/username/i), 'Maji Moto')
    await userEvent.type(screen.getByRole('textbox'), 'Javascript');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Javascript' }});
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')).toBeInTheDocument()
    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(await screen.findByText('Maverick')).toBeInTheDocument()
  })
})