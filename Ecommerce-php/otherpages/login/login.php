<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="loginstyle.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
</head>
<body>
<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    <form action="loginverify.php" method="POST" id="myform">
        <span style='font-size:larger;text-transform:uppercase'>login</span>
        <div>
        <i class="fas fa-user"></i>
            <input type="text" name='user'  placeholder="username/Email" required>

        </div>
        <div>
        <i  class="fas fa-lock"></i>
            <input type="password" name='password'  id='password' placeholder="password" required>
            <i class="fa fa-eye" aria-hidden="true"  onclick='password("show")' style="display:none" id="show"></i>
                <i class="fa fa-eye-slash" aria-hidden="true"  onclick="password('notshow')" id="notshow"></i>
        </div>
    
        <input type='submit' value='Login' id='button' style="margin:4%;outline:none">
        <span>new user ?<button onclick="move()" id="butt" onmouseout='no(this)'  onmouseover="hi(this)" style="    background-color:transparent;outline:none;border:2px solid red;width:50%
" >register</button>
       </span>
    </form>

</body>
</html>
<script>
function  password(x)
{
  
    if(x==='notshow')
    {
        document.getElementById('password').type='text';
        document.getElementById('show').style.display='';
        document.getElementById('notshow').style.display='none';
    }    
    else 
    {
        document.getElementById('password').type='password';
        document.getElementById('show').style.display='none';
        document.getElementById('notshow').style.display='';
    }
}
function hi(a)
{
    a.style.backgroundColor="red";
}
function no(a)
{
    a.style.backgroundColor="transparent";
}
function move()
{
    
    window.location="../signup/signup.php";
}
</script>
