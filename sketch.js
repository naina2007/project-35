var balloon,balloonImg;
var background,backgroundImg;
var database;;
var height;

function preload() {
  balloonImg = loadImage("balloon01.png");
  backgroundImg = loadImage("background.png");
  

}

function setup() {
  createCanvas(800,400);

  database=firebase.database();
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readValue,showError)


  balloon = createSprite(250,100,20,20);
  balloon.addImage(balloonImg,"Balloon");
  balloon.scale = 0.3;
  
}

function draw() {
  background(backgroundImg,"Background"); 

  fill("black");
  text("Use Arrow Keys to move the Balloon!",10,30);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
    }
else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
}
else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y - 10;
    balloon.scale = 0.35;
}
else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y + 10;
    balloon.scale = 0.25;
  }

  drawSprites();
}

function changeHeight(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readValue(data) {
  position = data.val();

  balloon.x = height.x;
  balloon.y = height.y;

}

function showError() {
  console.log("Error in connecting to Database");
}

function writePosition(x,y) {
  database.ref('balloon/height').set({
      'x' : height.x + x,
      'y' : height.y + y,
  })    

}