let angle = 90;
let wave = []
let circleNo = 3;
let fourierX;
let x = [];

var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
  createCanvas(w, h);
  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);
  // fourierX.sort((a, b) => b.amp - a.amp);
}

function draw() {
  // noLoop();
  noFill();
  background(0);
  let radius = 50;
  
  translate(100,300); 
  let point_x = 0;
  let point_y = 0;
  
  for(i = 0; i< fourierX.length; i++){
    let prev_x = point_x;
    let prev_y = point_y;
    
    let radius = fourierX[i].amp;
    let phase = fourierX[i].phase;
    let freq = fourierX[i].freq;

    point_x += radius * cos(freq * angle + phase);
    point_y += radius * sin(freq * angle + phase);
    stroke(255,100);
    circle(prev_x, prev_y, 2 * radius);

    //create the line from circle to radius
    stroke(255)
    line(prev_x, prev_y, point_x, point_y);
    prev_x = point_x;
    prev_y = point_y;
  }
  
  //draw the wave
  wave.unshift({
    x: point_x,
    y: point_y
  });
  translate(200,0);
  line(point_x-200, point_y, 0, wave[0])
  beginShape();  
  for(i = 0; i < wave.length; i++){
    point(i, wave[i]);
  }
  endShape();
  angle += 0.05;

}