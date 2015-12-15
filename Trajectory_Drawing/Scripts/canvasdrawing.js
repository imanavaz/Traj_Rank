
function resourceLoaded() {
    if (++curLoadResNum >= totalLoadResources) {
        redraw();
    }
}

function loadCanvas() {

    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('mycanvas');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    trajectoryImage.onload = function () {
        resourceLoaded();
    };
    trajectoryImage.src = "Images/ExperimentMap.png";





}