var MAX_ZOMBIES = 2;


function Level(){
    this.zombies = [];
	this.objective_health = 1000;
	this.zombiesKilled = 0;
	this.player = new Player(300, 300, 10);
	this.OBJ_POSITION = createVector(width / 2, 100);
}

Level.prototype = {

    update: function(){
		if (this.objective_health >= 0 && this.player.health >= 0){
			fill('yellow');
			textSize(35);
	        text("Zombies killed: " + this.zombiesKilled, 2, 30);
			this.drawObjective();
			this.player.draw();
			this.player.update();
			if (this.zombies.length < MAX_ZOMBIES && random() < 0.1){
				this.addZombie();
			}
			if (this.zombies.length > 0){
				for (z = this.zombies.length - 1; z > 0; z--){
					this.zombies[z].update(createVector(0, 0));
					this.zombies[z].draw();
					if (this.zombies[z].checkcollision(this.OBJ_POSITION.copy(), (this.objective_health * 0.1) + 5)){
						this.objective_health -= round(random(0.5, 4));
					}
					var dToP = p5.Vector.dist(this.player.position, this.zombies[z].position);
					var dToO = p5.Vector.dist(this.OBJ_POSITION.copy(), this.zombies[z].position);
					for (p = this.player.projectiles.length - 1; p > 0; p--){
						if (this.zombies[z].checkcollision(this.player.projectiles[p].position.copy(), 30)){
							this.zombies[z].position.add(this.player.projectiles[p].velocity.copy().mult(0.5));
							this.zombies[z].health -= round(random(1, 8));
						}
					}
					if (dToP < 30){
						this.player.health -= round(random(0.1, 2));
					}

					if (dToP < 150){
						this.zombies[z].target = this.player.position.copy().sub(0, -15);
					} else {
						if (this.zombies[z].position.y < 500){
							this.zombies[z].target = this.OBJ_POSITION.copy();
						} else{
							this.zombies[z].target = this.player.position.copy().sub(0, -15);
						}
					}
					if (this.zombies[z].health <= 0){
						if (this.zombiesKilled % 5 == 0){
							MAX_ZOMBIES += 2;
						}
						this.zombiesKilled += 1;
						this.zombies.splice(z, 1);
					}

				}
			}

			this.drawObjHealth();
		}else{
			textSize(60);
			fill('blue');
			text("YOU LOSE. SCORE: " + this.zombiesKilled, 50, height / 2);
		}

    },

	drawObjHealth: function(){
		fill('black');
		textSize(32);
        text(this.objective_health, this.OBJ_POSITION.copy().x - 35, this.OBJ_POSITION.copy().y);
    },

    drawObjective: function(){
        fill('green');
		ellipse(this.OBJ_POSITION.copy().x, this.OBJ_POSITION.copy().y, this.objective_health * 0.2, this.objective_health * 0.2);
    },

    addZombie: function(){
		var x = random(0, width);
		var y = random(height, height + 50);

        this.zombies.push(new Zombie(x, y, 10));
    }
}
