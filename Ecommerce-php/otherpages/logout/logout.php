<?php 

$page=$_POST["pagename"];
if($page=='home')
{
    session_start();
session_destroy();

    header("location:../../index.php");
}
else if($page=='search')
{
    session_start();
session_destroy();
 
  header("location:../search/search.php");
}

?>