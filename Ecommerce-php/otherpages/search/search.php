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
    <link href="search1.css" rel="stylesheet">
<!---------javascript------>

<script>
    function addtocart(a)
    {
       
        document.getElementById("id").value=a;
        document.getElementById("cartform").submit()
    }
 
    function del()
        {
            document.getElementById("input").value="";
        }
    function enter(event)
    {
        
        if(event.keyCode==13)
        {
      
            document.getElementById("myform").action="";
            document.getElementById("myform").submit();
        }
        if(document.getElementById("input").value!="")
         document.getElementById("ic").style.visibility="visible";
        else 
        document.getElementById("ic").style.visibility="hidden";
    }
            
        
    function create()
        {
            document.getElementById("login").style.display="flex";
            document.getElementById("login").style.flexDirection="column";   
        }
    function destroy()
        {
            document.getElementById("login").style.display="none";
        }
    function navigation(x)
        {
            document.getElementById('image'+x).style.zIndex=1;
            document.getElementById("imagenav"+x).style.border="1px solid";
            for(let i=1;i<=3;i++)
            {
                if(i!=x)
                {
                    document.getElementById('image'+i).style.zIndex=0;
                    document.getElementById("imagenav"+i).style.border="none";
                }
            }

        }
    function icon()
        {
            window.location="../../index.php";
        }

  
    function hi(a)
    {
        if(a.style.color=='red')
            a.style.color='black';
        else 
            a.style.color='red';
    }
    function product (a)
    {
    
        document.getElementById('idno').value=a;
        document.getElementById('category1').value='<?php echo $_POST["category"];?>'
        document.getElementById('form').submit();
    }
    function submit(m)
    {
        document.getElementById("cato").value=m;
        document.getElementById("myform").action="";
        document.getElementById("myform").submit();
    }

 
 

    function logging()
    {
        document.getElementById("log").value='search';
        document.getElementById("form2").submit();
    }

    function minprice(x)
    {
        document.getElementById("minprice").value=x.value;

    }
    function maxprice(x)
    {   
        document.getElementById("maxprice").value=5000+(10000-x.value);
    }
let a=[]
function tick(x)
{

   if(document.getElementById(x).innerHTML==='✓')
   { 
    delete  a[a.indexOf(x)];
    document.getElementById(x).innerHTML="";
   }
   else 
   {
       a.push(x);
       document.getElementById(x).innerHTML="&#10003;";
   }
 
}


function clearFilter()
{
    window.location.href="search.php";
}

    function filter()
{  
    document.getElementById("filter").value="kumar";
    document.getElementById("minimum").value=document.getElementById("minprice").value;
    document.getElementById("maximum").value=document.getElementById("maxprice").value;
    var x=document.getElementsByClassName("brandname");
    for (var i=0;i<x.length;i++)
    {
        if(x[i].checked)
        {
            document.getElementById("brandname").value+=","+x[i].value;
        
        }
    }
    var y=document.getElementsByClassName("watchtype");
    for (var i=0;i<y.length;i++)
    {
        if(y[i].checked)
        {
            document.getElementById("typeofwatch").value+=","+y[i].value;
        }
    }
    var z=document.getElementsByClassName("categoryname");
    for (var i=0;i<z.length;i++)
    {
        if(z[i].checked)
        {
            document.getElementById("categoryofwatch").value+=","+z[i].value;
        }
    }
    for(let x=0;x<a.length;x++)
    {
        if(typeof(a[x])!="undefined")
        document.getElementById("colorofwatch").value+=","+a[x] ;       
    }
    ////////
    if(document.getElementById("brandname").value=='')
    {
        document.getElementById("brandname").value='nothing';
    }
    else 
    {
        document.getElementById("brandname").value=document.getElementById("brandname").value.substring(1,document.getElementById("brandname").value.length);
    }
    //////
    if(document.getElementById("typeofwatch").value=='')
    {
        document.getElementById("typeofwatch").value='nothing';
    }
    else 
    {
        document.getElementById("typeofwatch").value=document.getElementById("typeofwatch").value.substring(1,document.getElementById("typeofwatch").value.length);
    }
    ///
    if(document.getElementById("categoryofwatch").value=='')
    {
        document.getElementById("categoryofwatch").value='nothing';
    }
    else 
    {
        document.getElementById("categoryofwatch").value=document.getElementById("categoryofwatch").value.substring(1,document.getElementById("categoryofwatch").value.length);
    }
    ///
    if(document.getElementById("colorofwatch").value=='')
    {
        document.getElementById("colorofwatch").value='nothing';
    }
    else 
    {
        document.getElementById("colorofwatch").value=document.getElementById("colorofwatch").value.substring(1,document.getElementById("colorofwatch").value.length);
    }
  
    document.getElementById("dummyform").submit();


   }


function sorti()
    {
    
    document.getElementById("minimum1").value=document.getElementById("minprice").value;
    document.getElementById("maximum1").value=document.getElementById("maxprice").value;
    var x=document.getElementsByClassName("brandname");
    for (var i=0;i<x.length;i++)
    {
        if(x[i].checked)
        {
            document.getElementById("brandname1").value+=","+x[i].value;
        
        }
    }
    var y=document.getElementsByClassName("watchtype");
    for (var i=0;i<y.length;i++)
    {
        if(y[i].checked)
        {
            document.getElementById("typeofwatch1").value+=","+y[i].value;
        }
    }
    var z=document.getElementsByClassName("categoryname");
    for (var i=0;i<z.length;i++)
    {
        if(z[i].checked)
        {
            document.getElementById("categoryofwatch1").value+=","+z[i].value;
        }
    }
    for(let x=0;x<a.length;x++)
    {
        if(typeof(a[x])!="undefined")
        document.getElementById("colorofwatch1").value+=","+a[x] ;       
    }
    ////////
    if(document.getElementById("brandname1").value=='')
    {
        document.getElementById("brandname1").value='nothing';
    }
    else 
    {
        document.getElementById("brandname1").value=document.getElementById("brandname1").value.substring(1,document.getElementById("brandname1").value.length);
    }
    //////
    if(document.getElementById("typeofwatch1").value=='')
    {
        document.getElementById("typeofwatch1").value='nothing';
    }
    else 
    {
        document.getElementById("typeofwatch1").value=document.getElementById("typeofwatch1").value.substring(1,document.getElementById("typeofwatch1").value.length);
    }
    ///
    if(document.getElementById("categoryofwatch1").value=='')
    {
        document.getElementById("categoryofwatch1").value='nothing';
    }
    else 
    {
        document.getElementById("categoryofwatch1").value=document.getElementById("categoryofwatch1").value.substring(1,document.getElementById("categoryofwatch1").value.length);
    }
    ///
    if(document.getElementById("colorofwatch1").value=='')
    {
        document.getElementById("colorofwatch1").value='nothing';
    }
    else 
    {
        document.getElementById("colorofwatch1").value=document.getElementById("colorofwatch1").value.substring(1,document.getElementById("colorofwatch1").value.length);
    }
  
        document.getElementById("sortform").submit();
    }
    function removefilter()
    {
       document.getElementById("myform").submit();
    }

  
    function cartclose()
    {
        document.getElementById("cart").style.display="none";
        document.body.style.overflow="";
    }
    function cartview()
    {
        document.getElementById("cart").style.display="grid";
        document.body.style.overflow="hidden";
        
    }

  function quantity(a,b)
  {
      g=document.getElementById('quantity'+b).value
      if(a=='+') document.getElementById('quantity'+b).value=1+parseInt(g);
      else 
      { if(g!=0) document.getElementById('quantity'+b).value=parseInt(g)-1;}
  }
 function removeitem(a,b)
 {
     document.getElementById("product").value=a;
     document.getElementById("user1").value=b;
     document.getElementById("removeform").submit();
 }
 function update()
 {
     var z=[];
     var x=document.getElementsByClassName("quantity");
     var y=document.getElementsByClassName("imagess");
     for(let r=0;r<x.length;r++)
     {
         z.push(x[r].value)
         z.push(y[r].value)
     }
  
     if(z.length!=0)
     document.getElementById('confirmation').value=z;
   document.getElementById("removeform").submit();
     
 }



       </script>   
 



</head>

<body >
<!---header begins---->
<header>
        
        <!--social media section--->
        <div class="social media">
            <i class="fab fa-instagram" ></i>
            <i class="fab fa-facebook-f" ></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-google-plus-g"></i>
        </div>

        <!--icon section-->
        <div id="icon" onclick="icon()">
            <h1>Blue <span>scape</span></h1>
            <h4>Makes time for you</h4>
        </div>
        
        <!---search section-->
        <div id="mine">
            <i class="fas fa-search" ></i>
            <form  id="myform"  method="POST">
                <input type="text" onkeyup='enter(event)' name="search" id="input"  autofocus placeholder="search products" >
                <input type="text"  style="display:none" name="gender" id="cato">
                
                <i onclick="del()" id="ic" class="far fa-times-circle"></i>
            </form>
        </div>

        <!----shopping cart--->
        <div id="user">
         
            <button><img src="../../img/homeimage/shopping-cart.png" id="img" onclick='cartview()'></button>
        </div>

        <!---account section--->
                     
        <?php 
      
        if(!isset($_SESSION["name"]))  
            {
                echo '<div id="account">
                        <i class="fa fa-user-circle-o" onmouseover="create()" onmouseout="destroy()" style="font-size:1.5vw" aria-hidden="true"></i>
                        <div id="login" onmouseover="create()" onmouseout="destroy()"> 
                                <a href="../login/login.php" onmouseover="create()"  class="nextpage">login</a>
                                <a href="../signup/signup.php" onmouseover="create()" class="nextpage">signup</a>
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

        <!----------logout form ---------->
        <form action='../logout/logout.php' id="form2" style="display:none" method="post">
            <input type="text" id="log" name="pagename" >
        </form>

        <!-----shopping cart ----> 
        <div id="cart" >
            <form id="removeform" method="POST" action="suma.php" style="display:none">
                <input type="text" id="product" name="product" > 
                <input type="text" id="user1" name="name1">
                <input  type="text" id='kumar' name="previousquery">
                <input type="text" id="confirmation" name="confirmation" value="donothing" >
            </form>
            <div class="div1" id="shopping"  style="text-transform:capitalize">
                <h1>your bag</h1>
                <div style="display:flex;justify-content:space-around;padding:10px"> 
                    <button id="shoppingbutton" onclick='cartclose()'>continue shopping</button>
                    <button id='updatebutton' onclick='update()'>update</button>
                </div>
                
                
               <?php  
          
                   if(isset($_SESSION["name"]))
                    {
                        
                        $name=$_SESSION["name"];
                        $con=new mysqli("localhost","kumaran","mnbv0987","$name");
                          
                        $result=$con->query("select *,count(*) from cart group by productname");
                        
                        if(mysqli_num_rows($result)==0)
                        {
                            echo "<img style='margin-left:30px' src='../../img/funimages/hi.jpg'>";
                        }
                        else 
                        {
                        echo "<table>";
                        $r=1;
                        $grnd_total=0;
                        $grnd_quan=0;
                        while($row=$result->fetch_row())
                        {
                            echo "<tr>";
                                $productname=$row[0];
                                $quantity=$row[4];
                                $price=$row[2];
                                $image=$row[3];
                                
                                $total=$quantity*$price;
                                $grnd_total+=$total;
                                $grnd_quan+=$quantity;
                                echo "<td style='height:50%'> 
                                        <img src='../../img/image-watches/$image' style='width:30%'>
                                      </td> 
                                      <td>
                                        <span class='productname'>$productname</span>
                                     </td>
                                     <td style='height:4px;display:flex;justify-content:center;align-items:center;'><button style='background-color:transparent;color:blue;border:none;margin:4px;' onclick='quantity(\"+\",$r)'>+</button></td>

                                     <td style='display:flex;justify-content:center;align-items:center'><input    style='text-align:center;width:60%' disabled type='number' class='quantity' value=$quantity  id='quantity$r'></td>
                                     <input type='text' class='imagess' value='$image' style='display:none'>
                                     <td style='height:4px;display:flex;justify-content:center;align-items:center'><button style='background-color:transparent;color:blue;border:none;margin:4px;' onclick='quantity(\"-\",$r)'>-</button></td>
                                    
                                    ";
                                    $r++; 

                            echo "</tr>";


                        } 
                        echo "</table>";
                        
                        }

                    }
                    else 
                    {
                        echo "login to proceed";
                    }
                ?>

            </div>
            <div class="div2">
            <?php
            if($grnd_total!=0)
            { 
                echo '<div id="box">
                    <h3 style="color:#ffd300">order summary</h3>
                    <hr>
                    <div style="display:flex;justify-content:space-around"> 
                    <span>no of items:'. $grnd_quan.'</span>
                   
                    <h4><span>'. $grnd_total.'</span></h4></div>
                    <button>checkout</button>';
            }
            else 
            {
                echo "<img style='width:50%' src='../../img/funimages/undraw_Hello_re_3evm.svg'>";
            }?>

            </div>
        
            <div class="div3"></div>
            <div class="div4"></div>
            <div class="div5"></div>
            <div class="div6"></div>
        </div>
        <form method="POST" action="cart.php" id='cartform' style="display:none">
        <input type="number" name="id" id='id'>
        <input type="text" name="query" id="queries">
        </form>


         
        <!-------wishlist---------->
 
 
 </header>
 <!-------------------------------------------------------------------------->


 <!-----navigation-------->
<nav id="category" >
    <ul>
        <li id="all" onclick="submit('all')">All </li>
        <li id="men" onclick="submit('men')">Men</li>
        <li id="women" onclick="submit('women')">Women</li>

    </ul>
</nav>

<!--------------------------------------------------------------------------------->

<!----------------------------------sorting---------------------------------------------->
<div id="sort" >
    <span >sort by:</span> 
        <form action='' id='sortform'  method='post'>
            <select onclick="sorti()" id='sortings' name='sort'>
                <option disabled selected hidden>select</option>
                <option value="desc">High  to low</option>
                <option value="ascend">low to high</option>
            
            </select>
            
            <input type="text" name="query" id="query1" style="display:none">
            <input type="text" name="search" id="sortsearch1" style="display:none">
            <input type="number" name="minprice" id="minimum1" style="display:none">
            <input type="number" name="maxprice" id="maximum1" style="display:none">
            <input type="text"  name="brands" id="brandname1" style="display:none">
            <input type="text"   name="type"  id="typeofwatch1" style="display:none">
            <input type="text"   name="category" id="categoryofwatch1" style="display:none">
            <input type="text" name="colors" id="colorofwatch1" style="display:none">
            <input type="text" name="gender"  id="gender1" style="display:none">
            <input type="text" name="confirmation" id="filter1" value="kumaran" style="display:none">
            
        </form>
     
</div>

<!--------------------------------------filter section-------------------------------------------->

<div  class='filtering'>
<div class="filter">
            <h3 style="text-align:center;font-size:x-large">Filters<i class="fas fa-filter"></i></h3>
            <div id="filtersubmit">
                <button class="filterbutton" onclick='removefilter()'>clear</button>
                <button class="filterbutton" onclick='filter();hi();'>Go</button>
            </div>

            
            <div class="price opt">
                <div>
                     <span class="topic">price</span>
                
                </div>
                <hr>
                <div style="display:flex;"> 
                    <input oninput='minprice(this)'  type="range" min=0 max=5000 value=0 id="1price">
                    <input style="transform:rotate(180deg)"  oninput='maxprice(this)'  value=5000 type="range" min=5000 max=10000 id="2price">
                    

                </div>
                <div style="margin:6px;display:flex;justify-content:space-between;font-size:smaller;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                    <span>0</span><span>5000</span><span>10000</span>
                </div>
                <div>
                    <input type="number" readonly style="width:25%;border-radius:5px" value=0  id="minprice" placeholder="min">
                    <input type="number" readonly style="width:25%;border-radius:5px" value=10000 id="maxprice" placeholder="max">
                 </div>
            </div>

            <div class="brands opt">
                <span class="topic">brands</span>
                <hr>
                <div>
                    
                    <input type="checkbox" class='brandname' name="brandname" value="sonata" id="sonata">
                    <label for="sonata">sonata</label>
                </div>
                <div>
                    
                    <input type="checkbox" name="brandname" class='brandname' value="fastrack" id="fastrack">
                    <label for="fastrack">fastrack</label>
                </div>
                <div>
                   
                    <input type="checkbox" name="brandname" value="casio" class='brandname'  id="casio">
                    <label for="casio">casio</label>
                </div>
                <div>
                   <input type="checkbox" name="brandname" value="timex" class='brandname' id="timex">
                   <label for="timex">timex</label>
                </div>
           </div> 

            <div class="type opt">
                <span class="topic">type</span>
                <hr>
                <div>
                    
                
                    <input  type="checkbox" name="type" value="analogue" id="analogue" class="watchtype">
                    <label for="analogue">analogue</label>
    
               </div>
                <div>
                   
                    <input type="checkbox" name="type" value="digital" id="digital"  class="watchtype">
                    <label for="digital">digital</label>
                </div>
                <div>
                    
                    <input type="checkbox" name="type" value="analogue-digital" id="analogue-digital"  class="watchtype">
                    <label for="digital-analogue">digital-analogue</label>
                </div>
                
            </div>

            <div class="category opt">
                <span class="topic">category</span>
                <hr>
                <div>
                    
                    <input type="checkbox" name="category" value="casual" class="categoryname" id="casual">
                    <label for="casual">casual</label>
                </div>
                <div>
                    
                    <input type="checkbox" name="category" value="formal" class="categoryname" id="formal">
                    <label for="formal">formal</label>
                </div>
                <div>
                  
                    <input type="checkbox" name="category" value="sports" class="categoryname" id="sports">
                    <label for="sports">sports</label>
                </div>

            </div>

            <div class="coloring opt">
                
                <span class="topic">color</span>

                <hr>
                <div id="colors">
                <div class="color" onclick='tick("black")'  id="black"></div>
                <div class="color" onclick='tick("blue")'  id="blue"></div>
                <div class="color" onclick='tick("brown")'  id="brown"></div>
                <div class="color" onclick='tick("gold")' id="gold"></div>
                <div class="color" onclick='tick("grey")'  id="grey"></div>
                <div class="color" onclick='tick("pink")'  id="pink"></div>
                <div class="color" onclick='tick("red")'  id="red"></div>
                <div class="color" onclick='tick("silver")'  id="silver"></div>
                <div class="color" onclick='tick("green")'  id="green"></div>
                </div>
            </div>

       
</div>
   <!---DUMMY FORM--->
            
<form id="dummyform" style="display:none" action="" method="POST">
    <input type="number" name="minprice" id="minimum">
    <input type="number" name="maxprice" id="maximum">
    <input type="text"  name="brands" id="brandname">
    <input type="text"   name="type"  id="typeofwatch">
    <input type="text"   name="category" id="categoryofwatch">
    <input type="text" name="colors" id="colorofwatch">
    <input type="text" name="gender" id="gender">
    <input type="text" name="confirmation" id="filter">

  
</form>



<!--------------------------------------------------------------------------------------->


<!--------------------------------search part of page------------------------------------->

<?php 

$con=new mysqli("localhost","kumaran","mnbv0987","watchdb");
if($_POST["gender"]!='')
$cat=$_POST['gender'];
else 
$cat="all";
$search=$_POST['search'];
$sort=$_POST["sort"];


  if(($cat==='men')or($cat==='women'))
    {
        
        if($search==='')
        {
            $q="select * from products where gender='$cat'";
        }
        else 

        {
           
            $q="select * from products where gender='$cat' and (";
            $m=explode(' ',$search);
    
            foreach($m as $a)
            {
                if(($a==='girls')or($a==='girl')or($a==='female')or($a==='woman')) $a='women';
                if(($a==='boys')or($a==='boy')or($a==='man')or($a==='male')) $a="men";
                $q=$q."name like '%$a%' or type like '%$a%' or color like '%$a%' or category like '%$a%' or type like '%$a%' or gender like '%$a%' or ";
                 // name ,type,color,category,type,gender


                }
               
            foreach($m as $a)
            {
                if(strlen($a>3))
                {
                    if($a==='women') $a='wom';
                    for($x=0;$x<=strlen($a)-3;$x++)
                    {
                        $r=substr($a,$x,3);
                        $q=$q." name like '%$r%' or type like '%$r%' or color like '%$r%' or category like '%$r%' or type like '%$r%' or gender like '%$r%' or";
                    }
                }
            }
            $q=substr($q,0,strlen($q)-2).")";
     
        }

    }
    if($cat=='all')
    {
        if($search=='')
        {
            $q="select * from products";
        }
        else 
        {
            
            $q="select * from products where ";
            $m=explode(' ',$search);

            foreach($m as $a)
            {
                if(($a==='girls')or($a==='girl')or($a==='female')or($a==='woman')) $a='women';
                if(($a==='boys')or($a==='boy')or($a==='man')or($a==='male')) $a="men";
                $q=$q."name like '%$a%' or type like '%$a%' or color like '%$a%' or category like '%$a%' or type like '%$a%' or gender like '%$a%' or ";
                 // name ,type,color,category,type,gender

            }
            foreach($m as $a)
            {
                if(strlen($a>3))
                {
                    if($a==='women') $a='wom';
                
                    for($x=0;$x<=strlen($a)-3;$x++)
                    {
                        $r=substr($a,$x,3);
                        $q=$q." name like '%$r%' or type like '%$r%' or color like '%$r%' or category like '%$r%' or type like '%$r%' or gender like '%$r%' or";
                    }
                }
            }
            $q=substr($q,0,strlen($q)-2);
 
            
        }
    }

    $name=$_SESSION["name"];

    
    echo "<form style='display:none' action='../product/product.php'  id='form'>
    <input type='number'  id='idno' name='product' style='display:none'>
    <input type='text' id='category1' name='category1' style='display:none'>
    <input  type='text' id='username' name='username' value='$name' style='display:none'>
    </form>";
    
    ///conditions on dummy form 
   $m="";
   $Filters=[];
   $min=$_POST["minprice"];
   $max=$_POST["maxprice"];
   if((($min!=0)||($max!=10000))&&($min!=''))
   {
    array_push($Filters,'price');
    echo "<script>document.getElementById('1price').value=$min</script>";
    echo "<script>document.getElementById('2price').value=15000-$max</script>";
    echo "<script>document.getElementById('minprice').value=$min</script>";
    echo "<script>document.getElementById('maxprice').value=$max</script>";
   } 
 
   if($min!='')
   {
       if($cat !="all")
       {
           $m="select * from products where gender='{$cat}' ";
           if($max!='')
           {
               $m=$m." and (price between $min and $max) ";
            
           }
           else 
           {
               $m=$m." ( price between $min and 10000) ";
               
           }

       }
       else 
       {
           $m="select * from products where (gender='men' or gender='women')  ";
           if($max!='')
           {
               $m=$m." and ( price between $min and $max )";
              
           }
           else 
           {
               $m=$m." and ( price between $min and 10000) ";
               
               
           }
       }
   }
   else 
   {
    if($cat !="all")
       {
           $m="select * from products where gender='{$cat}' ";
           if($max!='')
           {
               $m=$m." and (price between 0 and $max )";
               
           }
           else 
           {
               $m=$m." and ( price between 0 and 10000 )";
           }

       }
       else 
       {
           $m="select * from products where (gender='men' or 'women' )";
           if($max!='')
           {
               $m=$m." and ( price between 0 and $max )";
              
           }
           else 
           {
               $m=$m." and (price between 0 and 10000 )";
           }
       }
   }
   
   /*
   <input type="number" name="minprice" id="minimum">
    <input type="number" name="maxprice" id="maximum">
    <input type="text"  name="brands" id="brandname">
    <input type="text"   name="type"  id="typeofwatch">
    <input type="text"   name="category" id="categoryofwatch">
    <input type="text" name="colors" id="colorofwatch">
    <input type="text" name="gender" id="gender">

   */
  
  
   if(($_POST["brands"]!="")&&($_POST["brands"]!="nothing"))
   {
    $brand=explode(",",$_POST["brands"]);
    $m=$m." and (";
    foreach($brand as $c) 
        {$m=$m." brand='{$c}' or";  echo "<script>document.getElementById('$c').checked=true </script>"; }
    $m=substr($m,0,strlen($m)-2);
    $m=$m.")";
    array_push($Filters,'brands');
   }

   if(($_POST["type"]!="")&&($_POST["type"]!="nothing"))
   {
    $brand=explode(",",$_POST["type"]);
    $m=$m." and (";
    foreach($brand as $c) { $m=$m." type='{$c}' or";echo "<script>document.getElementById('$c').checked=true </script>";}
    $m=substr($m,0,strlen($m)-2);
    $m=$m.")";
    array_push($Filters,'type');
   }

   if(($_POST["category"]!="")&&($_POST["category"]!="nothing"))
   {
    $brand=explode(",",$_POST["category"]);
    $m=$m." and (";
    foreach($brand as $c) {$m=$m." category='{$c}' or";echo "<script>document.getElementById('$c').checked=true </script>";}
    $m=substr($m,0,strlen($m)-2);
    $m=$m.")";
    array_push($Filters,'category');
   }
   if(($_POST["colors"]!="")&&($_POST["colors"]!="nothing"))
   {
    $brand=explode(",",$_POST["colors"]);
    $m=$m." and (";
    foreach($brand as $c) {$m=$m." color='{$c}' or";echo "<script>document.getElementById('$c').innerHTML='✓' </script>";}
    $m=substr($m,0,strlen($m)-2);
    $m=$m.")";
    array_push($Filters,'colors');
   }


  if($_POST['confirmation']!='')
  {
      $q=$m;
  }


  
    
  
 ///// div for filter alert( document.getElementById("sortings").value)removal
 if((sizeof($Filters)) )
{
 echo "<div class='filterremoval'><h5> <i onclick='removefilter()' style='cursor:pointer;font-size:xx-large;font-weight:700;' class='fab fa-searchengin'></i></h5>";
     foreach($Filters as $e)
     {

         echo "<div>
                    <span class='option'>$e</span>
                    

               </div>
         ";
     }
     echo "</div>";
    }
  
    if(($sort==='ascend')&&($q[-1]!='e'))
    $q=$q." order by price";
    else if(($sort==='desc')&&($q[-1]!='c'))
    $q=$q." order by price desc";
 
     
 
        
     if($_SESSION["query"]!='')
     {
         $q=$_SESSION["query"];
         $_SESSION["query"]="";

       echo "<script>
       document.getElementById('queries').value=\"$q\"
       </script>";
     }


    $result=$con->query($q);
    if(mysqli_num_rows($result)!=0)
    {
       echo "<div class='container'>";
        
    while($row=$result->fetch_row())
    {
        $i=$row[0];
        $p=$row[7];
        $r="../../img/image-watches/".$row[8];
       echo "<div class='small' id='product$i' > ";
       echo "       <img src='{$r}' alt='hi' onclick='product($i)'>";

      
       echo "     <div class='verysmall'>";
       echo "             <span style='color:black'>".$row[1]."</span>";
       
       echo "            <br> price:&nbsp;<span style='color:red'>&#8377;{$p}</span>";
       echo "            <br><button class='cart' onclick='addtocart($i)'><span class='spa'>+ add to cart</span></button>";
  
       echo "     </div>";
       echo "</div>";
       
    }
    echo "</div>";
    }
    else 
    {
        echo "<div class='noresult' style='display:flex;flex-direction:column;margin-top:2vh'>
                  <span style='text-align:center;text-transform:capitalize;color:blue;font-size:30px;font-weight:bolder'>:( No results found!</span>
                   <img id='resultimage'  style='width:80vw;height:80vh' src='../../img/funimages/result.jpg'>
              </div>       
        ";
    }
   
    echo "  <script>document.getElementById('{$cat}').style.backgroundColor='white';

    document.getElementById('{$cat}').style.color='black';

    document.getElementById('{$cat}').style.border='1px solid black';
    document.getElementById('gender').value='{$cat}';
    document.getElementById('gender1').value='{$cat}';
    
    document.getElementById('cato').value='{$cat}'
    document.getElementById('queries').value=\"$q\";
    document.getElementById('previousquery').value=\"$q\";
    document.getElementById('kumar').value=\"$q\";
    document.getElementById('query1').value=\"$q\";

    </script>";

     
?>
</div>

<?php include "../../footer.php";?>  
</body>

</html>


