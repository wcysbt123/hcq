$(document).ready(function(){
    var list = document.getElementById('list');
	var h = list.clientHeight;
	var list_main = document.getElementById('list_main');
	list_main.style.height = h - 164 + 'px' ;
	var mode_list = document.getElementById('mode_list');
    var handle;
	var isMin = 1;		
	var bai = document.getElementById('bai');
	var map_img = document.getElementById('map_img');
	bai.style.height = h + 'px';
	
	var year_content = document.getElementById('year_content');
	var year_gain = document.getElementById('year_gain');
	var year_reduce = document.getElementById('year_reduce');
	var year = Number(year_content.textContent);

	var map = document.getElementById('map');
	var city = document.getElementById('city');
	var capital = document.getElementById('capital');
	var junshi = document.getElementById('junshi');
	var waijiao = document.getElementById('waijiao');
	
    var mapWidth = map_img.style.width = document.body.clientWidth > 1200 ? '1200px' : document.body.clientWidth + 'px';
    var mapHeight = 31 / 50 * parseInt(mapWidth) + 'px';
    var newMapHeight = mapHeight;
    map_img.style.marginTop = ($(window).height() - parseInt(mapHeight)) / 2 + 30 + 'px';
    
    var gain = document.getElementById('gain');
    var reduce = document.getElementById('reduce');
    var rulerNum = document.getElementById('rulerNum');
    var city1 = document.getElementById('city1');
    
    var mode_city = document.getElementById('mode_city');
    var mode_junshi = document.getElementById('mode_junshi');
    var mode_waijiao = document.getElementById('mode_waijiao');

    var a = map_img.scrollWidth;
    var b = map_img.scrollHeight;
    
    var isCity = 0;
    var isJs = 0;
    var isWj = 0;
    
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
	//capitalPosition(mapWidth,mapHeight)
	year_gain.onclick = function(){
		if(year < 256){
			year++;
	     	year_content.textContent = year;
		}
		hideIcon();
		changeMap(year);
		$('#city, #capital, #junshi, #waijiao').hide();
		if(isCity == 1){
			capitalPosition(a,b);
			if(isMin == 0) cityPosition(a,b);
		}
		if(isJs == 1){
     	    	    junshiPosition(a,b);
     	}
    	    if(isWj == 1){
    	    	    waijiaoPosition(a,b);
    	    }
	}
	year_reduce.onclick = function(){
		if(year > 221){
			year--;
	     	year_content.textContent = year;
		}
		hideIcon();
		changeMap(year);
		$('#city, #capital, #junshi, #waijiao').hide();
		if(isJs == 1){
        	    junshiPosition(a,b);
    	    }
    	    if(isWj == 1){
    	    	    waijiaoPosition(a,b);
    	    }
    	    if(isCity == 1){
			capitalPosition(a,b);
			if(isMin == 0) cityPosition(a,b);
		}
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
		$("#city, #capital, #junshi, #waijiao").hide();
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
				if(isCity == 1){
	         		capitalPosition(a,b);
	         		if(isMin == 0) cityPosition(a,b);
         		}
		        if(isJs == 1){
     	    	        junshiPosition(a,b);
     	        }
    	            if(isWj == 1){
    	    	            waijiaoPosition(a,b);
    	            }
				document.onmousemove = null;
				document.onmouseup = null;
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
			if(e.keyCode == 13)  {
				yearChange();
				
	         	if(isCity == 1){
			        capitalPosition(a,b);
			        if(isMin == 0) cityPosition(a,b);
		        }
		        if(isJs == 1){
     	    	        junshiPosition(a,b);
     	        }
    	            if(isWj == 1){
    	    	            waijiaoPosition(a,b);
    	            }
			}
			
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
	    setTimeout(function(){
	    	    $('#list_main').fadeIn(500);
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
    
    gain.onclick = function(){
    	    var oldSize = parseInt(map_img.scrollWidth);
    	    var newSize;
    	    
    	    if(oldSize * 1.5 <= parseInt(mapWidth) * 2.26){
    	    	    newSize = 1.5 * oldSize;
    	    	    a = map_img.scrollWidth * 1.5;
    	        b = map_img.scrollHeight * 1.5;
    	    }else{
    	    	    newSize = parseInt(mapWidth) * 2.25;
    	    	    a = map_img.scrollWidth;
    	        b = map_img.scrollHeight;
    	    }
    	    $("#map_img").animate({
    	    	    width: newSize + 'px'
    	    },200);
    	    
    	    isMin = 0;
    	    $('#city').fadeOut(300);
    	    $('#capital').fadeOut(300);
    	    $('#junshi').fadeOut(300);
    	    $('#waijiao').fadeOut(300);
    	    if(isCity == 1){
    	    	    cityPosition(a,b);
    	        capitalPosition(a,b);
    	    }
    	    if(isJs == 1){
    	    	    junshiPosition(a,b);
    	    }
    	    if(isWj == 1){
    	    	    waijiaoPosition(a,b);
    	    }
    	    
    	    
    	    rulerChange(newSize);
    }
    
    reduce.onclick = function(){
    	    var oldSize = parseInt(map_img.scrollWidth);
    	    var newSize;
    	    if(oldSize / 1.55 >= parseInt(mapWidth)){
    	    	    newSize = oldSize / 1.5;
    	    	    a = map_img.scrollWidth / 1.5;
    	        b = map_img.scrollHeight / 1.5;
    	        $('#city').fadeOut(300);
    	        $('#capital').fadeOut(300);
    	        $('#junshi').fadeOut(300);
    	        $('#waijiao').fadeOut(300);
    	        if(isCity == 1){
    	    	        cityPosition(a,b);
     	        capitalPosition(a,b);
     	    }
    	        if(isJs == 1){
     	    	    junshiPosition(a,b);
     	    }
     	    if(isWj == 1){
     	    	    waijiaoPosition(a,b);
     	    }
    	        
    	        
    	    }else{
    	    	    isMin = 1;
    	    	    console.log("bb")
    	    	    newSize = parseInt(mapWidth);
    	    	    a = map_img.scrollWidth;
    	        b = map_img.scrollHeight;
    	        city.innerHTML = '';
    	    	    setTimeout(function(){
     	    	    	$('#map_img').animate({
     	    	    	    left: 0,
     	    	    	    top: 0
     	    	    },200)
    	    	    },)
    	    	    $('#capital').fadeOut(300);
    	    	    
    	    }
    	    if(isCity == 1){
    	        capitalPosition(a,b);
    	        if(isMin == 0) cityPosition(a,b);
     	}
    	    if(isJs == 1){
     	    	junshiPosition(a,b);
     	}
     	if(isWj == 1){
     	    	waijiaoPosition(a,b);
        }
    	    
    	    $("#map_img").animate({
    	    	    width: newSize + 'px',
    	    },200);
    	    
    	    rulerChange(newSize);
    }
    function rulerChange(x){
    	    if((x < parseInt(mapWidth) * 1.6) && (x >parseInt(mapWidth))){
    	    	    $('#ruler').animate({
    	    	        width: 60 + 'px'
    	        });
    	    	    rulerNum.innerHTML = '250';
    	    }else if(x >= parseInt(mapWidth) * 2.2){
    	    	    $('#ruler').animate({
    	    	        width: 90 + 'px'
    	        });
    	        rulerNum.innerHTML = '250';
    	    }else if(x == parseInt(mapWidth)){
    	    	    $('#ruler').animate({
    	    	        width: 80 + 'px'
    	        });
    	        rulerNum.innerHTML = '500';
    	    }
    }
    
    map_img.onmousedown = function(e){
    	    var disX = e.clientX - map_img.offsetLeft;
    	    var disY = e.clientY - map_img.offsetTop;
    	    var mouseY = e.clientY;
    	    var mouseX = e.clientX;
    	    $('body, #map_img').css({'cursor': 'move'});
    	    $('#city').hide();
    	    $('#capital').hide();
    	    $('#junshi').hide();
    	    $('#waijiao').hide();
    	    $('.waijiao_detail').fadeOut(500);
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
    	    	    	    	    if(parseInt(map_img.style.left) >= parseInt((windowWidth - a))) {
    	    	    	    	        map_img.style.left = parseInt((windowWidth - a)) + 'px';
    	    	    	        }else{
    	    	    	    	        map_img.style.left = e.clientX - disX + 'px';
    	    	    	        }
    	    	    	    }
    	    	    	    if(dirX == 2){
    	    	    	    	    if(parseInt(map_img.style.left) <= parseInt(b)) {
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
    	    	    if(isMin == 0){
    	    	    	    if(isCity == 1){
     	    	        cityPosition(a,b);
         	        capitalPosition(a,b);
         	    }
    	    	    }else{
     	    	    	if(isCity == 1){
     	    	        capitalPosition(a,b);
         	    }
    	    	    }
    	    	    if(isJs == 1){
     	    	    junshiPosition(a,b);
     	    }
     	    if(isWj == 1){
     	    	    waijiaoPosition(a,b);
     	    }
    	    	    document.onmousemove = null;
    	    	    document.onmouseup = null;
    	    	    $('body').css({'cursor': 'auto'});
    	    }
    }
    function cityPosition(q, w){
      	city.innerHTML = '';
    	    setTimeout(function(){
    	    	    if(isMin == 0) $('#city').fadeIn(1000);
    	    	    htmlobj = $.ajax({
    	     	type:"get",
     	    	url:"file/city.txt",
     	    	async:false
    	        });
     	    var str = htmlobj.responseText.split('-');
     	    var cityName = [];
     	    var imgWidth = parseInt(map_img.scrollWidth);
     	    var imgHeight = parseInt(map_img.scrollHeight);
     	    var reg = /[\u4e00-\u9fa5]/;
    	    
     	    for(var i = 0; i < str.length; i++){
     	    	    if(reg.test(str[i])){
     	    	    	    var xy = str[i+1].toString().split(' ');
     	    	    	    	//console.log(xy)
     	    	    	    var x = xy[0] * parseInt(q) + parseInt(map_img.getBoundingClientRect().left);
     	    	    	    var y = xy[1] * parseInt(w) + parseInt(map_img.getBoundingClientRect().top);
     	    	    	    city.innerHTML = city.innerHTML + "<div class='city' id='city" + i + "' style='left:"+x+"px; top:"+y+"px;'><div class='city_position'></div><p class='city_name'>"+str[i]+"</p></div>"
     	    	    }
     	    }
    	    },500);
    }
    function junshiPosition(q, w){
      	junshi.innerHTML = '';
    	    setTimeout(function(){
    	    	    
    	    	    htmlobj = $.ajax({
    	     	type:"get",
     	    	url:"file/junshi.txt",
     	    	async:false
    	        });
     	    var str = htmlobj.responseText.split('=');
     	    var str1 = [];
     	    
     	    for(var j=0; j<str.length; j++){
     	    	//console.log(str[j])
     	    	    str1.push(str[j].split('-'));
     	    	    //console.log(str1[j])
     	    }
     	    var imgWidth = parseInt(map_img.scrollWidth);
     	    var imgHeight = parseInt(map_img.scrollHeight);
     	    var reg = /\d\d\d/g;
     	    for(var i = 0; i < str.length; i++){
     	    	    if(reg.test(str[i]) && (str1[i][0] == year)){
     	    	    	    var xy = str1[i][2].toString().split(' ');
     	    	    	    
     	    	    	    var x = xy[0] * parseInt(q) + parseInt(map_img.getBoundingClientRect().left);
     	    	    	    var y = xy[1] * parseInt(w) + parseInt(map_img.getBoundingClientRect().top);
     	    	    	    junshi.innerHTML = junshi.innerHTML + "<div class='junshi' id='junshi" + i + "' style='left:" + x + "px; top:"+y+"px;'><img class='junshi_icon' src='img/icon/junshi.png'><div class='junshi_detail'><img src='img/gif/"+str1[i][0]+"-"+str1[i][3]+".gif'><div class='junshi_content'><div><div class='junshi_circle'></div>时间：公元前"+str1[i][0]+"年</div><div><div class='junshi_circle'></div>属性：军事</div><div><div class='waijiao_circle'></div>内容："+str1[i][1]+"</div></div></div></div>"
     	    	    }
     	    }
     	    $('#junshi').fadeIn(1000);
    	    },500);
    }
    
 
    function waijiaoPosition(q, w){
      	waijiao.innerHTML = '';
    	    setTimeout(function(){
    	    	    
    	    	    htmlobj = $.ajax({
    	     	type:"get",
     	    	url:"file/waijiao.txt",
     	    	async:false
    	        });
     	    var str = htmlobj.responseText.split('=');
     	    var str1 = [];
     	    for(var j=0; j<str.length; j++){
     	    	    str1.push(str[j].split('-'));
     	    	    //console.log(str1[j])
     	    }
     	    var imgWidth = parseInt(map_img.scrollWidth);
     	    var imgHeight = parseInt(map_img.scrollHeight);
     	    var reg = /\d\d\d/g;
     	    for(var i = 0; i < str.length; i++){
     	    	    if(reg.test(str[i]) && str1[i][0] == year){
     	    	    	    var xy = str1[i][2].toString().split(' ');
     	    	    	    //console.log(xy)
     	    	    	    var x = xy[0] * parseInt(q) + parseInt(map_img.getBoundingClientRect().left);
     	    	    	    var y = xy[1] * parseInt(w) + parseInt(map_img.getBoundingClientRect().top);
     	    	    	    waijiao.innerHTML = waijiao.innerHTML + "<div class='waijiao' id='waijiao" + i + "' style='left:" + x + "px; top:"+y+"px;'><img class='waijiao_icon' src='img/icon/waijiao.png'><div class='waijiao_detail'><div class='waijiao_title'>"+str1[i][4]+"<div class='waijiao_square'></div></div><div class='waijiao_content'><div><div class='waijiao_circle'></div>时间：公元前"+str1[i][0]+"年</div><div><div class='waijiao_circle'></div>属性：事件</div><div><div class='waijiao_circle'></div>人物："+str1[i][5]+"</div><div style='margin-top:10px;'>"+str1[i][1]+"</div></div></div></div>"
     	    	    }
     	    }
     	    $('#waijiao').fadeIn(1000);
    	    },500);
    	    
    }
    
    
    function capitalPosition(q, w){
      	capital.innerHTML = '';
    	    setTimeout(function(){
    	    	    $('#capital').fadeIn(1000);
    	    	    htmlobj = $.ajax({
    	     	type:"get",
     	    	url:"file/capital.txt",
     	    	async:false
    	        });
     	    var str = htmlobj.responseText.split('-');
     	    var captialName = [];
     	    var imgWidth = parseInt(map_img.scrollWidth);
     	    var imgHeight = parseInt(map_img.scrollHeight);
     	    var reg = /[\u4e00-\u9fa5]/;
    	    
     	    for(var i = 0; i < str.length; i++){
     	    	    if(reg.test(str[i])){
     	    	    	    var xy = str[i+1].toString().split(' ');
     	    	    	    var x = xy[0] * parseInt(q) + parseInt(map_img.getBoundingClientRect().left);
     	    	    	    var y = xy[1] * parseInt(w) + parseInt(map_img.getBoundingClientRect().top);
     	    	    	    capital.innerHTML = capital.innerHTML + "<div class='capital' id='capital" + i + "' style='left:" + x + "px; top:"+y+"px;'><img class='capital_icon' src='img/icon/capital.png'><p class='capital_name'>"+str[i]+"</p></div>"
     	    	    }
     	    }
    	    },500);
    	    if(isMin == 1){
    	    	    $('#capital').css({
    	    	    	    fontSize: '10px'
    	    	    })
    	    }else{
    	    	    $('#capital').css({
    	    	    	    fontSize: '15px'
    	    	    })
    	    }
    }
    
    function modeOver(str){
    	    $('#'+str).animate({
    	    	    width: '120px',
    	    	    height: '70px'
    	    	},50);
    	    $('#'+str).css({
    	    	    boxShadow: '0 0 5px #E19856',
    	    	    backgroundImage: 'url(img/'+str+'2.jpg)'
    	    	})
    	    document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
    }
    function modeOut(str){
    	    $('#'+str).animate({
    	    	    width: '104px',
    	    	    height: '64px'
    	    	},100);
    	    $('#'+str).css({
    	    	    boxShadow: 'none',
    	    	    backgroundImage: 'url(img/'+str+'1.jpg)'
    	    	})
    }
    mode_city.onmouseover = function(){modeOver('mode_city')};
    mode_city.onmouseout = function(){modeOut('mode_city')};
    mode_junshi.onmouseover = function(){modeOver('mode_junshi')};
    mode_junshi.onmouseout = function(){modeOut('mode_junshi')};
    mode_waijiao.onmouseover = function(){modeOver('mode_waijiao')};
    mode_waijiao.onmouseout = function(){modeOut('mode_waijiao')};
    
    mode_city.onclick = function(){
    	    if(isCity == 0){
    	    	    isCity = 1;
    	    	    $('#mode_city .select img').show(500);
    	    	    $('#mode_city').css({
    	    	    	    border: '4px solid #FFFFFF',
    	    	    	    backgroundImage: 'url(img/mode_city2.jpg)'
    	    	    },500)
    	    	    cityPosition(a,b);
    	    	    capitalPosition(a,b);
    	    }else{
    	    	    isCity = 0;
    	    	    $('#city, #capital').fadeOut(500);
    	    	    $('#mode_city .select img').hide(500);
    	    	    $('#mode_city').css({
    	    	    	    border: 'none',
    	    	    },500)
    	    }
    }
    mode_junshi.onclick = function(){
    	    if(isJs == 0){
    	    	    isJs = 1;
    	    	    $('#mode_junshi .select img').show(300);
    	    	    $('#mode_junshi').css({
    	    	    	    border: '4px solid #FFFFFF',
    	    	    },500)
    	    	    junshiPosition(a,b)
    	    }else{
    	    	    isJs = 0;
    	    	    $('#junshi').fadeOut(500);
    	    	    $('#mode_junshi .select img').hide(500);
    	    	    $('#mode_junshi').css({
    	    	    	    border: 'none',
    	    	    },500)
    	    }
    }
    mode_waijiao.onclick = function(){
    	    if(isWj == 0){
    	    	    isWj = 1;
    	    	    $('#mode_waijiao .select img').show(500);
    	    	    $('#mode_waijiao').css({
    	    	    	    border: '4px solid #FFFFFF',
    	    	    },500)
    	    	    waijiaoPosition(a,b);
    	    }else{
    	    	    isWj = 0;
    	    	    $('#waijiao').fadeOut(500);
    	    	    $('#mode_waijiao .select img').hide(500);
    	    	    $('#mode_waijiao').css({
    	    	    	    border: 'none',
    	    	    },500)
    	    }
    }
    
    
    $("body").on("click",'#waijiao0', function(){
    	    $(".waijiao_detail").fadeIn(500);
    	    map_img.onclick = function(){
    	    	    $(".waijiao_detail").fadeOut(500);
    	    }
    })
    
    $("body").on('click', '#junshi6', function(){
    	    console.log('a');
    	    $("#junshi6 .junshi_detail").fadeIn(500);
    	    map_img.onclick = function(){
    	    	    $(".junshi_detail").fadeOut(500);
    	    }
    })
    $("body").on("click","#junshi6 .junshi_detail", function(){
    	    //console.log($("#junshi6").css('left'));
    	    $("#junshi6 .junshi_detail").css({position: 'absolute',zIndex: '1'});
    	    $("#black").fadeIn(500);
    	    $("#junshi6 .junshi_detail").animate({
    	    	    width: '550px',
    	    	    height: '500px',
    	    	    marginTop: '-50px',
    	    	    backgroundColor: 'rgba(255, 255, 255, 1)',
    	    	    marginLeft: -parseInt($("#junshi6").css('left')) + (document.documentElement.clientWidth - 550) / 2  + 'px'
    	    },500);
    })

    $("body").on('click','#black', function(){
    	    $("#junshi6 .junshi_detail").hide(600);
    	    $("#black").fadeOut(400);
    	    $("#junshi6 .junshi_detail").css({position: 'relative'});
    	    $("#junshi6 .junshi_detail").animate({
    	    	    width: '260px',
    	    	    height: '300px',
    	    	    marginTop: '0',
    	    	    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    	    	    marginLeft: '10px'
    	    },500);
    })
        /*document.onclick = function(e){
    	    var x = (e.clientX - parseInt(map_img.getBoundingClientRect().left))/ parseInt(map_img.scrollWidth);
    	    var y = (e.clientY - parseInt(map_img.getBoundingClientRect().top)) / parseInt(map_img.scrollHeight);
    	    //console.log(x,y)
    }*/

    

});

