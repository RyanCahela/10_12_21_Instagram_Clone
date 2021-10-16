import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
/**
 * @jest-environment jsdom
 */

describe("Home", () => {
  it("renders a header", () => {
    render(
      <SessionProvider>
        <RecoilRoot>
          <Home />
        </RecoilRoot>
      </SessionProvider>
    );

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });
});
