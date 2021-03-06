$(document).ready(function(){
 
	$('#bdate').datepicker({
		dateFormat: "yy-mm-dd",
		changeMonth:true,
		changeYear:true,
		showButtonPanel: true,
		maxDate: '-6y',
		
		onClose:function(){
			var present = new Date();
			var presentYR = present.getFullYear();
			var bdate = parseInt($(this).val());
			var age = parseInt(presentYR-bdate);
			$('#age').val(age);
			
		}
	});
  /*
    Adding Users to database
  */
  
	$('#btn_signup').click(function(){
		var obj = {'data':JSON.stringify($('#Registration_form').serializeArray())};
		var fname = $('input[name=firstname]').val();
		var lname = $('input[name=lastname]').val();
		var nname = $('input[name=nickname]').val();
		var pass = $('input[name=passW]').val();
		var repass = $('input[name=repassword]').val();	
		var Email = $('input[name=emailadd]').val();
		var Gender = $('select[name=gender]').val();
		var Bdate = $('input[name=bdate]').val();
		var passLength = pass.length;
		var RegexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9+-]+\.[a-zA-Z]{2,4}$/;
		console.log(passLength);
		var nkNameLength = nname.length;
		if(pass == repass && RegexEmail.test(Email) && parseInt(passLength)>5 && Gender != "" && Bdate != ""
		 && fname!="" && lname!="" && nkNameLength>2 && nname!=""){

			$.ajax({
			  type:'POST',
			  data:obj,
			  url: 'AddAccount.php',
			  success:function(data){
			    $('.signup-alert-msg').html('New account successfully saved.');
			    $('#div-signup-header-alert-msg').fadeIn(1000);
			    $('#div-signup-header-alert-msg').fadeOut(1000);
			    
				$('#Registration_form input').val("");
				  
			  },
			  error:function(data){
				alert('Alert on Adding Users => '+ data);
			  }
			
			});			
		}else if(!RegexEmail.test(Email)){
		  $('#msg-email').html('Invalid Email Address');
			$('#alert-for-email').fadeIn(1000);
			$('#alert-for-email').fadeOut(1000);
		}else if(pass != repass){
		  $('#msg-repassword').html('Password must be confirmed');
			$('#alert-for-repassword').fadeIn(1000);
			$('#alert-for-repassword').fadeOut(1000);
		}else if(parseInt(passLength)<6){
			$('#msg-password').html('Password must be at least 6 characters');
			$('#alert-for-password').fadeIn(1000);
			$('#alert-for-password').fadeOut(1000);
		}else if(Gender==""){
		  $('.signup-alert-msg').html('Please select gender');
			$('#div-signup-header-alert-msg').fadeIn(1000);
			$('#div-signup-header-alert-msg').fadeOut(1000);
		}else if(Bdate==""){
		  $('.signup-alert-msg').html('Please check your birthdate');
			$('#div-signup-header-alert-msg').fadeIn(1000);
			$('#div-signup-header-alert-msg').fadeOut(1000);
		}else if(nkNameLength<3){
		  $('.signup-alert-msg').html('Nickname must at least 3-10 characters');
			$('#div-signup-header-alert-msg').fadeIn(1000);
			$('#div-signup-header-alert-msg').fadeOut(1000);
		}else{
		  $('.signup-alert-msg').html('All labels are required');
			$('#div-signup-header-alert-msg').fadeIn(1000);
			$('#div-signup-header-alert-msg').fadeOut(1000);
		}
		
			
		   
	});
		  
	$('.Register_name').keyup(function(){
		var RegexString = /^[a-zA-Z\s]$/;
		var name = $(this).val();
		var nameLength = name.length;
		var lastChar = name.substring((nameLength-1),nameLength);
		if(!RegexString.test(lastChar)){
			var result = name.substring(0,nameLength-1);
			$(this).val(result);
			$('.signup-alert-msg').html('Enter only character');
			$('#div-signup-header-alert-msg').fadeIn(1000);
			$('#div-signup-header-alert-msg').fadeOut(1000);
		}
			
	});
	
	$('.Register_nickname').keyup(function(){
	  var regexS = /^[a-zA-Z0-9\!*_]$/;
	  var nname = $(this).val();
	  var nlength = nname.length;
	  var lastnName = nname.substring((nlength-1),nlength);
	  if(!regexS.test(lastnName)){
	    var res = nname.substring(0,nlength-1);
	    $(this).val(res);
	    $('#msg-nname').html('Special characters are limited and no spacing');
			$('#alert-for-nname').fadeIn(1000);
			$('#alert-for-nname').fadeOut(1000);
	  }else if(nlength<3 || nlength>10){
	    $('#msg-nname').html('Nickname must at least 3-10 characters');
			$('#alert-for-nname').fadeIn(1000);
			$('#alert-for-nname').fadeOut(1000);
			$(this).val(nname.substring(0,9));
	  }
	});
	
	/*Sets the background image in left-content*/
	var img_ctr=1;
	var animate_ctr=1;
	setInterval(function(){
		console.log(img_ctr)
		if(img_ctr!=1 && img_ctr!=11){
			animate_ctr = img_ctr-1;
			$('#slideImg_'+animate_ctr).hide('blind',{direction:'right'},2000);
		}
		if(img_ctr==11){
			img_ctr=1;
			$('#slideImg_10').hide('blind');
		}
//		console.log(document.getElementById('slideImg_'+img_ctr))
		$('#slideImg_'+img_ctr).show('blind',{direction:'left'}, 2000);
		$('#NumberOfPage').html(img_ctr);
		img_ctr++;
	},5000);
		  
});
	


