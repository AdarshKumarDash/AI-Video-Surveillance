function preload() {
    video = createVideo("video.mp4");
}


function setup() {
    canvas = createCanvas(640, 400);
    canvas.center();
    video.hide();
}

function draw() {
    image(video, 0, 0, 640, 400);
}