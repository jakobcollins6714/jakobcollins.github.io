var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 130},
                { "type": "sawblade", "x": 600, "y": groundY - .1},
                { "type": "sawblade", "x": 900, "y": groundY - 130},
                { "type": "sawblade", "x": 1000, "y": groundY - 130},
                { "type": "sawblade", "x": 1200, "y": groundY - .1},
                { "type": "sawblade", "x": 1350, "y": groundY - 130},
                { "type": "sawblade", "x": 1500, "y": groundY - .1},
                { "type": "sawblade", "x": 1650, "y": groundY - 130},
                { "type": "sawblade", "x": 1850, "y": groundY - .1},
                { "type": "sawblade", "x": 2050, "y": groundY - 130},
                { "type": "sawblade", "x": 2350, "y": groundY - .1},
                { "type": "sawblade", "x": 2650, "y": groundY - 130},
                { "type": "sawblade", "x": 2750, "y": groundY - 130},
                { "type": "sawblade", "x": 2850, "y": groundY - 130},
                { "type": "sawblade", "x": 2950, "y": groundY - 150},
                { "type": "sawblade", "x": 3150, "y": groundY - 150},
                { "type": "sawblade", "x": 3250, "y": groundY - 130},
                { "type": "sawblade", "x": 3350, "y": groundY - 130},




                { "type": "enemy", "x": 650, "y": groundY - 50},
                { "type": "enemy", "x": 1000, "y": groundY - 50},
                { "type": "enemy", "x": 1500, "y": groundY - 50},
                { "type": "enemy", "x": 3000, "y": groundY - 50},
                { "type": "enemy", "x": 3110, "y": groundY - 50},
                { "type": "enemy", "x": 3200, "y": groundY - 50},
                { "type": "enemy", "x": 3300, "y": groundY - 50},
                { "type": "enemy", "x": 3400, "y": groundY - 50},

                { "type": "reward", "x": 400, "y": groundY - 100},
                { "type": "reward", "x": 600, "y": groundY - 100},
                { "type": "reward", "x": 800, "y": groundY - 100},
                { "type": "reward", "x": 1000, "y": groundY - 100},
                { "type": "reward", "x": 1150, "y": groundY - 100},
                { "type": "reward", "x": 1350, "y": groundY - 100},
                { "type": "reward", "x": 1450, "y": groundY - 100},
                { "type": "reward", "x": 3020, "y": groundY - 140},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25; //hit zone size of saw blade
            var damageFromObstacle = 10; // dammage of the sawblade
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creation of the hit zone
            sawBladeHitZone.x = x; //x of the saw blade
            sawBladeHitZone.y = y; //y of the saw blade
            game.addGameItem(sawBladeHitZone); // game add saw blade
            var obstacleImage = draw.bitmap("img/sawblade.png"); // saw blade logo or picture
            sawBladeHitZone.addChild(obstacleImage); // hit zone of the saw blade immage
            obstacleImage.x = -25; //placment of the saw blade
            obstacleImage.y = -25; // placment of the saw blade
           
        }

       

        
        function createEnemy(x, y){ // creation of the enemy
            var enemy = game.createGameItem("enemy", 25);  // variable of the enemy
            var redSquare = draw.bitmap("img/joe1.png"); // color of the enemy object
             redSquare.x = -30; // enemy object placment
           redSquare.y = -30; // enemy object placment
           enemy.addChild(redSquare); // game add enemy red square
           enemy.x = x; // enemy x
           enemy.y = y; // enemy y
           game.addGameItem(enemy);// game add item enemy
           enemy.velocityX = -2; // velocity of the enemy object
           redSquare.scaleX = 0.15;
           redSquare.scaleY = 0.15;
   
   
           enemy.onPlayerCollision = function (){ // enemy player collision
               game.changeIntegrity(-10); // integrity change for enemy
   
           }
           enemy.onProjectileCollision = function(){ // enemy projectile collision
            game.increaseScore(1000); // score increase for game
            enemy.flyTo(600, 0); // enemy fly control x, y
            }
        }
       
        

        function createReward(x, y){ // game create reward
            var reward = game.createGameItem("reward", 25); // game creation variable for reward
            var gameItem = draw.bitmap("img/burger1.png"); // game reward color and shape
            gameItem.x = -30; // game reward position
            gameItem.y = -30; // game reward position
            reward.addChild(gameItem); // reward game child add
            reward.x = x; // reward x
            reward.y = y; // reward y
            game.addGameItem(reward); // game add item reward
            reward.velocityX = -2; // the velocity of the reward
          gameItem.scaleX = 0.09;
          gameItem.scaleY = 0.09;
          
            reward.onPlayerCollision = function (){
                game.changeIntegrity(-10);
                reward.flyTo(600, 0);
            }
           
            
        }
       
       // loop for gameItems
       for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i]; // assigns the current index of the gameitems array to the var gameitem
      
            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }
            
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }
      
            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y);
            }
      
        }
       
       
       
       
       
       
       
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
