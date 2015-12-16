var canvas;
var ctx;
var flag = false;
var prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
var trajectoryImage = new Image();
var canvasWidth = 700;
var canvasHeight = 400;
var currColor;


function loadCanvas() {
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }

    ctx = canvas.getContext("2d");
    
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

    loadImage();   
 
}


function loadImage() {
    trajectoryImage.onload = function () {
        ctx.drawImage(trajectoryImage, 100, 75, 500, 250);
    };
    trajectoryImage.src = 'Images/ExperimentMap.png';    
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = currColor;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}


function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        loadImage();
    }
}

function save() {
    //document.getElementById("canvasimg").style.border = "2px solid";
    //var dataURL = canvas.toDataURL();
    //document.getElementById("canvasimg").src = dataURL;
    //document.getElementById("canvasimg").style.display = "inline";
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = currColor;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}


function update(picker) {
    currColor = picker.toHEXString();
}

    