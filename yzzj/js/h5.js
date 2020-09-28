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

var time;
$(".tab .item").on("tap", function() {
	var num = $(".tab .item").index(this);
	//var width = window.innerWidth || window.documentElement.clientWidth || window.body.clientWidth;
	//var selWidth = $(".tab").width() / (width * (100 / 375)) - 1.4;

	$(".tab .item").stop();
	$(".main-container").children().stop();
	
	$(".tab .item.selected").removeClass("selected");
	
	$(this).animate({
		//width: "1.71rem",
		backgroundColor: "#be0a13",
		opacity: "1"
	});
	$(this).children(".tab-icon").animate({
		backgroundColor: "#fff",
		boxShadow: "0rem 0.07rem 0.05rem 0rem rgba(146, 10, 17, 0.56)"
	},600)
	$(this).children(".tab-icon").children("i").animate({
		fontSize: "0.2rem",
		color: "#BE0A13",
		opacity: "1"
	})
	$(this).children(".tab-words").fadeIn(600);
	
	$(this).addClass("selected");
	
	$(".tab .item").not(".selected").each(function() {
		$(this).animate({
			//width: "0.6rem",
			backgroundColor: "#eae7e8",
		});
		$(this).children(".tab-icon").animate({
			backgroundColor: "#eae7e8",
			boxShadow: "none"
		},500)
		$(this).children(".tab-icon").children("i").animate({
			fontSize: "0.24rem",
			color: "#B7A5A6",
			opacity: "0.5"
		})
		$(this).children(".tab-words").hide();
	});
	clearTimeout(time);
	time = setTimeout(function() {
		$(".main-container").children().fadeOut(500);
		$(".main-container").children().eq(num).fadeIn(500);
	}, 200)
})
