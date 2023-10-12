describe("[Arranger]", () => {
  it("should persist track sorting and update mixer sorting", () => {
    // cy.visit("http://localhost:3000");
    // cy.get("button").click();
    cy.get("svg.lucide-grip-vertical")
      .eq(0)
      .parent()
      .trigger("mousedown", { button: 0, eventConstructor: "MouseEvent" })
      .trigger("dragstart")
      .trigger("mousemove", {
        button: 0,
        eventConstructor: "MouseEvent",
        clientX: 40,
        clientY: 310,
        bubbles: true,
        force: true,
      })
      .trigger("drag", {
        button: 0,
        eventConstructor: "MouseEvent",
        clientX: 40,
        clientY: 300,
        bubbles: true,
        force: true,
      })
      .parent()
      .parent()
      .trigger("mouseup")
      .trigger("drop")
      .trigger("dragend");

    cy.get("svg.lucide-grip-vertical")
      .eq(0)
      .parent()
      .parent()
      .should("not.have.id", "track-instrument-bass");

    // cy.get("svg.lucide-grip-vertical").eq(5).parent().parent();

    /* cy.get("svg.lucide-grip-vertical")
      .eq(5)
      .parent()
      .parent()
      .should("have.id", "track-instrument-bass"); */

    // TODO check mixer sorting
  });
});
