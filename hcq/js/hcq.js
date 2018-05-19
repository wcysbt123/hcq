$(document).ready(function(){
    var list = document.getElementById('list');
	var h = list.offsetHeight;
	var list_main = document.getElementById('list_main');
	list_main.style.height = h - 164 + 'px' ;
	var mode_list = document.getElementById('mode_list');
    var handle;
			
	var bai = document.getElementById('bai');
	var map_img = document.getElementById('map_imp');
	bai.style.height = h + 'px';
	
	var year_content = document.getElementById('year_content');
	var year_gain = document.getElementById('year_gain');
	var year_reduce = document.getElementById('year_reduce');
	var year = Number(year_content.textContent);
	
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
		    	borderRadius: '2px'
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
	     	    	borderRadius: '10px'
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
    console.log()
});

