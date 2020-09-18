var treximage, trex, groundimage, ground, invisible, cloudimage, cloud, collided, obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6, cactus, rand, score, gameover, restart, gameoverimg, restartimg, cactusGroup, cloudGroup;

var PLAY=1;
var END=0;

var gamestate=PLAY;

function preload(){
treximage=loadAnimation("trex1.png", "trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  collided=loadImage("trex_collided.png");
  
  obstacles1=loadImage("obstacle1.png");
  obstacles2=loadImage("obstacle2.png");
  obstacles3=loadImage("obstacle3.png");
  obstacles4=loadImage("obstacle4.png");
  obstacles5=loadImage("obstacle5.png");
  obstacles6=loadImage("obstacle6.png");
  
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,170,10,10);
  trex.addAnimation("rex",treximage);
  trex.addAnimation("c",collided);
  trex.scale=0.5;
  trex.setCollider("circle", 0, 0, 40);
  trex.debug=true;
  
  ground = createSprite(300, 185, 600, 10);
  ground.addImage("g",groundimage);
  
  invisible = createSprite(300, 190, 600, 5);
  invisible.visible=false;
  
  gameover =  createSprite(300, 60, 10, 10);
  gameover.addImage("o",gameoverimg);
  gameover.visible=false;
  
  restart = createSprite(300, 110, 10, 10);
  restart.addImage("r", restartimg);
  restart.visible=false;
  
  cactusGroup=new Group();
  cloudGroup=new Group();
  
  score=0;
  
}

function draw() {
  background("white");
  console.log(trex.y);
  text("Score: "+score, 480, 20);
  if(gamestate===PLAY){
      if(frameCount%4===0){
    score=score+1;
  }
    ground.velocityX=-3;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  gameover.visible=false;
  restart.visible=false;
    
  if(keyDown("space")&&trex.y>=164.4){
    trex.velocityY=-10;
  }
  trex.velocityY=trex.velocityY+0.4;
  clouds();
  obstacles();
    if(cactusGroup.isTouching(trex)){
      gamestate=END;
    }
  }
  else if(gamestate===END){
    gameover.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1)
    
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("c", collided);
    trex.velocityY=0;
    if(mousePressedOver(restart)&&gamestate===END){
     reset();
     }
  }
  
  trex.collide(invisible);
  
    //score=score+Math.round(getFrameRate()/60)

  drawSprites();
}

function clouds(){
  if(frameCount%60===0){
  cloud=createSprite(600, 50, 10, 10);
  cloud.y=Math.round(random(10,130));
  cloud.addImage("c",cloudimage);
  cloud.velocityX=-3;
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
  cloudGroup.add(cloud);
  }
  
}
function obstacles(){
  if(frameCount%70===0){
    cactus=createSprite(600, 170, 10, 10);
    rand=Math.round(random(1, 6));
    cactusGroup.add(cactus);
    switch(rand){
      case 1:cactus.addImage(obstacles1);
        break;
        case 2:cactus.addImage(obstacles2);
        break;
        case 3:cactus.addImage(obstacles3);
        break;
        case 4:cactus.addImage(obstacles4);
        break;
        case 5:cactus.addImage(obstacles5);
        break;
        case 6:cactus.addImage(obstacles6);
        break;
        default:break;
    }
    cactus.velocityX=-4;
    cactus.lifetime=150;
    cactus.scale=0.6;
  }
}

function reset(){
gamestate=PLAY;
  score=0;
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
  trex.changeAnimation("rex", treximage);
}