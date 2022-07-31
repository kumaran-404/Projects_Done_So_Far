<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Bluescape</title>
    <script src="https://kit.fontawesome.com/546f2ebc14.js" crossorigin="anonymous"></script>
   <link href="signup.css" rel="stylesheet">
   <script src="signup.js"></script>

    
</head>

<body>
  
    <div class="container" id="cont">
       
        <form method="POST" id="myform"  action="signupdatabase.php">
            <h1>sign up</h1>
            <div id="form-container">
            <div class="form-input">
                <i class="fas fa-user"></i>
                <input type="text" required placeholder="username" name="username">
            </div>
            <span style="opacity:0;">invalid email</span>
            <div class="form-input">
                <i class="fas fa-envelope"></i>
                <input type="text" required placeholder="email" id="email" name="email">
               

            </div>
            <span id="item1" style="opacity:0;">invalid email</span>
            <div class="form-input">
                <i class="fas fa-phone-alt"></i>
                <input type="text" required placeholder="number" id="number" name="number">
            </div>
            <span id="item2" style="opacity:0;">invalid number</span>
            
            <div class="form-input">
                <i class="fas fa-lock"></i>
                <input type="password" required placeholder="password" name="password" id="password">
                <i class="fa fa-eye" aria-hidden="true" onclick="password('noshow',1)" style="display:none" id="show1"></i>
                <i class="fa fa-eye-slash" aria-hidden="true" onclick="password('show',1)" id="notshow1"></i>

                        </div>
                        <span id="item3" style="opacity:0;">weak password <button disabled id="strongpassword">view</button>
                            <div  id="message">
                                strong password must be of 8 characters and have atleast one :
                                <ul>
                                    <li>lower case</li>
                                    <li>upper case</li>
                                    <li>number</li>
                                    <li>special symbol</li>
                                </ul>
                            </div>
                        </span>
                        
            <div class="form-input">
                <i class="fas fa-lock"></i>
                <input type="password" required placeholder="retype password" name="retype-password" id="retypepassword">
                <i class="fa fa-eye" aria-hidden="true" onclick="password('noshow',2)"  style="display:none" id="show2"></i>
                <i class="fa fa-eye-slash" aria-hidden="true"  onclick="password('show',2)" id="notshow2"></i>

             </div>
             <span id="item4" style="opacity:0;">password mismatch</span>
             </div>
             <button   style="border:none;" onclick="check();return false" class="but">create</button>
             <a href="../login/login.php"><span  id= "registered" style="font-size: medium;text-transform: capitalize;">
                 already a registered user?
             </span>
             </a>
        </form>
    </div>

</body>
</html>

