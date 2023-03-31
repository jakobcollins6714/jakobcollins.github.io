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
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 600, "y": groundY - 1},
                { "type": "sawblade", "x": 900, "y": groundY - 110},
                { "type": "sawblade", "x": 1000, "y": groundY - 110},
                { "type": "sawblade", "x": 1200, "y": groundY - 1},
                { "type": "sawblade", "x": 1350, "y": groundY - 110},
                { "type": "sawblade", "x": 1500, "y": groundY - 1},
                { "type": "sawblade", "x": 1650, "y": groundY - 110},
                { "type": "sawblade", "x": 1850, "y": groundY - 1},
                { "type": "sawblade", "x": 2050, "y": groundY - 110},
                { "type": "sawblade", "x": 2350, "y": groundY - 1},
                { "type": "sawblade", "x": 2550, "y": groundY - 110},



                { "type": "enemy", "x": 650, "y": groundY - 50},
                { "type": "enemy", "x": 1000, "y": groundY - 50},
                { "type": "enemy", "x": 1500, "y": groundY - 50},
                { "type": "enemy", "x": 2000, "y": groundY - 50},

                { "type": "reward", "x": 400, "y": groundY - 100},
                { "type": "reward", "x": 600, "y": groundY - 100},
                { "type": "reward", "x": 800, "y": groundY - 100},
                { "type": "reward", "x": 1000, "y": groundY - 100},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
           
        }

       

        
        function createEnemy(x, y){
            var enemy = game.createGameItem("enemy", 25); 
            var redSquare = draw.rect(50, 50, "red");
             redSquare.x = -25;
           redSquare.y = -25;
           enemy.addChild(redSquare);
           enemy.x = x;
           enemy.y = y;
           game.addGameItem(enemy);
           enemy.velocityX = -2;
   
   
   
           enemy.onPlayerCollision = function (){
               game.changeIntegrity(-10);
   
           }
           enemy.onProjectileCollision = function(){
            game.increaseScore(1000);
            enemy.flyTo(600, 0);
            }
        }
       
        

        function createReward(x, y){
            var reward = game.createGameItem("reward", 25);
            var gameItem = draw.rect(50, 50, "blue");
            gameItem.x = -25;
            gameItem.y = -25;
            reward.addChild(gameItem);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
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
