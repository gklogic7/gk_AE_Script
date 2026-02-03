if (!app.project) {
    app.newProject();
}

app.beginUndoGroup("Create Brand and New 05 Comps");

// --- Settings ---
var compWidth = 1080;
var compHeight = 1920;
var compDuration = 30; // seconds
var compFps = 30;
var compPixelAspect = 1;

// --- Create "brand name" comp ---
var brandComp = app.project.items.addComp("brand name", compWidth, compHeight, compPixelAspect, compDuration, compFps);
var bg1 = brandComp.layers.addSolid([1, 1, 1], "Background", compWidth, compHeight, compPixelAspect);
bg1.locked = true;

// --- Create "new 05" comp ---
var newComp = app.project.items.addComp("new 05", compWidth, compHeight, compPixelAspect, compDuration, compFps);
var bg2 = newComp.layers.addSolid([1, 1, 1], "Background", compWidth, compHeight, compPixelAspect);
bg2.locked = true;


app.endUndoGroup();