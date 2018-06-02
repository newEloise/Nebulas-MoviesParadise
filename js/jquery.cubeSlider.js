(function($, global){
$.fn.polygon = function(options) {
	var ops = $.extend({
		num: 0,
		width: 100,
		height: 100,
		timer: false,
	}, options);

	var $content = $(this);
	var $child = $content.find('> *');
	var length = $child.length;

	var selectedNum = ops.num;
	var preSelectedNum;

	var deg = 360 / length;

	var r = deg / 2 * Math.PI / 180;
	var translateZ = ops.width / 2 / Math.tan (r);

	$child.css({
		width: ops.width,
		height: ops.height,
	});
	$child.each(function(i, el) {
		$(this).css({
			transform: 'rotateY(' + (deg * -(selectedNum - i)) + 'deg) ' +  'translateZ(' + translateZ +  'px)'
		})
	});

	$child.on('click', function() {
		if($(this).parent().hasClass('box2')){
			var index = $(this).index();
			move(index);
			if($(this).parent().hasClass('box1')){
				move(index,$('.box2'),120);
			}else if($(this).parent().hasClass('box2')){
				move(index,$('.box1'),70);
			}
		}
	});

	function move(num,element,boxLength) {
		if(element){
			var prev = preSelectedNum;
			
			selectedNum = num >= length ? 0 :
				num < 0 ? length - 1 : num;

			var amountOfMovement = getPositionNum(prev - selectedNum);
			var translateZ2 = boxLength / 2 / Math.tan (r);
			
			element.find('> *').each(function(i, el) {
				var y = parseFloat($(this).prop('style').transform.match(/rotateY\(([^deg)]+)/)[1]);
				$(this).css({
					transform: 'rotateY(' + (y + deg * amountOfMovement) + 'deg) ' +  'translateZ(' + translateZ2 +  'px)'
				})
			});
		}else{
			var prev = selectedNum;
			preSelectedNum = selectedNum;
		
			selectedNum = num >= length ? 0 :
				num < 0 ? length - 1 : num;

			var amountOfMovement = getPositionNum(prev - selectedNum);
			$child.each(function(i, el) {
				var y = parseFloat($(this).prop('style').transform.match(/rotateY\(([^deg)]+)/)[1]);

				$(this).css({
					transform: 'rotateY(' + (y + deg * amountOfMovement) + 'deg) ' +  'translateZ(' + translateZ +  'px)'
				})
			});
		}
	}

	function getPositionNum(positionNum) {
		if(Math.abs(positionNum) > Math.floor((length - 1) / 2)) {
			if(0 < positionNum) {
				return positionNum + -length;
			} else {
				return positionNum + length
			}
		} else {
			return positionNum;
		}
	}

	if(ops.timer) {
		var timer = {
			content: '',
			start: function() {
				this.content = setInterval(this.main, ops.timer);
			},
			stop: function() {
				clearInterval(this.content);
			},
			main: function() {
				move(selectedNum + 1);
			}
		};

		timer.start();
		$content.hover(function(){
			timer.stop();
		},function(){
			timer.start();
		});
	}
}
}(jQuery, this));