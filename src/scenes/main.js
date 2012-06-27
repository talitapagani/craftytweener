Crafty.scene("main", function() {

	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", MouseHover, basketball, Tweener");

	entity.attr({x: 10, y: 75, z: 300})
		  .bind('Click', function(e) {
			this.addTween({x:450}, 'easeOutSine',100);
			this.addTween({y:500, rotation: 3600}, 'easeOutBounce',200, fading);
		  })
		  
	function fading() {
		entity.addTween({x:650, rotation: 4000},'easeOutBounce',500, remove);
	}
	
	function remove() {
		entity.removeComponent("Tweener");
	}

	entity.origin(entity.w/2, entity.h/2);

});
