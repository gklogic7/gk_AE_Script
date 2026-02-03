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

// === 3. Place logo in top-right corner ===
// (Assumes you already imported a logo named "logo.png" or "logo.psd")
var logoItem = null;
for (var i = 1; i <= app.project.items.length; i++) {
    if (app.project.items[i].name.match(/logo/i)) {
        logoItem = app.project.items[i];
        break;
    }
}

if (logoItem) {
    var logoLayer = brandComp.layers.add(logoItem);

    // Resize if too large
    logoLayer.transform.scale.setValue([20, 20]);

    // Move to top-right
    var margin = 50;
    logoLayer.property("Position").setValue([compWidth - margin, margin]);
    logoLayer.moveToBeginning();
} else {
    alert("⚠️ Logo not found in project. Import a logo file first.");
}

app.endUndoGroup();