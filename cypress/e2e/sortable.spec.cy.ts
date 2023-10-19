/*** @url: https://github.com/scha-ch/daw/issues/75} */
/* // !Important to prioritize cypress tests, add coverage and switch to TDD
describe("[dndkit]", () => {
  it("should update the order of tracks in Arranger & Mixer", () => {
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
        clientY: 100,
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
      .should("not.have.id", "track-bd");

    // mixer sorting
    cy.get("#DAW_MXR > section:first-child").should("not.contain.text", "Kick");
  });
});
*/
