import React, { useState } from "react";
import { Grid,IconButton,Button, InputAdornment, TextField,Paper,Alert,LinearProgress} from "@mui/material";
import axios from "axios"
import style from "../../static/css/login.css"


import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function Login()
{

    const [showPassword,changeShowPassword] = useState(0)
    const [isValidEmail ,changemailValidity ] = useState(1)
    const [isValidPassword,changepasswordValidity] =useState(1)
    const [error,changeError] =useState("")
    function login()
    {
        var email =document.getElementById("email").value ;
        var password =document.getElementById("password").value ;

        if(!(email.endsWith("@gmail.com")&&(email.trim().length>10)) ) changemailValidity(0)
        else changemailValidity(1)

        if(password.trim().length==0) changepasswordValidity(0) 
        else changepasswordValidity(1)

        var data={"email":email,"password":password}
        axios.post("../backend/login/",data).then(r=>{
            var data = r["data"];
            console.log(data)
            if(data["message"]=="successfull")
            {
                changeError("logined!..");
                setTimeout(()=>{
                    window.location.reload()
                },4000)
            }
            else 
            {
                if(data["user"]=="exists") changeError("password mismatch")
                else changeError("user does not exists")
            }

        })
     
    }

    return(
        <div className={style.container}> 
        <Paper className={style.wrapper}>
            <Alert  style={{marginBottom:"15px"}}severity={error==""?"":( error=="logined!.."?"success":"error")}>{error} {error=="logined!.."?  <i class="fas fa-circle-notch fa-spin"></i>:""} </Alert>
            <TextField style={{"margin-bottom":"20px"}} 
            variant="outlined" id="email" type="email" label="Email" size="small" error={isValidEmail?false:true} helperText={isValidEmail?"":"Invalid Email"}>

            </TextField>

            <TextField style={{"margin-bottom":"20px"}}  helperText ={isValidPassword?"":"Empty Password"} error={isValidPassword?false:true} 
            variant="outlined" id="password" type={ showPassword?"text":"password"} label="password" size="small"
            InputProps={{endAdornment:<InputAdornment>
            <IconButton onClick={()=>changeShowPassword(!showPassword)}>
                { showPassword==0 ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </IconButton>
            </InputAdornment>}}>
            </TextField>
            <Button  onClick={login} variant="contained" color="success">Login</Button> 

            <span className={style.signup}>don't have account? <a href="/signup">Signup</a> </span>
        </Paper>
        </div>

      
    )
}

export default Login ; 