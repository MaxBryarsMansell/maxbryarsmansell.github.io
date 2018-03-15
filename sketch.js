
var level;

function setup() {
    createCanvas(800, 800);
    level = new Level();
}

function draw() {
     background(127);
     level.update();

}

function mouseClicked() {
    level.player.addProjectile();
}
