<?php 
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page -BlueScape</title>
    <script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
    <link href="index1.css" rel="stylesheet">
    <script src="index.js"></script>
</head>


<body>
    <header> <!--HEADER part of home page-->

            <div class="social media">   <!-- social media section -->
                <i class="fab fa-instagram" ></i>
                <i class="fab fa-facebook-f" ></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-google-plus-g"></i>
            </div>

            <div id="icon" onclick="icon()"> <!-- icon section -->
                <h1>Blue <span>scape</span></h1>
                <h4>Makes time for you</h4>
            </div>

            <div id="mine"> <!--search section-->
                <i class="fas fa-search" ></i>
                <form  id="myform"  method="POST">
                    <input type="text"  onkeyup='enter(event)' onkeydown='del_icon()' name="search" id="input" autofocus placeholder="search products" >
                    <input type="text"  style="display:none" name="gender" id="cat">
                    
                    <i onclick="del()" id="ic" class="far fa-times-circle" ></i>
                </form>
            </div>

              <!--account section-->
            <?php if(!isset($_SESSION["name"]))  
                    {
                        echo '<div id="account">
                                <i class="fa fa-user-circle-o" onmouseover="create()" onmouseout="destroy()" style="font-size:1.5vw" aria-hidden="true"></i>
                                <div id="login" onmouseover="create()" onmouseout="destroy()"> 
                                    <a href="otherpages/login/login.php" onmouseover="create()"  class="nextpage">login</a>
                                     <a href="otherpages/signup/signup.php" onmouseover="create()" class="nextpage">signup</a>
                                </div></div>';
                    }
                    else 
                    {
                        echo "<div id='logout'>";
                        echo "<button onclick='logging()'>logout</button>&nbsp";
                        echo "<span>".$_SESSION['name']."</span>";
                        echo "</div>";
                    }
            
            
            ?>  
        <!----------logout form----->
        <form action='otherpages/logout/logout.php' id="form2" style="display:none" method="post">
            <input type="text" id="log" name="pagename" >
        </form>

    
            <!---shopping cart section-->
            <div id="cart">
                <div class="div1" id="shopping">
                     <h1>shopping cart</h1>
                </div>
               <div class="div2"></div>
               <div class="div3"></div>
               <div class="div4"></div>
               <div class="div5"></div>
            </div>

    
    </header>


<!-------------------------------------------------------------------------------------------------->
<!--navigation section starts-->
    <nav id="category" >
        <ul>
            <li id="all" onclick="submit('all')">All </li>
            <li id="men" onclick="submit('men')">Men</li>
            <li id="women" onclick="submit('women')">Women</li>
          
        </ul>
    </nav>
<!---------------------------------------------------------------------------------------------------->


<div id="boxdesign">

<div style="position:relative"> 

<img  src="img/funimages/wallpaperflare.com_wallpaper.jpg">
<div style="position:absolute;top:17%;left:50%;transform:translate(-50%,-50%)">
<i  style="color:white;margin:5px;font-size:x-large" class="far fa-clock"></i>
    <h1 id="topic">join our 1M+ community</h1>
    <br> 

    <small style="text-transform:capitalize;color:white;text-decoration:dashed">your time our priority</small> 
    <br>
    <button  onclick="submit('all')" id="sumabutton"> Explore</button>
</div> 
                </div>
</div>




<!--carosuel-->
    
    <div id="imagecontainer"  >
    <!---image one-->
        <div class="one" id="image1" >
            <img src="./img/funimages/pride.jpg">
                <div id="overlay1">
                     wear the pride
                </div>                         
        </div>
    <!---image two--->
        <div class="one"  id="image2">
            <img  src="./img/funimages/splash-of-water-on-a-watch-2K-wallpaper.jpg">
        </div>
    <!---image three--->
        <div  class="one" id="image3">
            <video autoplay muted loop>
                <source src="./img/homeimage/Pexels Videos 2385277.mp4" type="video/mp4">
            </video>
            <div id="overlay3">
                <h1>introducing </h1>
                <h3>Smart watches </h3>
                <br><br><br>
                <h4>More technology,less fuse!</h4>
                <br>
                <br>
                <br>
                <div class="hi">
                    <button id="explore">Explore</button>
                    <div id="first"></div>
                    <div id="second"></div>
                </div>
            </div>
        </div>
        <!---navigation part-->
        <div id="navigation">
            <ul>
                <li onclick="navigation(1)" id="imagenav1">&#9679;</li>
                <li onclick="navigation(2)" id="imagenav2">&#9679;</li>
                <li onclick="navigation(3)" id="imagenav3">&#9679;</li>
            </ul>
        </div>
  
    
        </div>

        <div class="hotdeals">
            

        </div>

        <div class="brands">
            <h2>Our International brands </h2>
            <div class="cont">
                 <img class="brand" src="img/funimages/casio.png">
                <img class="brand" src="img/funimages/fast.jpg">
                <img class="brand" src="img/funimages/Timex-Logo.jpg">
                <img class="brand" src="img/funimages/titan.jpg">
            </div>
        </div>
<!--------------------------------------------------------------------------------------->
<?php include "footer.php";?>

</body>
</html>

