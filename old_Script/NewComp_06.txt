app.beginUndoGroup("Create Brand Comp");

// === 1. Composition settings ===
var compWidth = 1080;
var compHeight = 1920;
var compDuration = 30; // seconds
var compFps = 30;

var brandComp = app.project.items.addComp(
    "brand name", 
    compWidth, 
    compHeight, 
    1,             // pixel aspect ratio
    compDuration, 
    compFps
);

// === 2. Add a text layer ===
var textLayer = brandComp.layers.addText("Welcome to Brand");

// Text properties
var textProp = textLayer.property("Source Text");
var textDocument = textProp.value;
textDocument.fontSize = 120;
textDocument.fillColor = [1, 1, 1]; // white
textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
textProp.setValue(textDocument);

// Center text in comp
textLayer.property("Position").setValue([compWidth/2, compHeight/2]);

// Simple opacity fade-in animation
var opacityProp = textLayer.property("Transform").property("Opacity");
opacityProp.setValueAtTime(0, 0);
opacityProp.setValueAtTime(2, 100);

// === 3. Ask user to select logo file ===
var logoFile = File.openDialog("Select your logo file", "*.*");

if (logoFile != null && logoFile.exists) {
    // Import options
    var importOpts = new ImportOptions(logoFile);
    var logoItem = app.project.importFile(importOpts);

    // Add logo to comp
    var logoLayer = brandComp.layers.add(logoItem);

    // Resize if too large
    logoLayer.transform.scale.setValue([20, 20]);

    // Margin from edges
    var margin = 50;

    // Get logo size
    var rect = logoLayer.sourceRectAtTime(0, false);

    // Calculate position → Top-right corner
    var xPos = compWidth - rect.width/2 - margin;
    var yPos = rect.height/2 + margin;

    logoLayer.property("Position").setValue([xPos, yPos]);
    logoLayer.moveToBeginning();
} else {
    alert("⚠️ No logo file selected.");
}

app.endUndoGroup();
