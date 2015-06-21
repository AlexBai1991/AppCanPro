;(function (win) {
	var test = function (arg) {
		console.log(arg);
	};
	win.tmp = {
		name: "tmpClass",
		test: test	
	};
})(window);
