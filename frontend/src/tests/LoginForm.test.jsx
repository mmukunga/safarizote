import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Login from './pages/Login';
import i18n from '../config/i18n'

describe('Login', () => {
  let t

  beforeAll(async () => {
    t = await i18n
  })

  test('Should render the component', async () => {
    render(<Login />)
    await waitFor(() =>
      expect(screen.getByText(t('login_action'))).toBeInTheDocument()
    )
  })
})