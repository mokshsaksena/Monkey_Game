
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var score, survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  var survivalTime = 0
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale=0.1
 
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  score = 0;
  
}


function draw() {

  background(255);

  if(ground.x < 0) {
ground.x = ground.width / 2;
}

  if(keyDown("space") ) {
monkey.velocityY = -12;
}

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  stroke("green")
  textSize(20)
  fill("green")
  text("SCORE: " + score, 200, 50)
  
    
 
  
  
  if(ObstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
  ObstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  
  ObstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
    
   
  }else{
     stroke("black")
  fill("black")
    survivalTime = Math.ceil(frameCount/ frameRate())
  
 
  }
  
   text("Survival Time: " + survivalTime, 200, 100)

  
  if(FoodGroup.isTouching(monkey)){
    score = score + 1
    
  }
}

function spawnFood() {

if (frameCount % 80 === 0) {
banana = createSprite(600, 250, 40, 10);
banana.y = random(120, 200);
banana.velocityX = -5;

banana.lifetime = 300;
monkey.depth = banana.depth + 1;

banana.addImage(bananaImage);
banana.scale=0.1;

FoodGroup.add(banana);
}
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(300, 320, 10, 40);
    obstacle.velocityX = -4; 
    
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 250;
    
    ObstacleGroup.add(obstacle);
  }
}
