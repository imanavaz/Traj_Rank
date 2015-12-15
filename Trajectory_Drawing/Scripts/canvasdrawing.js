var canvas;
var context;
var canvasWidth = 490;
var canvasHeight = 220;
var padding = 25;
var lineWidth = 8;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var trajectoryImage = new Image();
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var crayonBackgroundImage = new Image();
var markerBackgroundImage = new Image();
var eraserBackgroundImage = new Image();
var crayonTextureImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;
var curTool = "crayon";
var curSize = "normal";
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 111;
var drawingAreaY = 11;
var drawingAreaWidth = 267;
var drawingAreaHeight = 200;
var toolHotspotStartY = 23;
var toolHotspotHeight = 38;
var sizeHotspotStartY = 157;
var sizeHotspotHeight = 36;
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;
var totalLoadResources = 8;
var curLoadResNum = 0;


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



    //Mouse events
    $('#canvas').mousedown(function(e)
    {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
		
        if(mouseX < drawingAreaX) // Left of the drawing area
        {
            if(mouseX > mediumStartX)
            {
                if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){
                    curColor = colorPurple;
                }else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){
                    curColor = colorGreen;
                }else if(mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3){
                    curColor = colorYellow;
                }else if(mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4){
                    curColor = colorBrown;
                }
            }
        }
        else if(mouseX > drawingAreaX + drawingAreaWidth) // Right of the drawing area
        {
            if(mouseY > toolHotspotStartY)
            {
                if(mouseY > sizeHotspotStartY)
                {
                    var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
                    if(mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX)
                    {
                        if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge){
                            curSize = "huge";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "large";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "normal";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "small";						
                        }
                    }
                }
                else
                {
                    if(mouseY < toolHotspotStartY + toolHotspotHeight){
                        curTool = "crayon";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
                        curTool = "marker";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
                        curTool = "eraser";
                    }
                }
            }
        }
        else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
        {
            // Mouse click location on drawing area
        }
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });
	
    $('#canvas').mousemove(function(e){
        if(paint==true){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
	
    $('#canvas').mouseup(function(e){
        paint = false;
        redraw();
    });
	
    $('#canvas').mouseleave(function(e){
        paint = false;
    });
}


/**
* Adds a point to the drawing array.
* @param x
* @param y
* @param dragging
*/
function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickTool.push(curTool);
    clickColor.push(curColor);
    clickSize.push(curSize);
    clickDrag.push(dragging);
}


/**
* Clears the canvas.
*/
function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}