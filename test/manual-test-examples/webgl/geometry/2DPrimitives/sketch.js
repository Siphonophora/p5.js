var totalTests = 4
var params


function setup(){
  if(mode === '3d'){
    createCanvas(400,400,WEBGL);
    console.log('3d loaded')
  } else {
    createCanvas(400,400);
    console.log('2d loaded')
  }

  params = getURLParams();

}

function draw(){
  if(mode === '2d'){ 
  	translate(200,200)
  }
  background(180)
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


  if(params.testID == 1){
  	ellipse(0,0,150,150)	 
  }
  
  if(params.testID == 2){
  	ellipse(0,0,150,100)	
  }

  if(params.testID == 3){
  	rect(0,0,150,150)
  }

  if(params.testID == 4){
    arc(0,0,150,150,0,2,OPEN)
  }

  if(params.testID == 5){
    rect(0,0, 175, 125 );
    rect(0,0,-175, 125 );
    rect(0,0,-175, -125);
    rect(0,0, 175, -125);
  }

  if(params.testID == 6){
    rect(0,0,  175, 125 , 5);
    rect(0,0, -175, 125 , 5);
    rect(0,0, -175, -125, 5);
    rect(0,0,  175, -125, 5);
  }

  if(params.testID == 7){
    rect(0,0,  175, 125 , 5, 10);
    rect(0,0, -175, 125 , 5, 10);
    rect(0,0, -175, -125, 5, 10);
    rect(0,0,  175, -125, 5, 10);
  }

  if(params.testID == 8){
    rect(0,0,  175, 125 , 5, 10, 15);
    rect(0,0, -175, 125 , 5, 10, 15);
    rect(0,0, -175, -125, 5, 10, 15);
    rect(0,0,  175, -125, 5, 10, 15);
  }

  if(params.testID == 9){
    rect(0,0,  175, 125 , 5, 10, 15, 40, 1);
    rect(0,0, -175, 125 , 5, 10, 15, 40, 2);
    rect(0,0, -175, -125, 5, 10, 15, 40, 3);
    rect(0,0,  175, -125, 5, 10, 15, 40, 4);
  }

}

