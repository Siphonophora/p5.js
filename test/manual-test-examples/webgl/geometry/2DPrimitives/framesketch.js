var params
var n
var testinfo 


function setup(){
  params = getURLParams();
  if(params.mode == '3d'){
    createCanvas(400,400,WEBGL);
    console.log('3d loaded')
  } else {
    createCanvas(400,400);
    console.log('2d loaded')
  }

  testinfo = select('#testinfo')
}

function draw(){
  n = 0
  if(params.mode === '2d'){ 
  	translate(200,200)
  }
  background(120)
  fill(100,250,0);
  strokeWeight(4)
  stroke(0);
  line(-200,0,200,0)
  line(0,-200,0,200)
  line(-100,100,-100,-100)
  line( 100,100,100,-100)
  line(-100,100,100,100)
  line(-100,-100,100,-100)
  stroke(255,0,0)

  if(params.setStroke == 'false'){noStroke()}
  if(params.setFill   == 'false'){noFill()}


  if(thisOne()){
  	ellipse(0,0,150 + Math.cos(millis()/1000) * 50
               ,150 + Math.sin(millis()/1000) * 50)	 
    testinfo.html('Basic animated ellipse')
  }
  
  if(thisOne()){
  	ellipseMode(CENTER)
    ellipse(-50,-50,50,25)  
    ellipseMode(RADIUS)
    ellipse(50,-50,50,25)  
    ellipseMode(CORNER)
    ellipse(-50,50,50,25)  
    ellipseMode(CORNERS)
    ellipse(50,50,75,130) 
    testinfo.html('Elipse modes')  
  }

  if(thisOne()){
    ellipseMode(CENTER)
    arc(-140,-140,150,150,0,2,PIE)
    ellipseMode(RADIUS)
    arc(40,-140,150,150,0,2,PIE)
    ellipseMode(CORNER)
    arc(-140,40,150,150,0,2,PIE)
    ellipseMode(CORNERS)
    arc(40,40,150,150,0,2,PIE)
    testinfo.html('Elipse modes impacts arc')
  }


  if(thisOne()){
    rectMode(CORNER)
    rect(-80,-80,75,50)
    rectMode(CORNERS)
    rect(80,-80,75,50)
    rectMode(RADIUS)
    rect(-80,80,75,50)
    rectMode(CENTER)
    rect(80,80,75,50)
    testinfo.html('Rect modes')  
  }

  if(thisOne()){
    arc(40,40,150,150,0,2,OPEN)
    arc(-30,-30,150,150,millis()*0.0003,millis()*0.001,OPEN)
    testinfo.html('Open arc')
  }

  if(thisOne()){
    arc(40,40,150,150,0,2,CHORD)
    arc(-30,-30,150,150,millis()*0.0003,millis()*0.001,CHORD)
    testinfo.html('Chord arc')
  }

  if(thisOne()){
    arc(40,40,150,150,0,2,PIE)
    arc(-30,-30,150,150,millis()*0.0003,millis()*0.001,PIE)
    testinfo.html('Pie arc')
  }



  if(thisOne()){
    rect(0,0, 175, 125 );
    testinfo.html('Rectangle')
  }

  if(thisOne()){
    rect(0,0,  175, 125 , 25);
    testinfo.html('Rect, one radius argument')
  }

  if(thisOne()){
    rect(0,0,  175, 125 , 25, 10);
    testinfo.html('Rect, two radius arguments')
  }

  if(thisOne()){
    rect(0,0,  175, 125 , 25, 10, 55);
    testinfo.html('Rect, three radius arguments')
  }

  if(thisOne()){
    rect(0,0,  175, 125 , 25, 10, 15, 400);
    testinfo.html('Rect, four radius arguments')
  }

  if(thisOne()){
    rect(0,0,  175, 125 , 1000);
    testinfo.html('Rect, four radius arguments which are larger than the rect')
  }

  if(thisOne()){
    quad(-38, -51, 86, -20, 69, 63, 30, 76);
    fill(0,100, 250);
    quad(-100,-100, 0,-100, -150, -50, -100, 0);
    fill(200,100, 250);
    quad(100,-100, 0,-100, 150, -50, 100, 0);
    testinfo.html('Quad, with "bowtie" shapes')
  }

  if(thisOne()){
    triangle(-38, -51, 86, -20, 69, 63);
    fill(0,100, 250);
    triangle(38, 51, -69, -63, -86, 20);
    testinfo.html('Triangles, clockwise and counter-clockwise')
  }

 if(thisOne()){
    strokeWeight(floor(Math.cos(millis()/1000) * 20)+21)
    stroke(255, floor(millis()/10%255), floor((millis()-100)/10%255))
    line(-150,-150,100 + Math.cos(millis()/1000) * 50
                  ,100 + Math.sin(millis()/1000) * 50) 
   testinfo.html('Line, animated position, width, color')
  }


  if(thisOne()){
    strokeWeight(20)
    stroke(255,100,100)
    line(-80, -50, 80, -50);
    stroke(100,200,255)
    strokeCap(ROUND);
    line(-80, 0, 80, 0);
    strokeCap(SQUARE);
    line(-80, 50, 80, 50);
    strokeCap(PROJECT);
    line(-80, 90, 80, 90);
    testinfo.html('Reference line, and lines with stroke caps specified')
  }

  if(thisOne()){
    stroke(255, 0, 0);
    beginShape();
    // Exterior part of shape, clockwise winding
    vertex(-40, -40);
    vertex(40, -40);
    vertex(40, 40);
    vertex(-40, 40);
    // Interior part of shape, counter-clockwise winding
    beginContour();
    vertex(-20, -20);
    vertex(-20, 20);
    vertex(20, 20);
    vertex(20, -20);
    endContour();
    endShape(CLOSE);
    testinfo.html('Shape with contours')
  }

  if(thisOne()){
    noFill();
    strokeWeight(4);
    beginShape();
    vertex(20, 20);
    quadraticVertex(80, 20, 50, 50);
    quadraticVertex(20, 80, 80, 80);
    vertex(80, 60);
    endShape();
    testinfo.html('Shape with quadraticVertex')
  }

  if(thisOne()){
    stroke(255, 0, 0);
    beginShape();
    // Exterior part of shape, clockwise winding
    vertex(-40, -40);
    vertex(40, -40);
    vertex(40, 40);
    vertex(-40, 40);
    endShape(CLOSE);

    beginShape();
    // Exterior part of shape, clockwise winding
    vertex(-140, -140);
    vertex(-60, -140);
    vertex(-60, -60);
    vertex(-40, -80);
    endShape(CLOSE);
    
    beginShape();
    // Exterior part of shape, clockwise winding
    vertex(140, -140);
    vertex(60, -140);
    vertex(60, -60);
    vertex(40, -80);
    endShape(CLOSE);
    testinfo.html('Shapes with bowtie shapes')
  }

  if(thisOne()){
    strokeWeight(floor(Math.cos(millis()/1000) * 40)+1)
    stroke(255, floor(millis()/10%255), floor((millis()-100)/10%255))
    point(-20, -20)
    point(20, 40)
    testinfo.html('Points, with size and color animation')
  }

  if(thisOne()){
    background(0);
    noStroke();
    smooth();
    ellipse(-100, -100, 200, 200);
    noSmooth();
    ellipse( 100,  100, 200, 200);
    testinfo.html('Smooth test (no smooth is on the bottom right)')
  }
}

function thisOne(){
  //Helper function so the tests can be reordered easily
  n++
  return n == params.testID
}