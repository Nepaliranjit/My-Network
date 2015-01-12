/*ramz_new edtion 01/16/13*/
$(document).ready(function(){
  
   var pub_chat_interval;
   var pub_post_interval;
	//var name = "Ramel Coletana";
	//$(function() {
	//	$('#searchFriends').prop('placeholder', "What's your chikka, "+name);
	//});
	
	/*Setting Options Area*/
	SetIntervalForPost();
	RefreshPost();
	CountNotificationsCom();
	
	$('#setting').click(function(){
		$('#set').toggle();
	});
	$('#set').click(function(){
		$('#set').toggle();
	});
	
	/*Uploading New Profile Picture Area*/
	$('#span-change-pic').click(function(){
		$('#div-editp-option').slideToggle();
		
	});
	$('#li-upload_pic').click(function(){
		$('#div-form-upload-profile-pic').show();
		$('#div-editp-option').hide();
	});
	$('#btn_CancelUploadPic').click(function(){
		$('#overlay-fst-form-upload-profile-pic').hide();
	});
	$('#btn_saveNewPic').click(function(){
		$('#div-loading').show().fadeIn(1000);
		$('#div-loading').fadeOut(10000);
	});
	
	
	/*Search for People That i use to know..*/
	$('#searchFriends').keyup(function(){
	   var name = $(this).val()
	
      if(name == ""){
        name = '1';
      }
        var obj={'name':name};
	      $.ajax({
	         type:'POST',
	         url:'GetListOfUsers.php',
	         data: obj,
	         success:function(data){
	            console.log(data);
	            $('.SearchResult').html(data);
	           
	         },
	         error:function(data){
	            alert("Error on Getting List of User! => "+ data);
	         }
	
	      });	      
	   
	})
	/*Making Post On Wall*/

	$('#btn_post').click(function(){
	   
	    var presentDate = GetPresentDate();
	    var user_post=$('#post-message').val();

	    var obj = {'users_post':user_post, 'P_date':presentDate};
		
		
			$.ajax({
				type:'POST',
				url: 'SaveUsersPost.php',
				data:obj,
				success:function(data){
					$('#post-message').val("");
					RefreshPost();
				},
				error:function(data){
					alert("Error on posting => " + data);
				}
			
			});
		
	});


	/*close inlarge picture*/
	
	$('.close_btn').click(function(){
		$('#overlay_inlarge_profilepic').hide(2000);		
	})
		
	//Counts the notification of Comments ...-not: Not Permanent!!
	setInterval(function(){
		CountNotificationsCom();	  
	},3000);
	
	

	
	/*----------------------------------------*/
	
	/*Chat Area..*/
	$('#chat-form').submit(function(){
	   var msg = $('input[name=chat-message]').val();
	  
	   	if(msg=='[:rar:]'){
			msg='smiley_rar.png';
		}else if(msg=='[:cool:]'){
			msg='smiley_cool.png';
		}else if(msg=='[:bleeh:]'){
			msg='smiley_bleeh.png';
		}else if(msg=='[:imba_robot:]'){
			msg='smiley_robot.png';
		}

		 var obj = {'msg':msg};
	  
	   $.ajax({
	      type:'POST',
	      url:'SavePublic_ChatMsg.php',
	      data:obj,
	      success:function(data){
	         console.log(data);
	      },
	      error:function(data){
	         alert("Error on saving public chat message => " + data);
	      } 
	   
	   });
	   
	   $('input[name=chat-message]').val("");
	   return false;
	
	});
	
	$('#span-pchat').click(function(){
		$('#div-tbl-for-chat').slideToggle(1000);
		//refreshes the messages on chat!
		pub_chat_interval = setInterval(function(){
		   $.ajax({
			  type:"POST",
			  url:"RefreshPubChat.php",
			 
			  success:function(data){
				
				$('#div-for-main-table').html(data);
			  },
			  error: function(data){
				 alert("Error on refreshing public chat => " + data);
			  }
		   });  
		   
		},1500);
	});
	//stops the interval
	/*add some codes below (clearInterval)*/

	$('#div-for-online').click(function(){//not permanent
		$('#div-tbl-for-chat').hide(1000);
		clearInterval(pub_chat_interval);
	});
	
	/*===========================Notification-Area [comment only :(]===================================*/
	
	$('#div-notifications').click(function(){
	  $('#div-notifications-list').slideToggle(1000);
	  $.ajax({
	    type:'POST',
	    url:'DisplayNotification.php',
	    success:function(data){
	      
	      console.log(data);
	      $('#div-notifications-list').html(data);
	    },
	    error:function(data){
	      alert(data);
	    }
	  });
	
	});
	
});
function SetIntervalForPost(){

	//refreshes the wall -note: Not Permanent!
	pub_post_interval=setInterval(function(){
	
		RefreshPost();
	  
	},15000);
	
}

function StopPostInterval(){
	clearInterval(pub_post_interval);
}
function RefreshPost(){

	$.ajax({
	        type:'POST',
	        url: 'GetUsersPost.php',
	        success:function(data){
	           $('#div-displayed-post').html(data);
	        },
	        error:function(data){
	            alert("Error on posting => " + data);
	        }
	    
	}); 
}
function GetPresentDate(){
    var date = new Date();
    var yr = date.getFullYear();
    var mn = date.getMonth()+1;
    var day = date.getDate();
    
    return yr+"-"+mn+"-"+day;
    
}

/*Like on Post*/

function Post_status(postID,status){
		
	var obj = {'id':postID,'status':status};
	var flag=true;
	$.ajax({
		type:'POST',
		url:'UpdatePostStatus.php',
		data:obj,
		success:function(data){
			console.log(data);
			RefreshPost();
			Display_SelectedPost(postID,flag)
		},
		error: function(data){
			alert('Error on Changing Post Status =>'+data);
		}
	
	});

}

function Remove_post(postID){

	var obj = {'id':postID};
	alert('Still Working.. \n Alert la ito!')
	/*$.ajax({
		type:'POST',
		url:'RemovePost.php',
		data:obj,
		success:function(data){
			console.log(data);
				
		},
		error: function(data){
			alert('Error on Changing Post Status');
		}
	
	});*/
}
	
function InlargeProfilePic(profile_img){
	
	var inlarge_img = "<img src='"+profile_img+"' alt='Profile Image' class='inlarge_pic'/>";
	$('#overlay_inlarge_profilepic').show(2000);	
	$('.inlarge_img_displayer').html(inlarge_img);
	
}


	/*Comment in Post*/
	
function SavePostComment(postID,type){
  
  var comment ="";
  if(type){
   	comment = $('#post_comment_'+postID).val();
  }else{
    comment = $('#select_post_comment_'+postID).val();
  }

	var obj = {'postID':postID,'post_comment':comment};
	var flag=true;

	$.ajax({
	
		type:'POST',
		url:'SavePostComment.php',
		data:obj,
		success:function(data){
		 RefreshPost();
		Display_SelectedPost(postID,flag);
		// Display_SelectedPost(postID);
			$('#post_comment_'+postID).val("");
      $('#select_post_comment_'+postID).val("")
		},
		error: function(data){
			alert('Error on Post Comment => '+ data);
		}
		
	});
		
}

function CountNotificationsCom(){
  $.ajax({
		  type:'POST',
		  url:'CountCommentNotifications.php',
		  success:function(data){
		    $('.Notification_Num').html(data);
		  },
		  error:function(data){
		    alert(data);
		  }
	});
}

function Display_SelectedPost(postID,flag){

    var obj = {postID:postID};
    
    $.ajax({
		  type:'POST',
		  url:'Display_SelectedPost.php',
		  data:obj,
		  success:function(data){
		    if(!flag){
		     $('#div-displayed-selected-post').fadeIn(1000);
		    }
		    $('.div-displayed-selected-post-content').html(data);
		    $('#div-notifications-list').hide();
		    
		  },
		  error:function(data){
		    alert(data);
		  }
	});
    
}
function Close_selected_post(){
  $('#div-displayed-selected-post').fadeOut();
}




















