$(document).ready(function(){
    var list = document.getElementById('list');
	var h = list.clientHeight;
	var list_main = document.getElementById('list_main');
	list_main.style.height = h - 164 + 'px' ;
	var mode_list = document.getElementById('mode_list');
    var handle;
			
	var bai = document.getElementById('bai');
	var map_img = document.getElementById('map_img');
	bai.style.height = h + 'px';
	
	var year_content = document.getElementById('year_content');
	var year_gain = document.getElementById('year_gain');
	var year_reduce = document.getElementById('year_reduce');
	var year = Number(year_content.textContent);

	var map = document.getElementById('map');
	var city = document.getElementById('city');
	var text = document.getElementById('test');
	
    var mapWidth = map_img.style.width = document.body.clientWidth + 'px';
    var mapHeight = 31 / 50 * parseInt(mapWidth) + 'px';
    var newMapHeight = mapHeight;
    map_img.style.marginTop = ($(window).height() - parseInt(mapHeight)) / 2 + 30 + 'px';
    //console.log($(window).height())
    text.style.top = map_img.style.top + map_img.style.marginTop;
    text.style.width = map_img.style.width;//console.log(text.style.left);
    text.style.top = parseInt(text.style.top) - 37 + 'px';
    
	(function readYearList(){
    	    htmlobj = $.ajax({
    	    	type:"get",
    	    	url:"file/nianbiao.txt",
    	    	async:false
    	    });
    	    var str = htmlobj.responseText.split('-');
    	    //console.log(str);
    	    var reg = /(\d\d\d)/g;
    	    for(var i = 0; i < str.length; i++){
    	    	    if(reg.test(str[i])){
    	    	    	    var strContent = str[i+1].replace(/ /g, '<br />');
    	    	    	    list_main.innerHTML = list_main.innerHTML + 
    	    	    	    "<div><div class='list_line'><div class='circle'></div><div class='line' style='height:" + (strContent.replace(/br/g).length + 60) + "px'></div></div><div class='list_words'><div class='list_title'>公元前 <span>" + str[i] + "</span> 年</div><div class='list_content'>"+ strContent + "</div></div></div>";
    	    	    	    
    	    	    }
    	    }
    }())
	hideIcon();
	year_gain.onclick = function(){
		if(year < 256){
			year++;
	     	year_content.textContent = year;
		}
		hideIcon();
		changeMap(year);
	}
	year_reduce.onclick = function(){
		if(year > 221){
			year--;
	     	year_content.textContent = year;
		}
		hideIcon();
		changeMap(year);
	}
	function hideIcon(){
		if(year == 256){
    	        year_gain.style.opacity = 0;
    	        year_reduce.style.opacity = 1;
    	        year_gain.style.cursor = 'auto';
        }else if(year == 221){
        	    year_reduce.style.opacity = 0;
        	    	year_gain.style.opacity = 1;
        	    year_reduce.style.cursor = 'auto';
        }else{
            	year_reduce.style.opacity = 1;
            	year_gain.style.opacity = 1;
            	year_gain.style.cursor = year_gain.style.cursor = 'pointer';
        }
	}
	function changeMap(i){
		$('#map_img').attr('src', 'img/map/' + i + '.png')
	}

	year_content.onmousedown = function(e){
		var mouseY = parseInt(e.clientY / 15);
		document.onmousemove = function(e){
			if(year_content.innerHTML.toString().indexOf('input') > 0)  return;
			var differY = parseInt(e.clientY / 15) - mouseY;
			if(differY == -1){
				mouseY = parseInt(e.clientY / 15);
				year++;
			}if(differY == 1){
				mouseY = parseInt(e.clientY / 15);
				year--;
			}if(differY > 1 || differY < -1){
				mouseY = parseInt(e.clientY / 15);
			}
		    console.log(parseInt(e.clientY / 15) - mouseY);
		    if(year > 256) year = 256;
    	        if(year < 221) year = 221;
		    year_content.textContent = year;
		    changeMap(year);
		    hideIcon();
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
			year_content.onmouseup = function(){
				year_content.onmousemove = null;
				year_content.onmouseup = null;
			}
		}
	}

	year_content.ondblclick = function(){
		var oldYear = year_content.textContent;
		year_content.innerHTML = "<input type='text' id='year_input' value=''/>";
		var yearInput = document.getElementById('year_input');
	    function yearChange(){
		    var yearInputValue = yearInput.value == '' ? oldYear : yearInput.value;
			if(yearInputValue > 256 || yearInputValue < 221 || (yearInput.value != parseInt(yearInputValue)) && (yearInput.value != '')){
				alert('请输入221-256范围内的整数！');
				yearInputValue = oldYear;
			}
			year = yearInputValue
			changeMap(yearInputValue);
			hideIcon();
			year_content.innerHTML = parseInt(yearInputValue);
			document.onmousemove = null;
	    }
		
		year_input.onkeydown = function(e){
			if(e.keyCode == 13)  yearChange();
		}
		document.onclick = function(){
			if(year_content.innerHTML.toString().indexOf('input') < 0)  return;
		    yearChange();
		}
		document.getElementById('time').onclick = function(e){
			e.stopPropagation(); 
		}
	}
	var search_icon = document.getElementById('search_icon');
	search_icon.onclick = function(){
		$('#search_icon').hide(300)
	    setTimeout(function(){
	    	    $('#search').show();
		    $('#search').animate({
		     	width: '300px'
		    },400);
		    $('#search').animate({
			    width: '260px'
		    },200);
		    setTimeout(function(){
		    	    $('#search img').fadeIn(300);
		    },500);
	    },300)
	    document.onclick = function(){
	    	    if(search_icon.style.display == 'none'){
	    	    	    $('#search img').fadeOut(300);
	    	    	    $('#search').animate({
	    	    	    	    width: '20px'
	    	    	    },300)
	    	    	    $('#search').hide(100);
	    	    	    setTimeout(function(){
	    	    	    	    $('#search_icon').fadeIn();
	    	    	    },400)
	    	    	    
	    	    }
	    }
	    document.getElementById('search').onclick = function(e){
			e.stopPropagation(); 
		}
	}
	

	$('#nianbiao').click(function(){
	    $('#bai').fadeIn(500);
	    $('#list').animate({
	    	    left: '0',
	    	    opacity: '1'
	    },500)
    });
    $('#bai').click(function(){
	    $('#bai').fadeOut(500);
	    $('#list').animate({
	    	    left: '-320px',
	    	    opacity: '0'
	    },500)
    });
    
    $('#mode_button').mouseover(function(){
	    $('#mode_button').animate({
	    	    width: '360px',
		    	height: '84px',
		    	bottom: '30px',
		    	right: '50px',
		    	borderRadius: '5px',
		    	backgroundColor: '#F69C41'
	    },200);
	    $('#mode_button').html('');
	    $('#size').animate({
	    	    bottom: '125px'
	    },200);
	    setTimeout(function(){
	       	$('#mode_button').fadeOut(500);
	       	mode_list.style.display = 'flex';
	       	mode_list.style.opacity = '0';
	       	$('#mode_list').animate({
	    	        opacity: '1'
	        },200);
	    },200)
    });

    $('#mode_list').mouseout(function(){
        	handle = setTimeout(function(){
        		$('#mode_button').animate({
	    	        width: '39px',
		       	height: '39px',
	     	    	bottom: '30px',
	     	    	right: '50px',
	     	    	borderRadius: '10px',
	     	    	backgroundColor: '#FFFFFF'
	        },200);
	        $('#size').animate({
	    	        bottom: '80px'
	        },200);
	        $('#mode_button').show();
	        mode_list.style.display = 'none';
	        $('#mode_list').hide();
	        setTimeout(function(){
	        	    $('#mode_button').html('显示<br />模式');
	        },200)
        	},300);
    }).mouseover(function(){
    	    clearTimeout(handle);
    });
    
    var gain = document.getElementById('gain');
    var reduce = document.getElementById('reduce');
    var rulerNum = document.getElementById('rulerNum');
    var city1 = document.getElementById('city1');

    
    
    gain.onclick = function(){
    	    var oldSize = parseInt(map_img.scrollWidth);
    	    var newSize;
    	    if(oldSize * 1.5 < parseInt(mapWidth) * 2.25){
    	    	    newSize = 1.5 * oldSize;
    	    	    console.log("aa");
    	    }else{
    	    	    newSize = parseInt(mapWidth) * 2.25;
    	    }
    	    $("#map_img").animate({
    	    	    width: newSize + 'px'
    	    },200);
    	    
    	    rulerChange(newSize);
    	    

    }
    reduce.onclick = function(){
    	    var oldSize = parseInt(map_img.scrollWidth);
    	    var newSize;
    	    if(oldSize / 1.5 > parseInt(mapWidth)){
    	    	    newSize = oldSize / 1.5;
    	    }else{
    	    	    console.log("bb")
    	    	    newSize = parseInt(mapWidth);
    	    	    setTimeout(function(){
    	    	    	$('#map_img').animate({
    	    	    	    left: 0,
    	    	    	    top: 0
    	    	    },200)
    	    	    },)
    	    }
    	    $("#map_img").animate({
    	    	    width: newSize + 'px',
    	    },200);
    	    rulerChange(newSize);
    }
    function rulerChange(x){
    	    //var imgSize = parseInt($('#map_img').css('width'));
    	    if(x == 1800){
    	    	    $('#ruler').animate({
    	    	        width: 60 + 'px'
    	        });
    	    	    rulerNum.innerHTML = '1';
    	    	    //console.log('1800')
    	    }else if(x == 2700){
    	    	    $('#ruler').animate({
    	    	        width: 90 + 'px'
    	        });
    	        rulerNum.innerHTML = '1';
    	        //console.log('2700')
    	    }else if(x == 1200){
    	    	    $('#ruler').animate({
    	    	        width: 80 + 'px'
    	        });
    	        rulerNum.innerHTML = '2';
    	        //console.log('1200')
    	    }
    }
    map_img.onmousedown = function(e){
    	    var disX = e.clientX - map_img.offsetLeft;
    	    var disY = e.clientY - map_img.offsetTop;
    	    var mouseY = e.clientY;
    	    var mouseX = e.clientX;
    	    $('body, #map_img').css({'cursor': 'move'});
    	    document.onmousemove = function(e){
    	    	    var difX = e.clientX - mouseX;
    	    	    var difY = e.clientY - mouseY;
    	    	    var dirX, dirY;
    	    	    if(difX > 0) dirX = 1; else dirX = 2;
    	    	    if(difY > 0) dirY = 1; else dirY = 2;
    	    	    if(map_img.style.width > '1200px'){
    	    	    	    var windowWidth = parseInt(document.body.clientWidth);
    	    	    	    var windowHeight = parseInt(document.documentElement.clientHeight);
    	    	    	    var a = parseInt(map_img.style.width) * 0.4;
    	    	    	    var b = parseInt(map_img.style.width) * 0.5 * -1;
    	    	    	    var c = parseInt(map_img.scrollHeight) * 0.56;
    	    	    	    var d = parseInt(map_img.scrollHeight) * 0.5 * -1;
    	    	    	    if(dirX == 1){
    	    	    	    	    if(parseInt(map_img.style.left) >= (windowWidth - a)) {
    	    	    	    	        map_img.style.left = (windowWidth - a) + 'px';
    	    	    	        }else{
    	    	    	    	        map_img.style.left = e.clientX - disX + 'px';
    	    	    	        }
    	    	    	    }
    	    	    	    if(dirX == 2){
    	    	    	    	    if(parseInt(map_img.style.left) <= b) {
    	    	    	    	        map_img.style.left = b + 'px';
    	    	    	        }else{
    	    	    	    	        map_img.style.left = e.clientX - disX + 'px';
    	    	    	        }
    	    	    	    }
    	    	    	    if(dirY == 1){
    	    	    	    	    if(parseInt(map_img.style.top) >= parseInt(windowHeight - c)) {
    	    	    	    	        map_img.style.top = parseInt((windowHeight - c)) + 'px';
    	    	    	        }else{
    	    	    	    	        map_img.style.top = e.clientY - disY + 'px';
    	    	    	        }
    	    	    	    }
    	    	    	    if(dirY == 2){
    	    	    	    	    if(parseInt(map_img.style.top) <= parseInt(d)) {
    	    	    	    	        map_img.style.top = d + 'px';
    	    	    	        }else{
    	    	    	    	        map_img.style.top = e.clientY - disY + 'px';
    	    	    	        }
    	    	    	    }
    	    	    }
        }
    	    document.onmouseup = function(){
    	    	    document.onmousemove = null;
    	    	    document.onmouseup = null;
    	    	    $('body').css({'cursor': 'auto'});
    	    }
    }
    function cityPosition(){
    	    htmlobj = $.ajax({
    	    	type:"get",
    	    	url:"file/city.txt",
    	    	async:false
    	    });
    	    var str = htmlobj.responseText.split('-');
    	    var cityName = [];
    	    //console.log(str);
    	    var reg = /[\u4e00-\u9fa5]{2,4}/;
    	    for(var i = 0; i < str.length; i++){
    	    	    if(reg.test(str[i])){
    	    	    	    var xy = str[i+1].toString().split(' ');
    	    	    	    	//console.log(xy)
    	    	    	    var x = xy[0] * parseInt(map_img.scrollWidth) + parseInt(map_img.getBoundingClientRect().left);
    	    	    	    var y = xy[1] * parseInt(map_img.scrollHeight) + parseInt(map_img.getBoundingClientRect().top);
    	    	    	    console.log($('#map_img').offset().top)
    	    	    	    city.innerHTML = city.innerHTML + "<div class='city' id='city" + i + "' style='left:"+x+"px; top:"+y+"px;'><div class='city_position'></div><p class='city_name'>"+str[i]+"</p></div>"
    	    	    }
    	    }
    	    
    }
    cityPosition();
    document.onclick = function(e){
    	    var x = (e.clientX - parseInt(map_img.getBoundingClientRect().left))/ parseInt(map_img.scrollWidth);
    	    var y = (e.clientY - parseInt(map_img.getBoundingClientRect().top)) / parseInt(map_img.scrollHeight);
    	    console.log(x,y)
    }
    
    
    




});

