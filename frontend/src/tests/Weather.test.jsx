import React from 'react'
import { render, act, awaitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Weather from '../pages/weather/Weather';

const fakeServer = setupServer(
  rest.get('/api/weather', (req, res, ctx) => res(ctx.status(200), ctx.json({ data: { photos: { photo: [] },},}))
  )
)

beforeAll(() => {fakeServer.listen()})
afterEach(() => {fakeServer.resetHandlers()})
afterAll(() => fakeServer.close())

test('it calls Weather REST request when submitting search term',  async () => {
    const fakeSetPhotos = jest.fn(() => {1,2,3});  
  const { getByLabelText } = render(<Weather  setPhotos={fakeSetPhotos}/>)
  const input = getByLabelText('Search Weather')
  const submitButton = getByLabelText('Submit search')

  await act(async () => {
    userEvent.type(input,'Finding Wally')
    userEvent.click(submitButton)
  })
   // TODO: assert that the fakeServer was called once and with the correct URL
   expect(fakeSetPhotos).toHaveBeenCalledWith([1, 2, 3]);
})