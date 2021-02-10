//Create variables here
var dog,happydog,database,foods,foodStock;

function preload(){

  dogImage=loadImage("images/dogImg.png");
  dogImage1=loadImage("images/dogImg1.png");

}


	//load images here


function setup() {
  createCanvas(500, 500);
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  

  
}


function draw() {  
background(46,139,87);
fedTIme=database.ref('feedTime');
fedTime.on("value",function(data){
  lastfed=data.val();
})

if(keyWentDown(UP_ARROW)){
  writeStock('foods')
  dog.addImage(dogImage1);
}
  FileList(255,255,254);
  textSize(15);
  if(lastFeb>-12){
    text("Last Feed :"+ lastFed%12 + "PM",350,30);
  }  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Fed :"+ lastFed +"AM",350,30);
  }

  if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed=2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  drawSprites();
 //add styles h
}

function readStock(data){
  foods=data.val();
}
 function writeStock(x){
   if(x<=0){
     x=0;
   }
    else{
      x=x-1;
    }
     database.ref('/').update({
       food:x
     })    
 }

function feedDog(){
  dog.addImage(happyDog);

  fooodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
