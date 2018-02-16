function Player(x,y,world){
	Entity.call(this,x,y,world);
};
Player.prototype = Object.create(Entity.prototype);

// correct the constructor pointer because it points to Person
Player.prototype.constructor = Player;

Player.prototype.jump = function(){
	this.v.y = -10
}

Player.prototype.canJump = function(){
	if (this.y + 30 === height){
		return true
	}
	return false
}