
// positioning hero
var hero = {
    x: 400,
    y: 500
};

var enemies =[{x: 100, y: 80},{x: 200, y: 150},{x: 300, y: 50},{x: 400, y: 150},{x: 500, y: 250},{x: 600, y: 100},{x: 700, y: 200}];

var bullets = [];
var score = 0;


function displayHero() {
    document.querySelector("#hero").style["left"] = hero.x + "px";
    document.querySelector("#hero").style["right"] = hero.x + "px";
    document.querySelector("#hero").style["top"] = hero.y + "px";
    document.querySelector("#hero").style["bottom"] = hero.y + "px";
}

// displaying our enemies
function displayEnemy(){
    var enemy = "";
    for(var i = 0; i < enemies.length; i++){
        enemy += "<div class='enemy2' style='top:"+ enemies[i].y+"px; left:"+ enemies[i].x+"px;'></div>" 
    }
    document.querySelector("#enemies").innerHTML = enemy;
}

// moving the enemy
function moveEnemy(){
    for(var i = 0; i < enemies.length; i++){
        enemies[i].y += 7;
        if(enemies[i].y > 560){
            enemies[i].y = 0;
            enemies[i].x = Math.random() * 600;
        }
    }
}

// displaying our bullets
function displayBullets(){
    var customizedBullets = "";
    for(var i = 0; i < bullets.length; i++){
        customizedBullets += "<div class='bullet' style='top:"+ bullets[i].y+"px; left:"+ bullets[i].x+"px;'></div>" 
    }
    document.querySelector("#bullets").innerHTML = customizedBullets;
}

// moving the bullets
function moveBullets(){
    for(var i = 0; i < bullets.length; i++){
        bullets[i].y -= 6;
        if(bullets[i].y < 2){
            bullets[i] = bullets[bullets.length-1];     //switching the last index to be the first index
            bullets.pop();
        }
    }
}

// collision between bullets and enemy
function bulletAndEnemyCollision(){
    explode = "";
    for(var i = 0; i < bullets.length; i++){
        for(var j = 0; j < enemies.length; j++){
            if(Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10){
                score += 50;
                explode; 
            }
            // console.log(explode);
        }
    }
}

function heroAndEnemyCollision(){
    for(var i = 0; i < enemies.length; i++){
            if(Math.abs(hero.x - enemies[i].x) < 10 && Math.abs(hero.y - enemies[i].y) < 10){
                score -= 500;
            }
            // console.log(explode);
        }
}


// score update
function scoreUpdate(){
    document.querySelector("#score").innerText = score;
}

function endGame(){
    var end = "";
    var removed = "";
    for(var i = 0; i < enemies.length; i++){
        if(score < -1500){
            document.querySelector("#enemies").innerHTML = end;
            document.querySelector("h1").innerText = "Game Over";
        }
    }
}

// running the game
function gameUpdate(){
    displayHero();
    displayEnemy();
    moveEnemy();
    displayBullets();
    moveBullets();
    bulletAndEnemyCollision();
    scoreUpdate();
    heroAndEnemyCollision();
    endGame();
}
setInterval(gameUpdate, 100)

// moving our Hero
document.onkeydown = function(event){
    // console.log(event)
    if(event.key == "ArrowLeft"){
        hero.x -= 10;
    }
    else if(event.key == "ArrowUp"){
        hero.y -= 10;
    }
    else if(event.key == "ArrowRight"){
        hero.x += 10;
    }
    else if(event.key == "ArrowDown"){
        hero.y += 10;
    }
    else if(event.key == " "){          //spacebar
        bullets.push({x: hero.x + 18, y: hero.y - 20})
    }
    displayHero();
}