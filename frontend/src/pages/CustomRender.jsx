import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { CartProvider } from "../pages/CartContext";

const Wrapper = ({ children }) => {
  return (
    <CartProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </CartProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };