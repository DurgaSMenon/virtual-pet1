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
  
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock('foods')
  dog.addImage(dogImage1);
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


