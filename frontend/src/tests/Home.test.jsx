import { render, screen } from "./custom-render";
import Home from '../pages/Home';
describe("<Home />", () => {
  it("Renders <App /> component correctly", () => {
    render(<Home />);
    expect(
      screen.getByText(/Safari List/i)
    ).toBeInTheDocument();
  });
});