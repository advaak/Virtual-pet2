class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.Image = loadImage("images/Milk.png");

    }
    updateFoodStock(f){
        this.foodStock=f;

    }
    getFedTime(last){
        this.lastFed = last;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;

        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
        var x = 80
        var y = 200
        imageMode(CENTER);
        image(this.Image, 720,220, 70, 70)

        if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 80;
                    y = y+50;
                }
                image(this.Image, x, y, 50, 50)
                x = x+30;
            }

        }
    }
}