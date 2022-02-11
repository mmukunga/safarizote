import React from 'react'
import { render, screen } from '@testing-library/react'
import Recipes from '../pages/Recipes';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const allRecipes = {
    "0": {
        "id": "1",
        "text": "burger"
    },
    "1": {
        "id": "2",
        "text": "fish"
    },
    "2": {
        "id": "3",
        "text": "pizza"
    },
    "3": {
        "id": "4",
        "text": "lazagne"
    }
}

const server = setupServer(
  rest.get('/api/receipes', (req, res, ctx) => {
    ctx.status(200)
    return res(ctx.json({ allRecipes }))
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('About', () => {
    test('fetches and displays all receipes', async () => {
        render(<Recipes />)
        const listItems = await screen.findAllByRole('listitem')
        expect(listItems).toHaveLength(4)
        expect(listItems[0]).toHaveTextContent('burger')
        expect(listItems[1]).toHaveTextContent('fish')
        expect(listItems[2]).toHaveTextContent('pizza')
    });
});