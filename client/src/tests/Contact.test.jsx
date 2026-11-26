import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import Contact from "../user/pages/Contact.jsx";
import { api } from "../admin/api.js";

// Mock the backend API.
vi.mock("../admin/api.js", () => ({
  api: {
    createContact: vi.fn(),
  },
}));

const contactData = {
  firstName: "John",
  lastName: "Doe",
  contactNumber: "905-123-4567",
  email: "john@example.com",
  message: "I would like to discuss a project with you.",
};

function renderContact() {
  return render(
    <MemoryRouter initialEntries={["/contact"]}>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

async function fillContactForm(user) {
  await user.type(
    screen.getByLabelText("First Name"),
    contactData.firstName
  );

  await user.type(
    screen.getByLabelText("Last Name"),
    contactData.lastName
  );

  await user.type(
    screen.getByLabelText("Contact Number"),
    contactData.contactNumber
  );

  await user.type(
    screen.getByLabelText("Email Address"),
    contactData.email
  );

  await user.type(
    screen.getByLabelText("Message"),
    contactData.message
  );
}

describe("Contact Form", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updates form fields when the user types", async () => {
    const user = userEvent.setup();

    renderContact();

    await fillContactForm(user);

    expect(
      screen.getByLabelText("First Name")
    ).toHaveValue(contactData.firstName);

    expect(
      screen.getByLabelText("Last Name")
    ).toHaveValue(contactData.lastName);

    expect(
      screen.getByLabelText("Contact Number")
    ).toHaveValue(contactData.contactNumber);

    expect(
      screen.getByLabelText("Email Address")
    ).toHaveValue(contactData.email);

    expect(
      screen.getByLabelText("Message")
    ).toHaveValue(contactData.message);
  });

  it("prevents submission when required fields are empty", async () => {
    const user = userEvent.setup();

    renderContact();

    await user.click(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    expect(api.createContact).not.toHaveBeenCalled();
  });

  it("submits valid contact information and redirects home", async () => {
    const user = userEvent.setup();

    api.createContact.mockResolvedValue({
      success: true,
    });

    renderContact();

    await fillContactForm(user);

    await user.click(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    await waitFor(() => {
      expect(api.createContact).toHaveBeenCalledTimes(1);

      expect(api.createContact).toHaveBeenCalledWith(
        contactData
      );
    });

    expect(
      await screen.findByRole("heading", {
        name: "Home Page",
      })
    ).toBeInTheDocument();
  });

  it("displays an error when the API request fails", async () => {
    const user = userEvent.setup();

    api.createContact.mockRejectedValue(
      new Error("Failed to send message.")
    );

    renderContact();

    await fillContactForm(user);

    await user.click(
      screen.getByRole("button", {
        name: "Send Message",
      })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("Failed to send message.");

    expect(
      screen.getByLabelText("First Name")
    ).toHaveValue(contactData.firstName);

    expect(
      screen.getByRole("button", {
        name: "Send Message",
      })
    ).toBeEnabled();
  });
});