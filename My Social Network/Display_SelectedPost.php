<?php

  session_start();
  
  include 'DAO/MainDAO.php';
  
  $UserID = $_SESSION['UserID'];
  $postID = $_POST['postID'];
  
  $action = new MainDAO();
  $action -> Display_SelectedPost($UserID,$postID);
  
