<link href="productstyle.css" rel="stylesheet">
<script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>

<script>
function submitform()
{
    if(document.getElementById("question").value!='')
    document.getElementById("reviewform").submit();
    else 
    window.location.href="../search/search.php";
}

</script>
<button onclick='submitform()' id="continue">back<-</button>
<?php 
session_start();
$a=$_GET['product'];
$user=$_GET['username'];
$con=new mysqli("localhost","kumaran","mnbv0987","watchdb");
$q="select * from products where id={$a}";
$result=$con->query($q);
while($row=$result->fetch_row())
{
     $name=$row[1];
     $type=$row[2];
     $color=$row[3];
     $gender=$row[4];
     $brand=$row[5];
     $category=$row[6];
     $price=$row[7];
     $image=$row[8];
     echo "<div id='container1'>";
        echo "<div id='imagebutton'>";
            echo "<img src='../../img/image-watches/$image'>";
            echo "<div id='button'>";

                echo "<button onclick='buynow()'>buy now <i class='far fa-credit-card'></i></button>";
            echo "</div>";
        echo "</div>";

        echo "<div id='nameprice'>";
            echo "<p>".$name."</p>";
            echo "<p  style='font-family:Arial, Helvetica, sans-serif'>&#8377;".$price."</p>";
        echo "</div>";
    echo "</div>";
    
    echo "<div id='container2'>";
        echo "<div id='table'>";
            echo "<h1>product overview</h1>";
            echo "<table>";
                echo "<tr>";
                    echo"<td>type</td>";
                    echo "<td>:</td>";
                    echo "<td>$type</td>";
                echo "</tr>";
                echo "<tr>";
                    echo"<td>color</td>";
                    echo "<td>:</td>";
                    echo "<td>$color</td>";
                echo "</tr>";
                echo "<tr>";
                    echo"<td>gender</td>";
                    echo "<td>:</td>";
                    echo "<td>$gender</td>";
                echo "</tr>";
                echo "<tr>";
                    echo"<td>brand</td>";
                    echo "<td>:</td>";
                    echo "<td>$brand</td>";
                echo "</tr>";
                echo "<tr>";
                    echo"<td>category</td>";
                    echo "<td>:</td>";
                    echo "<td>$category</td>";
                echo "</tr>";
            echo"</table>";
        echo "</div>";
        echo "<div id='des'>";
            echo "<h1>product description</h1>";
            echo "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed molestiae voluptatibus tenetur odio. Harum, ipsa natus dolores itaque fuga velit ipsam sunt cumque tempore porro sequi maiores obcaecati culpa quasi eaque hic a quo cupiditate? In pariatur consequuntur repudiandae quaerat accusamus consectetur! Cupiditate iusto suscipit temporibus quidem maxime enim dignissimos pariatur et ab nemo nobis animi optio ex ipsam, architecto corporis est quasi dolorum sunt perspiciatis. Officiis perspiciatis beatae excepturi eveniet sequi minima dolorem et nihil inventore earum aspernatur facilis incidunt in magni voluptatum explicabo, ex aliquid repellendus officia praesentium laborum assumenda quod. Explicabo atque ipsam vluptates veritatis laboriosam odit?";
        echo "</div>";   
     echo "</div>";
}
date_default_timezone_set('Asia/Kolkata');

echo "<form action='buy.php' id='buyform' method='POST' style='display:none'>
<input type='number' name='id' value=$a>

</form>"


?>

<div class='error' id='err' >
                <i class="fas fa-times" onclick="disappear()"></i>
                <i class='fas fa-exclamation-circle'></i>
                <span>oops:( ,it seems you haven't logined</span>
                <button onclick="relocate()" id="loginn">login</button>
               
                
                </div>
<script>
    function relocate()

    {
        window.location.href="../login/login.php";
    }

    function disappear()
    {
        document.getElementById("err").style.display="none";
        document.body.style.overflow="visible";
    }
    function buynow()
    {
        <?php  
            
            if($_SESSION['name']!="")
            {
                echo "document.getElementById('buyform').submit()";
            }
            else 
            {
                echo "document.getElementById('err').style.display='flex';
                document.getElementById('err').style.flexDirection='column';
                document.body.style.overflow='hidden';
                document.getElementById('err').style.top='50%'"
              
                
                ;
            }
            ?>
    }
    
    function star(a)
    {  

        document.getElementById("rate").value=a;


        for(var x=1;x<=5;x++)
        {
            document.getElementById("star"+x).style.color='';
        }
        for(var x=1;x<=a;x++)
        {
            document.getElementById("star"+x).style.color='#FF8C00';
        }

       
    }
</script>


<div id="review">

    <div id="previousquestion">
        <?php 
        $con= new mysqli('localhost',"kumaran","mnbv0987","watchdb");
        $q="select * from review where id=$a";
        $result=$con->query("$q");
        if(mysqli_num_rows($result)==0)
        {
            echo "<h3>customer review</h3>";
            echo "<span id='reviewfirst'>Be first to review this product<span>";
        }
        else 
        {
            echo "<h3>customer review</h3>";

            $y=1;
        while($row=$result->fetch_row())
        {
            $id=$row[0];
            $user=$row[1];
            $review=$row[2];
            $date=$row[3];
            $r=$row[4];
            echo "<div class='customer'>";
            echo "<div class='inside' style='display:flex'>";
            echo "<h4>".$user."</h4>"."<small>".$date."</small>";
            echo "</div>";
            echo "<i id='star11$y' class='fas fa-star'></i>";
            echo "<i id='star12$y' class='fas fa-star'></i>";
            echo "<i id='star13$y' class='fas fa-star'></i>";
            echo "<i id='star14$y' class='fas fa-star'></i>";
            echo "<i id='star15$y' class='fas fa-star'></i>";


            
            echo "<br> <span id='answer'>".$review." </span><hr>";

            echo "</div>";

            echo "<script>  
            for(var x=1;x<=$r ;x++)
            {
                document.getElementById('star1'+x+'$y').style.color='#FF8C00';
       
            }
            
            </script>";
            $y++;
           
            

        }

       
         $r="select * from review where id=$a and user='$user'";
         $result=$con->query("$r");
         while($row=$result->fetch_row())
         {
             $t=$row[4];
         
         echo "<script>  
         for(var x=1;x<=$t ;x++)
         {
             document.getElementById('star'+x).style.color='#FF8C00';
    
         }
         
         </script>";
        
    }

        }

     ?>


    </div>
    <div id="newquestion"> </div> 
 
    <div class="row" style="background-color: rgb(25,25,112);border-radius:10px;justify-content:space-around;margin:10px;padding:20px;"> 
    <div id="postquestion">
        <small>both rating and comment go hand in hand ,i.e,neglecting of one won't save ur reviews</small>
    <div id="ratings"> 
        <i onclick='star(1)' id="star1" style="color:blue" class="fas fa-star"></i>
        <i  onclick ='star(2)' id='star2' style="color:blue" class="fas fa-star"></i>
        <i onclick ='star(3)' id='star3' style="color:blue" class="fas fa-star"></i>
        <i onclick ='star(4)' id='star4' style="color:blue" class="fas fa-star"></i>
        <i onclick ='star(5)' id='star5' style="color:blue" class="fas fa-star"></i>
    </div> 
        <script>

            function please()
            {
               
               alert("please login to continue buddy!");
            }
    function post()
    {
       
         if(document.getElementById("question").value!='')
            document.getElementById("newquestion").innerHTML+="<div style='display:flex'><h4>you:</h4><small><?php echo date("y-m-d")." ".date("h:i:sa");?></small></div><span>"+document.getElementById('question').value+"</span>";
        else 
            alert('please add review to submit');
       
    }
    
    </script>
        <form id="reviewform" action='review.php' method='POST'>
            <input name='id' type="number" value='<?php echo $a;?>' style='display:none'>
            <input name="confirmation" type="text" id="confirmation" style="display:none">
            <textarea style='margin:20px 0;border-radius:10px;padding:5px;background-color:#FFE4B5' rows="4" cols="50" placeholder="write review" name="review" type="text" id="question" ></textarea>
            <input name="username" type="text" id='name' value='<?php $user=$_GET['username']; echo $user;?>' style='display:none'> 
            <input name="datetime" type="text" id="datetime" value='<?php echo date('y-m-d')." ".date('h:i:sa');?>' style='display:none'>
            <input name="ratings" type="number" value="101010" id="rate" style='display:none'>
        </form>
        <?php 
        if($_SESSION['name']!='')
        {
            echo ' <button type="button" id="postbutton" onclick="post()">post</button>';
        }
        else  
        {
          
            echo '<button type="button"  style="opacity:0.5" id="postbutton" onclick="please()">post</button>';
        }


?>

       

    </div>

    <div style="display:flex;justify-content:center;align-items:right;color:cornsilk;flex-direction:column">
        
        <div class="row">
            <i  id="shape11" style="color:#FF8C00" class="fas fa-star"></i>
            <span id="1star" class="number">
        </div>
        <div class="row">
            <i  id="shape21" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape22" style="color:#FF8C00" class="fas fa-star"></i>
            <span id="2star" class="number">
        </div>

        <div class="row">
            <i  id="shape31" style="color:#FF8C00" class="fas fa-star"></i>
            <i  id="shape32" style="color:#FF8C00" class="fas fa-star"></i>
            <i  id="shape33" style="color:#FF8C00" class="fas fa-star"></i>
            <span id="3star" class="number">
        </div>
        <div class="row">
            <i   id="shape41" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape42" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape43" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape44" style="color:#FF8C00"class="fas fa-star"></i>
            <span id="4star" class="number">
        </div>
        <div class="row">
            <i   id="shape51" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape52" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape53" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape54" style="color:#FF8C00" class="fas fa-star"></i>
            <i   id="shape55" style="color:#FF8C00" class="fas fa-star"></i>
            <span id="5star" class="number">
        </div>
    <?php
    $con=new mysqli("localhost","kumaran","mnbv0987",'watchdb'); 
    $q="select *,count(*) from review where id=$a group by ratings";
    $r=$con->query($q);
    $h=array();
   
    while($row=$r->fetch_row())
    {
        $h[$row[4]]=$row[5];
  
    }
    for($x=1;$x<=5;$x++)
    {
        if(isset($h[$x]))
        {
            $u=$h[$x];
          echo "<script> document.getElementById($x+'star').innerHTML=$u</script>";   
        }
        else 
        {
            echo "<script> document.getElementById($x+'star').innerHTML=0</script>";   
        }
    }

 

?>
    
    </div>

    </div>

</div> 

<?php include "../../footer.php";?>