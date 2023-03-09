describe("template spec", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("인풋테스트", function () {
    cy.visit("todos");

    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("인풋테스트", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("todos");
    cy.get('[data-test="new-todo"]').type("이거 바보가{enter}");
    cy.get('[data-test="new-todo"]').type("2개 입력{enter}");
    cy.get('[data-test="new-todo"]').type("3개 바보가{enter}");

    /* ==== Generated with Cypress Studio ==== */
    cy.get(".router-link-active").should("have.text", " 모든 항목 (3) ");
    cy.get('[href="/todos/active"]').click();
    cy.get(".router-link-active").should("have.text", " 해야 할 항목 (3) ");
    cy.get(
      ":nth-child(3) > .item__inner > label > .icon > .material-icons"
    ).click();
    cy.get(".router-link-active").should("have.text", " 해야 할 항목 (2) ");
    cy.get('[href="/todos/completed"]').should(
      "have.text",
      " 완료된 항목 (1) "
    );
    cy.get('[href="/todos/completed"]').click();
    cy.get(".item__title").should("have.text", "3개 바보가");
    cy.get(".item_actions > :nth-child(1) > .material-icons").click();
    cy.get(".item__inner > input").clear("3개 바보가 ");
    cy.get(".item__inner > input").type("3개 바보가 11{enter}");
    cy.get(".item_date").should("have.text", "2023년 03월 23일 (edited)");
    cy.get(".item_actions > .btn--danger > .material-icons").click();
    cy.get(".router-link-active").should("have.text", " 완료된 항목 (0) ");
    /* ==== End Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  });
});
