var img;
var wheelPos = 100020;


function preload(){
	img = loadImage("assets/ColorGrid.png");
}
// true false
function setup(){
	if(true){
		createCanvas(300,700,WEBGL)		
	} else {
		createCanvas(300,700)		
	}

}

function draw(){
	background(230)
	strokeWeight(10);
	fill(300,100,0)

	//noFill()
    //
   
    var bSwitch = 1
     var grid = 0
    

    if(_renderer.name != 'p5.Renderer2D'){
    	rotateY(frameCount * 0.01)
    	translate(-width/2, -height/2)
    	texture(img);   
    } 
    
//Config to vary the tests
    var d1     = 200
    var d2     = 200
    var start  = 0
    var eA     = 0
    var detail = shapeScroll();
    //rectMode(CENTER)

    

    	rect(110, 60,  100, 50 );
    rect(110, 60, -100, 50 );
    rect(110, 60, -100, -50);
    rect(110, 60,  100, -50);

    rect(110, 170,  100, 50 , 5);
    rect(110, 170, -100, 50 , 5);
    rect(110, 170, -100, -50, 5);
    rect(110, 170,  100, -50, 5);

    rect(110, 280,  100, 50 , 5, 10);
    rect(110, 280, -100, 50 , 5, 10);
    rect(110, 280, -100, -50, 5, 10);
    rect(110, 280,  100, -50, 5, 10);

   rect(110, 390,  100, 50 , 5, 10, 15);
    rect(110, 390, -100, 50 , 5, 10, 15);
    rect(110, 390, -100, -50, 5, 10, 15);
    rect(110, 390,  100, -50, 5, 10, 15);

   rect(110, 500,  100, 50 , 5, 10, 15, 40, 1);
    rect(110, 500, -100, 50 , 5, 10, 15, 40, 2);
    rect(110, 500, -100, -50, 5, 10, 15, 40, 3);
    rect(110, 500,  100, -50, 5, 10, 15, 40, 4);
    


    
noLoop();

}


function mouseWheel(event) {
  wheelPos += event.delta > 0 ? -1 : 1;
}


function shapeScroll(){
  return wheelPos % 40 + 3 ;
}