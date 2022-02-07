var halo , haloImg

var battle, battleImg

var alien, alienImg, alienGroup

var ground, invisibleImg, groundImage

var spaceship, spaceshipImg, spaceshipGroup


var gameState = "play"

function preload(){
 haloImg = loadImage("Halo.png")
 alienImg = loadImage("alien1.png","alien2.png")
 battleImg = loadImage("back.jpg")
 groundImage = loadImage("ground2.png");
 spaceshipImg = loadImage("Spaceship.png")
}

function setup() {
  createCanvas(600,600)
  battle = createSprite(290,320)
  battle.addImage("battle",battleImg)
  battle.scale = 1.1

  halo = createSprite(100,400)
  halo.addImage("halo",haloImg)
  halo.scale = 0.4

  ground = createSprite(200,450,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  alienGroup = createGroup();
  spaceshipGroup = createGroup();

  halo.setCollider("rectangle",0,0,halo.width,halo.height);
  halo.debug = true
}

function draw() {

  if(gameState === "play"){
    
    if(keyDown("space")&& halo.y >= 400) {
        halo.velocityY = -17;
    }
    halo.velocityY = halo.velocityY + 0.8

    ground.velocityX = -4

    if (ground.x < 0){
        ground.x = ground.width/2;
    }

    spawnalien();
    spawnship();

    if(alienGroup.isTouching(halo)){
      gameState = "end";
      // halo.velocityY = 0
      // halo.velocityX = 0
      // alienGroup.setLifetimeEach(0);
      // alienGroup.setVelocityXEach(0);  
      // spaceshipGroup.setVelocityXEach(0);
    }

    if(gameState === "end") {
      halo.velocityY = 0
      halo.velocityX = 0
      alienGroup.setLifetimeEach(-1);
      alienGroup.setVelocityXEach(0);  
      spaceshipGroup.setLifetimeEach(-1);
      spaceshipGroup.setVelocityXEach(0);
    } 

    halo.collide(ground);
  }

 ground.visible = false

 drawSprites();
 if(gameState == "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnalien() {
    if(frameCount % 105 === 0){
      alien = createSprite(625,425);
      alien.addImage("alien",alienImg);
      alien.velocityX= -9;
      alien.lifetime = 400;
      alien.scale = 0.2;
      alienGroup.add(alien);
     }
    
}
function spawnship() {
    if(frameCount % 190 === 0){
      spaceship = createSprite(625,200)
      spaceship.addImage("spaceship",spaceshipImg);
      spaceship.velocityX = -3;
      spaceship.lifetime = 400;
      spaceship.scale = 0.2;
      spaceship.depth = halo.depth;
      halo.depth = spaceship.depth + 1;
      spaceshipGroup.add(spaceship);
     }
    
}
