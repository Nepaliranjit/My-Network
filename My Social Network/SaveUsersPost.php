<?php

    session_start();
    
    include 'DAO/MainDAO.php';
    
    $UserID = $_SESSION['UserID'];
    $Users_Post = nl2br($_POST['users_post']);
    $P_date = $_POST['P_date'];	
    
    $action = new MainDAO();
    
    $action->SaveUsersPost($UserID,$Users_Post,$P_date);



?>
