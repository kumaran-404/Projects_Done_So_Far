<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
    <style>
    body 
{
    background-color: #000000;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23180d1c' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23261431' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23351947' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23451e5e' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
    #card 
{
    z-index:1;
    background-color: white;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-transform: capitalize;
    width:25vw;
    height:35vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    border-radius: 10px;
 
}

#card #welcome
{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
}
.mine 
{
    display:flex;
    flex-direction: column;
  
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-transform: capitalize;
    color: white;
    background-color: black;
    align-items: center;
    justify-content: space-evenly;
    height:30vh;
    padding:0 10px;
    box-shadow: 0px 4px 15px 7px rgba(0,0,0,0.83);
}
.mine i 
{
    font-size: 50px;
    color:red;
}
a 
{
    text-decoration: none;
    padding:10px;
    color:white;
    background-color: blue;
    width:30%;
    text-align:center;
}
span 
{
    display:none;
    transition: 10s all ease-in;
}

    </style>
</head>
<body>

 <?php 
        $connection=new mysqli('localhost','kumaran','mnbv0987','watchdb');
        $name=$_POST["username"];
        $email=$_POST['email'];
        $num=$_POST['number'];
        $pass=$_POST['password'];
        $query1="select * from user where name='{$name}'";
        $num_rows_1=mysqli_num_rows($connection->query($query1));
        $query2="select * from user where email='{$email}'";
        $num_rows_2=mysqli_num_rows($connection->query($query2));
        if($num_rows_1==1)
        {
            if($num_rows_2==0)
            {
                echo "<div  class='mine'>";
                echo "<i class='fa fa-exclamation-triangle' ></i>";
                echo "user name exists try again with another id";
                echo "  <a href='signup.php' onmouseover='view()' onmouseout='disappear()''>signup<span id='hi' >>></span></a>";
                echo "</div>";
            }
            else 
            {
                echo "<div  class='mine'>";
                echo "<i class='fa fa-exclamation-triangle' ></i>";
                echo "already registered user with same email id";
                echo "  <a href='signup.php' onmouseover='view()' onmouseout='disappear()''>signup<span id='hi' >>></span></a>";
                echo "</div>";
            }



        }
        else 
        {
            if($num_rows_2==1)
            {
                echo "<div  class='mine'>";
                echo "<i class='fa fa-exclamation-triangle' ></i>";
                echo "email already exists";
                echo "  <a href='signup.php' onmouseover='view()' onmouseout='disappear()''>signup<span id='hi' >>></span></a>";
                echo "</div>";

            }
            else 
            {
                echo '<div id="card" >
       
       <i  style="color:green;font-size:3vw;" class="fa fa-thumbs-up" aria-hidden="true" id="hi"></i>
       sucessfully created!
       <div id="welcome">welcome to blue scape</div>
       <div>please wait while we are redirecting</div>
       <i class="fas fa-spinner fa-spin"></i>
 </div>';
      echo "<div style='color:white'>";
    $q="insert into user values ('{$name}','{$email}','{$num}','{$pass}')";
    
   echo "</div>";
  $connection->query($q);
  $con=new mysqli('localhost','kumaran','mnbv0987');
  $con->query("create database {$name}");
  $con=new mysqli("localhost","kumaran","mnbv0987","$name");
  $con->query("create table cart (productname  varchar(1000), quantity int ,price int,image varchar(100)  )");
  echo "<script> setTimeout(function(){ window.location='../../index.php' },5000);</script>";
            }
        }


?>
</body>
</html>


<script>
function view()
{
  
    document.getElementById('hi').style.display="inline-block";
}
function disappear() 
{
    
    document.getElementById('hi').style.display="none";
}

    </script>