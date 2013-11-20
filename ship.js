(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Ship = Asteroids.Ship = function (pos, vel, radius, color) {
		Asteroids.MovingObject.call(this, pos, vel, radius, color);
	};

	Ship.COLOR = "green";
	Ship.RADIUS = 10;
	Ship.MAX_VEL = 15;

	Ship.inherits(Asteroids.MovingObject);

	Ship.buildShip = function(pos) {
		return new Ship(pos, [0,0], Ship.RADIUS, Ship.COLOR);
	}

	Ship.prototype.power = function(impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
		if (this.vel[0] > Ship.MAX_VEL) {
			this.vel[0] = Ship.MAX_VEL;
		}
		if (this.vel[0] < -1 * Ship.MAX_VEL) {
			this.vel[0] = -1 * Ship.MAX_VEL;
		}
		if (this.vel[1] > Ship.MAX_VEL) {
			this.vel[1] = Ship.MAX_VEL;
		}
		if (this.vel[1] < -1 * Ship.MAX_VEL) {
			this.vel[1] = -1 * Ship.MAX_VEL;
		}
	}

	Ship.prototype.fireBullet = function() {
		console.log(this.vel);
		var bullet = new Asteroids.Bullet(this.pos, this.vel, 2, "red");
		console.log(bullet);
		return bullet;
	}
})(this)