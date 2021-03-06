const commonlocators = require("../../../../locators/commonlocators.json");
const formWidgetsPage = require("../../../../locators/FormWidgets.json");
const dsl = require("../../../../fixtures/formdsl1.json");
const publishPage = require("../../../../locators/publishWidgetspage.json");

describe("RichTextEditor Widget Functionality", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  beforeEach(() => {
    cy.openPropertyPane("richtexteditorwidget");
  });

  it("RichTextEditor-Edit Text area with HTML body functionality", function() {
    //changing the Text Name
    cy.widgetText(
      this.data.RichTextEditorName,
      formWidgetsPage.richTextEditorWidget,
      formWidgetsPage.richTextEditorWidget + " " + commonlocators.widgetNameTag,
    );

    //Edit the text area with Html
    cy.testJsontext("defaulttext", this.data.HtmlText);

    //Validate Html
    cy.validateHTMLText(
      formWidgetsPage.richTextEditorWidget,
      "h1",
      "This is a Heading",
    );
    cy.PublishtheApp();
    cy.validateHTMLText(
      publishPage.richTextEditorWidget,
      "h1",
      "This is a Heading",
    );
  });

  it("RichTextEditor-Enable Validation", function() {
    //Uncheck the Disabled checkbox
    cy.UncheckWidgetProperties(formWidgetsPage.disableJs);
    cy.validateEnableWidget(
      formWidgetsPage.richTextEditorWidget,
      commonlocators.disabledBtn,
    );

    cy.PublishtheApp();
    cy.validateEnableWidget(
      publishPage.richTextEditorWidget,
      commonlocators.disabledBtn,
    );
  });

  it("RichTextEditor-Disable Validation", function() {
    //Check the Disabled checkbox
    cy.CheckWidgetProperties(formWidgetsPage.disableJs);
    cy.validateDisableWidget(
      formWidgetsPage.richTextEditorWidget,
      commonlocators.disabledBtn,
    );

    cy.PublishtheApp();
    cy.validateDisableWidget(
      publishPage.richTextEditorWidget,
      commonlocators.disabledBtn,
    );
  });

  it("RichTextEditor-check Visible field  validation", function() {
    // Uncheck the visible checkbox
    cy.UncheckWidgetProperties(commonlocators.visibleCheckbox);
    cy.PublishtheApp();
    cy.get(publishPage.richTextEditorWidget).should("not.exist");
  });

  it("RichTextEditor-uncheck Visible field validation", function() {
    // Check the visible checkbox
    cy.CheckWidgetProperties(commonlocators.visibleCheckbox);
    cy.PublishtheApp();
    cy.get(publishPage.richTextEditorWidget).should("be.visible");
  });

  it("RichTextEditor-check Hide toolbar field validaton", function() {
    // Check the Hide toolbar checkbox
    cy.CheckWidgetProperties(commonlocators.hideToolbarCheckbox);
    cy.validateToolbarHidden(
      formWidgetsPage.richTextEditorWidget,
      commonlocators.rteToolbar,
    );
    cy.PublishtheApp();
    cy.validateToolbarHidden(
      publishPage.richTextEditorWidget,
      commonlocators.rteToolbar,
    );
  });

  it("RichTextEditor-uncheck Hide toolbar field validaton", function() {
    // Uncheck the Hide toolbar checkbox
    cy.UncheckWidgetProperties(commonlocators.hideToolbarCheckbox);
    cy.validateToolbarVisible(
      formWidgetsPage.richTextEditorWidget,
      commonlocators.rteToolbar,
    );
    cy.PublishtheApp();
    cy.validateToolbarVisible(
      publishPage.richTextEditorWidget,
      commonlocators.rteToolbar,
    );
  });

  afterEach(() => {
    cy.goToEditFromPublish();
  });
});
