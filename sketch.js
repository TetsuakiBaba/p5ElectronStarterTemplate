function setup() {
    console.log("hello p5js")
    var mycanvas = createCanvas(windowWidth, windowHeight);
    document.getElementById("canvas_placeholder").append(mycanvas.elt);
}

function draw() {
    background(0);
    noFill();
    strokeWeight(10);
    stroke(0, 255, 0);
    rect(0, 0, width, height);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text("hello p5js, web serial api and electron", width / 2, height / 2);
    circle(mouseX, mouseY, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function gotSerialValue(value) {
    console.log(value);
}
