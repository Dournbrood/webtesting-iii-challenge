import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Dashboard from "./Dashboard";

test("Controls and display render", () => {
    const { getByTestId } = render(<Dashboard />);
    getByTestId(/controlsrender/i);
    getByTestId(/displayrender/i);
});
