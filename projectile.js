
var MAX_BULLET_VELOCITY = 20;

function Projectile(target, position, mass){
    this.position = position;
    this.velocity = (target.sub(position)).normalize().mult(MAX_BULLET_VELOCITY);
    this.mass = mass;
    this.radius = 6;
}

Projectile.prototype = {

    update: function(){
        this.position.add(this.velocity);
    },

    draw: function(){
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    },

	checkbounds: function(){
		if (this.position.x > width || this.position.x < 0){
			return true;
		}
		if (this.position.y > height || this.position.y < 0){
			return true;
		}
		return false;
	}


}
