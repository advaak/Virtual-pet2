//Create variables here
var doghappy, dogsad, dog;
var db;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
function preload()
{
  //load images here
  dogsad = loadImage("images/dogImg.png")
  doghappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  db = firebase.database();
  foodObj = new Food();



  dog = createSprite(250,300, 100,100);
  dog.addImage(dogsad);
  dog.scale =0.1;

  foodStock = db.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime = db.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();

});
textSize(15);
fill("red");
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 +"PM", 350, 30);
}
else if(lastFed ==0){
  text("Last Feed : 12AM", 350,30)

}
else{
  text("Last Feed:"+ lastFed+"AM", 350,30);
}
  drawSprites();
  //add styles here


}


function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(doghappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

