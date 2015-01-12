<?php
   
   include 'DAO/MainDAO.php';
   
   $name = $_POST['name'];
   $action = new MainDAO();
   $action -> GetListOfUsers($name);

?>
