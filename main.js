status = "";
video = "";
object = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(640, 400);
    canvas.center();
}

function startvideo() {
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 640, 400);
    r = random(255);
    g = random(255);
    b = random(255);
    if (status != "") {
        objectDetection.detect(video, gotresult);
        for (i = 0; i < object.length; i++) {
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 22);
            textSize(24);
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("objectnum").innerHTML = object.length;
        }
    }
}