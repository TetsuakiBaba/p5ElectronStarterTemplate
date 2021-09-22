function setup() {
    console.log("hello p5js")
    var mycanvas = createCanvas(windowWidth, windowHeight);
    document.getElementById("canvas_placeholder").append(mycanvas.elt);
}

function draw() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    text("hello p5js and electron", width / 2, height / 2);
    circle(mouseX, mouseY, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}