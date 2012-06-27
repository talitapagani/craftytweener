# Tweener for CraftyJS
A CraftyJS component to animate 2D properties with easing effects, inspired by (Tweener Class for ActionScript/Flash platform)[http://code.google.com/p/tweener/].
The easing equations are based on (Robert Penner's original easing equations)[http://www.robertpenner.com/easing/], with terms of use properly included on the uncompressed code.
It doesn't conflict with Crafty's Tween core component.

***

##Available Transitions
The available easing transitions are:
* Linear ('linear')
* Quadratic ('easeInQuad', 'easeOutQuad', 'easeInOutQuad')
* Cubic ('easeInCubic', 'easeOutCubic', 'easeInOutCubic')
* Quartic ('easeInQuart', 'easeOutQuart', 'easeInOutQuart')
* Quintic ('easeInQuint', 'easeOutQuint', 'easeInOutQuint')
* Sinusoidal ('easeInSine', 'easeOutSine', 'easeInOutSine')
* Exponential ('easeInExpo', 'easeOutExpo', 'easeInOutExpo')
* Circular ('easeInCirc', 'easeOutCirc', 'easeInOutCirc')
* Elastic ('easeInElastic', 'easeOutElastic', 'easeInOutElastic')
* Back ('easeInBack', 'easeOutBack', 'easeInOutBack')
* Bounce ('easeInBounce', 'easeOutBounce', 'easeInOutBounce')

##Using Tweener
The CraftyJS Tweener is called by an entity with the method .tween, similar no native Crafty Tween, however the method signature is:

```javascript
.addTween(Object properties[, String transition[, Number duration[, Function onComplete[, Array onCompleteParams]]]])
```

Where:
* properties: object of 2D properties and what they should animate to
* easing effect to be applied to the animation. If not specified, the default is "easeOutExpo"
* duration: duration to animate the properties over (in frames). If not specified, the default is 50 frames (1 second)
* onComplete: callback function to be executed after tween is finished
* onCompleteParams: comma-delimited array of params to be executed by the callback function

This method will animate a 2D entities properties over the specified duration. These include 'x', 'y', 'w', 'h', 'alpha' and 'rotation'. It's also possible to set multiple tweens.

##Examples

```javascript
Crafty.modules({ tweener: 'DEV' }, function () {
    
    // Move an object to 100,100 with bounce transition in 200 frames.
    Crafty.e("2D, Tweener")
	.attr({x: 0, y: 0})
	.addTween({x: 100, y: 100}, 'easeOutBounce', 200)
	
	// Move an object to 650 on x-axis and 1080 degrees on rotation with quadratic transition in 100 frames and
	// 500 on y-axis with bounce transition in 200 frames.
	Crafty.e("2D, Tweener")
		.attr({x: 10, y: 75})
		.addTween({x:650, rotation: 1080}, 'easeInQuad',100);
		.addTween({y:500}, 'easeOutBounce',200);
	   
	// Passing a callback function to be executed on tween end
	Crafty.e("2D, Tweener")
		.attr({x: 0, y: 0})
		.addTween({x: 100, y: 100}, 'easeOutBounce', 200, func)
	
	Crafty.e("2D, Tweener")
	.attr({x: 50, y: 50})
	.addTween({x: 150, y: 150}, 'easeOutBounce', 300, func, ["Passing parameters to callback!"])
	
	function func(message) {
		if (message != undefined) {
			alert(message);
		} else {
			alert("Callback function without parameters");
		}
	}
});
```