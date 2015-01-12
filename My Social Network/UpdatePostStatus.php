<?php
	session_start();
	include 'DAO/MainDAO.php';
	
	$userID=$_SESSION['UserID'];
	$postID=$_POST['id'];
	$status=$_POST['status'];
	
	$action = new MainDAO();
	$action -> UpdatePostStatus($postID,$userID,$status);


?>
