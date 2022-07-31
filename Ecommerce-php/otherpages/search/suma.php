<form id="form" method="POST" action="search.php">
    <input type="text" name="queryonupdate" id="suma">
</form>

<?php  
session_start();
if($_POST["confirmation!='donothing"])
{
$image=$_POST["product"];
$r=$_POST["name1"];
$q="delete from cart where image='$image'";
echo $r;
$con=new mysqli('localhost',"kumaran","mnbv0987","$r");
$con->query($q);
echo $con->connect_errno;

echo '<script>document.getElementById("suma").value="'.$t.'"</script>';
header("location:search.php");
} 

else 
{
    $name= $_SESSION['name'];
    $con= new mysqli("localhost","kumaran","mnbv0987","$name");
    $r=$_POST["confirmation"];
   
    $e=explode(',',$r);
    for($i=1;$i<sizeof($e);$i+=2)
    {
        $t=$e[$i];
    
        
        $r="select count(*) from cart where image='$t'";
        $result=$con->query("$r");
        while($row=$result->fetch_row())
        {
            $quan=$row[0];
            break;
        }
            if($quan>$e[$i-1])
            {
                $proname='';
                $price=0;
                $query="select * from cart where image='$t'";
                echo $query;
                $result=$con->query("$query");
                while($row=$result->fetch_row())
                {
                
                    $proname=$row[0];
                    $price=$row[2];
                    break;
                }

                for($m=$quan-$e[$i-1];$m>=1;$m--)
                {
                    $k="delete from cart where image='$t'";
                    $con->query("$k");
                }
                for($o=1;$o<=$e[$i-1];$o++)
                {
                   
                    $k="insert into cart values(\"".$proname."\",1,$price,'$t')";
                    $con->query("$k");
                }

            }
            else if($quant<$e[$i-1])
            {
               
                $query="select * from cart where image='$t' ";
                $result=$con->query("$query");
                while($row=$result->fetch_row())
                {
                    $product=$row[0];
                    $price=$row[2];

                    break;
                }
                for($m=1;$m<=$e[$i-1]-$quan;$m++)
                {
                    $k="insert into cart values(\"".$product."\",1,$price,'$t')";
                    $con->query("$k");
                }
            }
            else ;
        }

        header("location:search.php"); 
    }
   


?>