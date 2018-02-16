var gravity;
var time = 0
var lastTime = 0


function setup() {
    createCanvas(1000,500);
    frameRate(60)
    e = new Player(width/2,height/2);
}

function draw() {
    dt = calcDt() / 1000
    gravity = (abs(e.v.x) + 5) / 25
    background(51);
    
    e.update(gravity,dt * 100);
    e.collides();

    e.display();

    fill(54,175,194);
    textSize(32);
    text("Gravity: " + round(gravity * 100),15,40)
    
}


function keyPressed() {
    if (keyCode === 68) {
        e.tv.x = 20;
    } 
    if (keyCode === 65) {
        e.tv.x = -20;
    } 
    if (keyCode === 32 && e.canJump()) {
        e.jump();
    } 
}
function keyReleased() {
    if (keyCode === 68) {
        e.tv.x = 0;
    } 
    if (keyCode === 65) {
        e.tv.x = 0;
    } 

}

calcDt = function(){
    lastTime = time
    time = millis()
    dt = time - lastTime
    if (dt > 150){
        dt = 150
    }
    return dt
}