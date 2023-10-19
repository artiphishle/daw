describe("[Arranger]", () => {
  it("should update the order of tracks in Arranger & Mixer", () => {
    /*
    cy.stub(Tone, "Player").returns({
      load: cy.stub(),
      loaded: true,
      toDestination: cy.stub(),
      sync: cy.stub(),
      start: cy.stub(),
      stop: cy.stub(),
      dispose: cy.stub(),
    });
    */

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
