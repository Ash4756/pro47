var BG,BGImg;
var player, shooterImg, shooter_shooting;
var vampire, vImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var vampireGroup,bulletGroup;
var bullet
//Write code to declare variable for bullets & assign number of bullets
var bullets = 70;
//Declare variable for gamestate
var gameState = "fight"

function preload()
{
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  vImg = loadImage("vampire.png")

  BGImg = loadImage("BG.png")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  BG = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  BG.addImage(BGImg)
  BG.scale = 1.6
  

  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle",0,0,300,300)
  
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
   
  vampireGroup = new Group()
  //Create group for bullets
 bulletGroup = new Group()

}

function draw() 
{
  background(0); 
  //Write code to add GameState
  if(gameState==="fight")
  {
    if(keyDown("UP_ARROW")||touches.length>0)
    {
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0)
    {
      player.y = player.y+30
    }
    if(keyWentDown("space"))
  {
    //Write code create bullet sprite
    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    //Add velocity to bullet
    bullet.velocityX = 20;
    //Add bullet intothe group
    bulletGroup.add(bullet);
    //change the depth of player
    player.depth = bullet.depth
    player.depth = player.depth+2;
    player.addImage(shooter_shooting)
    //Decrease the count of bullet
    bullets = bullets-1;
  }

  else if(keyWentUp("space"))
  {
    player.addImage(shooterImg)
  }
  //Write code to change the gamestate when number of bullet=0
  if(bullets==0)
  {
    gameState = "bullet";
  }

  //write code to destroy the zombie when bullet touches it
  //refer the code we wrote for destroying player
  if(vampireGroup.isTouching(bulletGroup))
  {
    for(var i=0;i<vampireGroup.length;i++)
    {     
      if(vampireGroup[i].isTouching(bulletGroup))
      {
        vampireGroup[i].destroy();
        bulletGroup.destroyEach();
      } 
    }
  }

  
  if(vampireGroup.isTouching(player))
  {
    for(var i=0;i<vampireGroup.length;i++)
    {     
      if(vampireGroup[i].isTouching(player))
      {
        vampireGroup[i].destroy()
      } 
    }
  }
  enemy();

  }
  
  
  

  
  

drawSprites();

//write code destroy zombie and player and display a message in gameState "lost"
if(gameState=="lost")
{
  textSize(100);
  fill("red");
  text("you lost!",400,400);
  vampireGroup.destroyEach();
  player.destroy();
}

//write code destroy zombie and player and display a message in gameState "won"
 else if(gameState=="won")
{
  textSize(100);
  fill("yellow");
  text("you won!",400,400);
  vampireGroup.destroyEach();
  player.destroy();
}
//write code destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState=="bullet")
{
  textSize(100);
  fill("yellow");
  text("you ran out of bullets!",470,410);
  vampireGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}

}
function enemy()
{
  if(frameCount%50===0)
  {
    vampire = createSprite(random(500,1100),random(100,500),40,40)
    vampire.addImage(vImg)
    vampire.scale = 0.15
    vampire.velocityX = -3
    vampire.debug= true
    vampire.setCollider("rectangle",0,0,400,400)
    vampire.lifetime = 400
    vampireGroup.add(vampire)
  }
}
