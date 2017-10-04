var totalTests = 3

function setup(){
  if(mode === '3d'){
    createCanvas(400,400,WEBGL);
    console.log('3d loaded')
  } else {
    createCanvas(400,400);
    console.log('2d loaded')
  }
}

function draw(){
  if(mode === '2d'){ 
  	translate(200,200)
  }
  background(180)
  fill(250,100,0);
  stroke(0);
  line(-200,0,200,0)
  line(0,-200,0,200)
  line(-100,100,-100,-100)
  line( 100,100,100,-100)
  line(-100,100,100,100)
  line(-100,-100,100,-100)

  if(floor(millis()/1000)/totalTests%3 === 1){
  	noStroke();
  } else if (floor(millis()/1000)/totalTests%3 === 2){
  	noFill();
  }

  if(showTest(1)){
  	ellipse(0,0,150,150)	
  }
  
  if(showTest(2)){
  	ellipse(0,0,150,100)	
  }

  if(showTest(3)){
  	rect(0,0,150,150)
  }

}

function showTest(n){
	return floor(millis()/1000)%totalTests + 1 === n
}

