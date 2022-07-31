

<?php
session_start();
echo $_SESSION['name']; 
if(isset($_SESSION['name']))
{
    
    $_SESSION["query"]=$_POST["query"];
    echo $_SESSION["query"];
    $id=$_POST["id"];

    $name=$_SESSION["name"];
    $con= new mysqli("localhost","kumaran","mnbv0987","$name");
    $price=0;
    $product="";
    $image="";
    $con2=new mysqli('localhost',"kumaran","mnbv0987","watchdb");
    $result=$con2->query("select * from products where id=$id");
    while($row=$result->fetch_row())
    {
        $product=$row[1];
        $price=$row[7];
        $image=$row[8];
    }
    $r="insert into cart values(\"".$product."\",1,$price,'$image')";
    echo $product .$price.$image.$con->connect_errno."--".$r;
    $con->query($r);
    header("location:search.php");

   
    

}
else 
{
    header("location:../login/login.php");
   
}

?>