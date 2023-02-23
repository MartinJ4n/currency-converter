describe("basic test", () => {
  it("verifies if the page loads", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=header]");
  });

  it("performs basic curency conversion and checks results", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=amountInput]").type("15");
    cy.get(':nth-child(1) > [data-cy="dropdown"]').click();
    cy.wait(200);
    cy.get(
      ':nth-child(1) > [data-cy="dropdown"] > [data-cy="dropdownBox"] > :nth-child(4)'
    ).click();
    cy.wait(200);
    cy.get(':nth-child(2) > [data-cy="dropdown"]').click();
    cy.wait(200);
    cy.get(
      ':nth-child(2) > [data-cy="dropdown"] > [data-cy="dropdownBox"] > :nth-child(6)'
    ).click();
    cy.wait(200);
    cy.get('[data-cy="convertButton"]').click();
    cy.get('[data-cy="convertionResult"]').should("have.text", "713.74 HUF");
    cy.get('[data-cy="recentlyAddedResults"]').should(
      "have.text",
      "15DKK ➡️ 713.74HUF"
    );
    cy.get('[data-cy="historyResults"]').should(
      "have.text",
      "- 15DKK ➡️ 713.74HUF"
    );
  });
});
