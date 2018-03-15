var MAX_ZOMBIE_HEALTH = 50;

function Zombie(x, y, mass){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
	this.desired = createVector(0, 0);
	this.steer = createVector(0, 0);
    this.target = createVector(0, 0);
	this.health = MAX_ZOMBIE_HEALTH;
    this.mass = mass;
    this.radius = 30;
}

Zombie.prototype = {

    update: function(){
		this.desired = this.target.copy().sub(this.position.copy()).normalize();
		this.steer = this.desired.copy().sub(this.velocity.copy());
        this.velocity.add(this.steer);
        this.position.add(this.velocity);
    },

    draw: function(){
		fill('red');
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
        this.drawHealth();
    },

    drawHealth: function(){
        fill('red');
        rect(this.position.x - 30, this.position.y - 40, 60, 15);
        fill('green');
        rect(this.position.x - 30, this.position.y - 40, this.health / MAX_ZOMBIE_HEALTH * 60, 15);
        fill('black');
        textSize(15);
        text(this.health, this.position.x - 5, this.position.y - 27);
    },

	checkcollision: function(position, radius){
		var d = p5.Vector.dist(this.position, position);
		if (d <= radius){
			return true
		}
		return false;
	}
}
