<?php
   session_start();
   
   include 'DAO/MainDAO.php';
   
   $UserID = $_SESSION['UserID'];
   $msg = $_POST['msg'];
   
   $action = new MainDAO();
   
   $action -> SaveChatMsg($UserID,$msg); 


?>
