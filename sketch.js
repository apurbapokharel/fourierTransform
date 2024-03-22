let angle = 0;
let wave = []
let circleNo = 3;
let fourierX;
let x = [];

var w = window.innerWidth;
var h = window.innerHeight;  

function setup() {
  createCanvas(w, h);
  const skip = 2;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);
  // fourierX.sort((a, b) => b.amp - a.amp);
}

function createEpicycles(point_x, point_y){
  
  for(i = 0; i< fourierX.length; i++){
    let prev_x = point_x;
    let prev_y = point_y;
    
    let radius = fourierX[i].amp;
    let phase = fourierX[i].phase;
    let freq = fourierX[i].freq;
    point_x += radius * cos(freq * angle + phase);
    point_y += radius * sin(freq * angle + phase);
    stroke(255,70);
    circle(prev_x, prev_y, 2 * radius);

    //create the line from circle to radius
    stroke(255,80)
    line(prev_x, prev_y, point_x, point_y);
    prev_x = point_x;
    prev_y = point_y;
  }
  return createVector(point_x, point_y);
}
function draw() {
  // noLoop();
  noFill();
  background(0);
  
  // translate(100,300); 
  v = createEpicycles(w/8, h/8)
  wave.unshift(v);
  
  //draw the wave
  beginShape();  
  stroke('255');
  for(i = 0; i < wave.length; i++){
    point(wave[i].x, wave[i].y);
  }
  endShape();
  const da = TWO_PI / fourierX.length;
  angle += da;
}