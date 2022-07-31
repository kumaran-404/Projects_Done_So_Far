<?php 
$id=$_POST['id'];
$review=$_POST['review'];
$user=$_POST['username'];
$date=$_POST['datetime'];
if($_POST["ratings"]!='101010')
$ratings=$_POST["ratings"];
else 
$ratings=0;
$con= new mysqli('localhost',"kumaran","mnbv0987","watchdb");
$q="insert into review values('$id','$user','$review','$date',$ratings)";
$con->query("$q");
header('location:../search/search.php');


?>