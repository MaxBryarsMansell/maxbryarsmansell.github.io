function Entity(x,y,world){
	this.x = x;
	this.y = y;
	this.tv = createVector(0,0);
	this.v = createVector(0,0);
}

Entity.prototype.display = function() {
	ellipse(this.x,this.y,60)
}
Entity.prototype.update = function(gravity,dt) {
	this.v.y += gravity * dt; 
	this.v.x = lerp(this.v.x,this.tv.x, 0.2);
	this.x += this.v.x * dt;
	this.y += this.v.y * dt;
}
Entity.prototype.collides = function() {
	if (this.x + 30 >= width){
		this.x = width - 30
	}
	if (this.x - 30 <= 0){
		this.x = 0 + 30
	}
	if (this.y + 30 >= height){
		this.y = height - 30
	}
}