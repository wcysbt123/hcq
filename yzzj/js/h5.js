(function PageResize() {
	(function getResize() {
		var width = window.innerWidth || window.documentElement.clientWidth || window.body.clientWidth;
		width > 750 ? width = 750 : null;
		width < 320 ? width = 320 : null;
		document.documentElement.style.fontSize = (width * (100 / 375)) + 'px';
		if (!window.onresize) {
			window.onresize = function() {
				delayFunc(getResize);
			}
		}
	})()
	// 延迟计算加个延迟是为了 当窗口发现变化 页面不是瞬间变化 有个变化的延迟 用户体验更好 
	var timer;
	var delayFunc = function(fn) {
		var delay = 300; // 根据实际情况可调整延迟时间
		// 这里延时执行你的函数
		timer = setTimeout(function() {
			fn();
		}, delay);
	};
})();

var clientHeight = 0;
if (document.body.clientHeight && document.documentElement.clientHeight) {
	var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight :
		document.documentElement.clientHeight;
} else {
	var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight :
		document.documentElement.clientHeight;
}
$("body").height(clientHeight + "px");

