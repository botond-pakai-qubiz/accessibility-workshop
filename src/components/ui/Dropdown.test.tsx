import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";

const options = [
  { label: "Berlin", value: "berlin" },
  { label: "London", value: "london" },
];

describe("Dropdown", () => {
  it("opens on click and selects an option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Dropdown
        options={options}
        value=""
        onChange={handleChange}
        placeholder="Pick"
      />,
    );

    expect(screen.queryByText("London")).not.toBeInTheDocument();

    await user.click(screen.getByText("Pick"));
    await user.click(screen.getByText("London"));

    expect(handleChange).toHaveBeenCalledWith("london");
  });

  it("shows the selected label", () => {
    render(<Dropdown options={options} value="berlin" onChange={() => {}} />);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });
});
