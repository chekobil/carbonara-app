describe("Store Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stores");
  });

  it("initial list show more than 10 results", () => {
    cy.get(".search-results-count").should("exist");
    cy.get(".store-list-container").should("exist");
    cy.get(".store-item").should("exist");
    cy.get(".store-item").its("length").should("be.gte", 10);
  });

  it("make a search and check that every result includes the search query", () => {
    const query = "222";
    cy.get('[data-test-id="input-search-stores"]').type(query).type("{enter}");
    cy.get(".search-results-count").should("contain", query);
    cy.get(".store-item").each(($item) => {
      cy.wrap($item).should("contain", query);
    });
  });

  it("shows empty results for non-matching search", () => {
    const query = "bad-query";
    cy.get('[data-test-id="input-search-stores"]').type(query).type("{enter}");
    cy.get(".store-item").should("not.exist");
  });

  it("clears search and shows all results", () => {
    const query = "22";
    cy.get('[data-test-id="input-search-stores"]').type(query).type("{enter}");
    cy.get('[data-test-id="input-search-stores"]').clear().type("{enter}");
    cy.get(".store-list-container").should("exist");
    cy.get(".store-item").should("exist");
  });

  it("updates search results count when filtering", () => {
    const query = "22";
    cy.get(".search-results-count")
      .invoke("text")
      .then((initialCount) => {
        cy.get('[data-test-id="input-search-stores"]')
          .type(query)
          .type("{enter}");
        cy.get(".search-results-count")
          .invoke("text")
          .should("not.eq", initialCount);
      });
  });
});
