const ingredients = {
  pasta: 500,
  bacon: 200,
  eggs: 1,
  milk: 200,
  butter: 500,
  oil: 100,
};
describe("Carbonara Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("display all ingredient inputs", async () => {
    const dataLength = Object.keys(ingredients).length;
    cy.get(".form-control").should("have.length", dataLength);
  });

  it("view calculate button disabled, when some inputs have no values", () => {
    cy.get(".input").first().clear().type("200");
    cy.get('[data-test-id="button-calculate-recipe"]').should(
      "have.class",
      "is-disabled"
    );
  });

  it("view calculate button enabled, when all inputs have values", () => {
    cy.get(".input-group > input").each((item) => {
      cy.wrap(item).clear().type("200");
    });
    cy.get('[data-test-id="button-calculate-recipe"]').should(
      "not.have.class",
      "is-disabled"
    );
  });

  it("calculate recipe and then reset some value should show an error", () => {
    cy.get(".input-group > input").each((item) => {
      cy.wrap(item).clear().type("200");
    });
    cy.get('[data-test-id="button-calculate-recipe"]').click();
    cy.get(".input-group > input").first().clear();
    cy.get(".input-error").should("exist");
  });

  it("add buttons change values", () => {
    const initialValue = null;
    cy.get(".icon-group").first().find("span.iconify").first().click();
    cy.get(".input").first().should("not.equal", initialValue);
    cy.get(".icon-group").first().find("span.iconify").first().click();
    cy.get(".input").first().should("not.equal", initialValue);
  });

  it("reset button is visible after calculate and then chanbge some value", () => {
    cy.get(".icon-group").each((item) => {
      cy.wrap(item.find("span.iconify").first().click());
    });
    cy.get('[data-test-id="button-calculate-recipe"]').click();
    cy.get(".icon-group").find("span.iconify").first().click();
    cy.get("button").contains("Reset").should("not.have.class", "is-disabled");
  });
});
