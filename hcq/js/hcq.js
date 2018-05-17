$(document).ready(function(){
    var list = document.getElementById("list");
	var h = list.offsetHeight;
	var list_main = document.getElementById("list_main");
	list_main.style.height = h - 164 + 'px' ;
	var mode_list = document.getElementById("mode_list");
    var handle;
			
	var bai = document.getElementById("bai");
	bai.style.height = h + 'px';
	
	$("#nianbiao").click(function(){
	    $("#bai").fadeIn(500);
	    $('#list').animate({
	    	    left: '0',
	    	    opacity: '1'
	    },500)
    });
    $("#bai").click(function(){
	    $("#bai").fadeOut(500);
	    $('#list').animate({
	    	    left: '-320px',
	    	    opacity: '0'
	    },500)
    });
    
    $("#mode_button").mouseover(function(){
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

    $("#mode_list").mouseout(function(){
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
        	},800);
    }).mouseover(function(){
    	    clearTimeout(handle);
    });

});
