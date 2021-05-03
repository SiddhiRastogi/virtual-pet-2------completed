//Create variables here
 var dog,happyDog;
 var database;
 var foodS,foodStock
 var foodObj

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  dog1Img = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000,600);
  database = firebase.database();
  
  dog = createSprite(500,400,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock,error)
  console.log(foodStock)

  feed = createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

foodObj = new Food()
}


function draw() { 
  background(46,139,87) 
  dog.display();
  drawSprites();
  //add styles here
 
  textSize(20);
  fill("black");
  text("Food Remaining :"+foodS , 100,100)

  foodObj.display();
  
}


function readStock(data){
foodS = data.val(); 
console.log(foodS);
foodObj.updateFoodStock(foodS)
}

function writeStock(foodS){
  database.ref('/').update({
    'food':foodS
  });
}
 function error(){
   console.log("error");
 }

 function feedDog(){
   dog.addImage(dog1Img);
   foodObj.deductFood();
   database.ref('/').update({
     food : foodObj.getFoodStock()
   })
   console.log(foodObj.getFoodStock);
 }

 function addFoods(){
   foodS++
   database.ref('/').update({
     food : foodS
   })
 }