import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Display from "./Display";

test("Gate is unlocked and open by default ", () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i);
    getByText(/open/i);
});

test("Closed display updates properly ", () => {
    const { getByText, rerender } = render(<Display closed />);
    getByText(/closed/i);
    rerender(<Display closed={false} />);
    getByText(/open/i);
});

test("Locked display updates properly ", () => {
    const { getByText, rerender } = render(<Display closed locked />);
    getByText(/locked/i);
    rerender(<Display closed locked={false} />);
    getByText(/unlocked/i);
});