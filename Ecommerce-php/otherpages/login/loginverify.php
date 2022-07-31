
 <script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
<?php  

$name=$_POST['user'];
$password=$_POST['password'];
$con=new mysqli('localhost','kumaran','mnbv0987','watchdb');
$q="select * from user where name='{$name}' and password='{$password}'";
if( mysqli_num_rows($con->query($q))==1)
{
    session_start();
    if(isset($_SESSION['name']))
    session_start();
    $_SESSION['name']="{$name}";
    echo "<div id='background'></div>";
    echo "<div id='mine'>";
    echo "<span>welcome back,<p> {$_SESSION['name']} &#128525;		</p></span>";
    echo "<span>glad to see you here ,</span>";
    echo "<span>please wait till we processing <i class='fas fa-spinner fa-spin'></i></span>";
    echo "</div>";
    echo "<script>setTimeout(function(){ window.location='../../index.php' },5000);</script>";
}
else 
{
  
   include  'login.php';
   echo '<div id="msg">user does not match with password</div>'; 
}



?>
<style>
    * 
    {
        margin:0;
        padding:0;
    }
    #msg 
    {
        position: absolute;
        top:20%;
        left:50%;
        transform: translate(-50%,-50%);
color:red;
font-weight: bolder;
    }
    #background  
    {
        height:100vh;
        width:100vw;
        overflow: hidden;
        background-color: blue;
    }
    #mine 
    {
        position:absolute;
        z-index:1;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        font-size: large;
        border:1px solid black;
        padding:5px;
        align-items: center;
        height:40vh;
        justify-content: space-between;
        border-radius: 10px;
        background-color: white;
        text-transform: capitalize;
        }
        #mine span p 
        {
            font-weight: 600;
        }

</style>