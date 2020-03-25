describe("UI TESTS", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/actions");
  });

  it("should clear the input", () => {
    cy.get(".action-email").type("fake@email.com");
    cy.get(".action-email").clear();
    cy.get(".action-email").should("have.value", "");
  });

  it("should double click element", () => {
    cy.get(".action-div")
      .dblclick()
      .should("not.be.visible");
    cy.get(".action-input-hidden").should("be.visible");
  });

  it("checkboxes and radios check", () => {
    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]')
      .not("[disabled]")
      .check()
      .should("be.checked");

    cy.get('.action-radios [type="radio"]')
      .not("[disabled]")
      .check()
      .should("be.checked");

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]')
      .check("radio1")
      .should("be.checked");

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(["checkbox1", "checkbox2"])
      .should("be.checked");

    // Ignore error checking prior to checking
    cy.get(".action-checkboxes [disabled]")
      .check({ force: true })
      .should("be.checked");

    cy.get('.action-radios [type="radio"]')
      .check("radio3", { force: true })
      .should("be.checked");
  });

  it("checkboxes and radios uncheck", () => {
    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]')
      .not("[disabled]")
      .uncheck()
      .should("not.be.checked");

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]')
      .check("checkbox1")
      .uncheck("checkbox1")
      .should("not.be.checked");

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]')
      .check(["checkbox1", "checkbox3"])
      .uncheck(["checkbox1", "checkbox3"])
      .should("not.be.checked");

    // Ignore error checking prior to unchecking
    cy.get(".action-check [disabled]")
      .uncheck({ force: true })
      .should("not.be.checked");
  });

  it("should select", () => {
    // Select option(s) with matching text content
    cy.get(".action-select")
      .select("apples")
      .should("contain", "apples");

    cy.get(".action-select-multiple").select(["apples", "oranges", "bananas"]);

    // Select option(s) with matching value
    cy.get(".action-select").select("fr-bananas");

    cy.get(".action-select-multiple").select([
      "fr-apples",
      "fr-oranges",
      "fr-bananas"
    ]);
  });
});
