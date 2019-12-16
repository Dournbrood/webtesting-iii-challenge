// Test away!
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Controls from "./Controls";

test("Both buttons are present", () => {
    const { getByText } = render(<Controls />);
    getByText(/lock gate/i);
    getByText(/close gate/i);
});

test("Lock Gate button cannot be clicked while gate is open", () => {
    const { getByText } = render(<Controls />);
    const button = getByText(/lock gate/i);
    fireEvent.click(button);
    getByText(/lock gate/i);
});

test("Open Gate button cannot be clicked while gate is closed and locked", () => {
    const { getByText } = render(<Controls locked closed />);
    const button = getByText(/open gate/i);
    fireEvent.click(button);
    getByText(/open gate/i);
});

test("Buttons reflect changes when gate shuts, locks, unlocks, and opens.", () => {
    //This one's big. Watch out.
    const { getByText, rerender } = render(<Controls />);

    //Shut gate button
    fireEvent.click(getByText(/close gate/i));
    //Component will rerender
    rerender(<Controls closed />);
    //Check if buttons updated to proper states
    getByText(/open gate/i);
    getByText(/lock gate/i);

    //Lock gate button
    fireEvent.click(getByText(/lock gate/i));
    //Component rerenders
    rerender(<Controls closed locked />);
    //Check if buttons updated
    getByText(/unlock gate/i);
    getByText(/open gate/i);

    //Unlock gate button
    fireEvent.click(getByText(/unlock gate/i));
    //Again, the component rerenders...
    rerender(<Controls closed locked={false} />);
    //Check if buttons updated
    getByText(/lock gate/i);
    getByText(/open gate/i);

    //Open gate button
    fireEvent.click(getByText(/open gate/i));
    //Would it shock you if the component rerendered?
    rerender(<Controls closed={false} locked={false} />);
    //Wow, it did!
    //Check if buttons updated
    getByText(/lock gate/i);
    getByText(/close gate/i);

    //All done!
});

