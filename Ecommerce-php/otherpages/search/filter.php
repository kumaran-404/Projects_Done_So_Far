<script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
<?php session_start();

?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products|Bluescape</title>
    <link href="search2.css" rel="stylesheet" >


<?php 
$q=$_POST["query"];
$min=$_POST["minprice"];
$max=$_POST["maxprice"];
$search=$_POST["search"];
$gender=$_POST["gender"];
if(str_ends_with($q,"desc"))
{
    $q=substr($q,0,strlen($q)-strlen("order by price desc"));
}
else if(str_ends_with($q,"price"))
{
    $q=substr($q,0,strlen($q)-strlen("order by price"));
}


echo "<script>document.getElementById('{$gender}').style.backgroundColor='white';

document.getElementById('{$gender}').style.color='black';
document.getElementById('input').value='{$search}'
document.getElementById('{$gender}').style.border='1px solid black'</script>";

/////
if($gender=='all')
{
$q=$q." where ";
}
else 
$q=$q." and (price between $min and $max ) and ";
///////


echo "<div class='container'>";
$con =new mysqli("localhost","kumaran","mnbv0987","watchdb");
$result=$con->query($q);
 
while($row=$result->fetch_row())
{
  
    $i=$row[0];
    $p=$row[7];
    $r="../../img/image-watches/".$row[8];
   echo "<div class='small' id='product$i' onclick='product($i)'> ";
   echo "       <img src='{$r}' alt='hi' >";

   echo "     <i style='z-index:100' onclick='hi(this)' class='fas fa-heart'></i>";
   echo "     <div class='verysmall'>";
   echo "             <span style='color:black'>".$row[1]."</span>";
   
   echo "            <br> price:&nbsp;<span style='color:red'>&#8377;{$p}</span>";
   echo "            <br><button class='cart' onclick=''><span class='spa'>+ add to cart</span></button>";

   echo "     </div>";
   echo "</div>";
   
}
echo "</div>";







?>

