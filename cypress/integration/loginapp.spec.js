describe("UI TESTS", () => {
  it("should load the login page correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=login-text]").should("have.length", 1);
    cy.get("[data-cy=login-text]").should("be.visible");
  });

  it("should not allow login when username is not provided", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=email-input]").should("have.length", 1);
    cy.get("[data-cy=password-input]").type("1234");
    cy.get("[data-cy=login-button]").click();
    //check that we are still on the same page
    cy.get("[data-cy=login-text]").should("have.length", 1);
    cy.get("[data-cy=homepage]").should("have.length", 0);
  });

  it("should not allow login when password is not provided", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=password-input]").should("have.length", 1);
    cy.get("[data-cy=email-input]").type("jarosz.dan@gmail.com");
    cy.get("[data-cy=login-button]").click();
    //check that we are still on the same page
    cy.get("[data-cy=login-text]").should("have.length", 1);
    cy.get("[data-cy=homepage]").should("have.length", 0);
  });

  it("should login to the homepage with valid creds", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=email-input]").type("jarosz.dan@gmail.com");
    cy.get("[data-cy=password-input]").type("1234");
    cy.get("[data-cy=login-button]").click();
    //check that we are on the homepage
    cy.url().should("have.include", "/login");
    cy.get("[data-cy=login-text]").should("have.length", 0);
    cy.get("[data-cy=homepage]").should("have.length", 1);
    cy.get("[data-cy=logout-button]").should("be.visible");
    cy.get("[data-cy=logout-button]").should("have.class", "btn-sm");
    cy.get("[data-cy=logout-button]").should("not.have.class", "btn-bg");
  });

  it("should contain correct input field values", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=email-input]").type("jarosz.dan@gmail.com");
    cy.get("[data-cy=email-input]").should(
      "have.value",
      "jarosz.dan@gmail.com"
    );
    cy.get("[data-cy=email-input]").should("not.have.value", "john@gmail.com");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=password-input]").should("have.value", "123456");
    cy.get("[data-cy=password-input]").should("not.have.value", "1234");
  });
});

//Welcome, you are now logged in
