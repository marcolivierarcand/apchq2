var $parent = $('[data-fix-inner-parent]');
var $child = $('[data-fix-inner-child]');
var getParentPadding = (parent) => parent.innerHeight() - parent.height();

var run = () => {
	let heights = [];
	
	$parent.each(function(){
		$(this).css({'height': ''});
		$(this).find($child).each(function(){
			heights.push($(this).outerHeight());
		});
		var highest = Math.max.apply(Math, heights);
		var parentPadding = getParentPadding($(this));
		$(this).css({
			'height': highest + parentPadding
		})
	});
}

var init = () => {
	run();
	$(window).on('resize', run);
}

module.exports = {
	init,
	run,
}