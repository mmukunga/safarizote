import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Safaris from '../pages/safari/Safaris';


const mockTasks = [
    { id: 0, title: 'Task Zero', completed: false },
    { id: 1, title: 'Task One', completed: true },
  ];
const tasksHandler = rest.get(getTasksPath, async (req, res, ctx) =>
  res(ctx.json(mockTasks))
);

const tasksHandlerException = rest.get(
    getTasksPath,
    async (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
  );

const handlers = [tasksHandler];
const mswServer = setupServer(...handlers);

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('Component: Safaris', () => {
  it('displays returned safaris on successful fetch', async () => {
    render(<Safaris />);

    const displayedSafaris = await screen.findAllByTestId(/safari-id-\d+/);
    expect(displayedSafaris).toHaveLength(2);
    expect(screen.getByText('Safari Zero')).toBeInTheDocument();
    expect(screen.getByText('Safari One')).toBeInTheDocument();
  });

  it('displays error message when fetching safaris raises error', async () => {
    mswServer.use(tasksHandlerException);
    render(<Safaris />);

    const errorDisplay = await screen.findByText('Failed to fetch safaris');
    expect(errorDisplay).toBeInTheDocument();

    const displayedSafaris = screen.queryAllByTestId(/safari-id-\d+/);
    expect(displayedSafaris).toEqual([]);
  });
});