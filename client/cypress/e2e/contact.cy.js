describe("Contact Form - End-to-End", () => {
  const contactData = {
    firstName: "Cypress",
    lastName: "Tester",
    contactNumber: "905-123-4567",
    email: "cypress@example.com",
    message: "This is an automated end-to-end test.",
  };

  beforeEach(() => {
    cy.visit("/Portfolio-Project/contact");
  });

  function fillForm(data) {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#contactNumber").type(data.contactNumber);
    cy.get("#email").type(data.email);
    cy.get("#message").type(data.message);
  }

  // TEST 1: Successful submission
  it("allows a visitor to submit a valid contact message", () => {
    cy.intercept("POST", "**/api/contacts").as("createContact");

    const data = {
      ...contactData,
      email: `cypress-${Date.now()}@example.com`,
    };

    fillForm(data);

    cy.contains("button", "Send Message").click();

    cy.wait("@createContact").then(({ request, response }) => {
      expect(request.body).to.deep.equal(data);
      expect(response.statusCode).to.equal(201);
    });

    cy.location("pathname").should(
      "match",
      /^\/(Portfolio-Project\/?)?$/
    );
  });

  // TEST 2: Invalid email submission
  it("prevents submission when the email is invalid", () => {
    cy.intercept("POST", "**/api/contacts").as("createContact");

    fillForm({
      ...contactData,
      email: "invalid-email",
    });

    cy.contains("button", "Send Message").click();

    cy.get("#email").should("match", ":invalid");

    cy.get("@createContact.all").should("have.length", 0);

    cy.location("pathname").should("include", "/contact");
  });

  // TEST 3: Backend failure
  it("displays an error when the backend fails", () => {
    cy.intercept("POST", "**/api/contacts", {
      statusCode: 500,
      body: {
        message: "Failed to send message.",
      },
    }).as("failedContact");

    fillForm(contactData);

    cy.contains("button", "Send Message").click();

    cy.wait("@failedContact")
      .its("response.statusCode")
      .should("equal", 500);

    cy.get('[role="alert"]').should("be.visible");

    cy.location("pathname").should("include", "/contact");

    // Verify that the user's input is preserved.
    cy.get("#firstName").should(
      "have.value",
      contactData.firstName
    );

    // Verify that the user can retry.
    cy.contains("button", "Send Message")
      .should("be.enabled");
  });
});