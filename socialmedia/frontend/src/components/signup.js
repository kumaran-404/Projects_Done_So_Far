import React, { useState } from "react";
import axios from "axios"
import { Grid,IconButton,Button, InputAdornment, TextField,Paper} from "@mui/material";
//axios csrf 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
import  style from "../../static/css/signup.css"

function Signup()
{
    const [showPassword ,changeShowPassword] =useState(false)
    const [showRePassword ,changeReShowPassword] =useState(false)
    function togglepassword()
    {
        changeShowPassword(!showPassword);
  
    }
    function togglerepassword()
    {
        changeReShowPassword(!showRePassword);
  
    }

    function submit()
    {
        var firstname = document.querySelector("#firstname").value ;
        var lastname = document.querySelector("#lastname").value ;
        var phone = document.querySelector("#phone").value ;
        var email = document.querySelector("#email").value ;
        var password =document.querySelector("#password").value ;
        var retypepassword=document.querySelector("#retypepassword").value ;

        var data ={"firstname":firstname ,"lastname":lastname,"phone":parseInt(phone),"email":email,"password":password}
        

        axios.post("../backend/signup/",data).then(response=>{window.location="/createprofile"})

        
    }
    return(
      
           <div className={style.wrapper}>
                 <Paper className={style.container}>
                     <IconButton onClick={()=>{window.location="../"}}>
                         <KeyboardBackspaceIcon />
                     </IconButton>
                    
            <Grid container spacing={3}>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="firstname"
                    variant="outlined"
                    label="First Name" size="small" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                id="lastname"
                variant="outlined"
                label="Last Name" size="small" fullWidth></TextField>

                </Grid>


                <Grid item xs={12}>
                <TextField
                id="phone"
                variant="outlined"
                label="Phone" size="small" fullWidth></TextField>
                </Grid>

                <Grid item xs={12}>
                <TextField
                id="email"
                variant="outlined"
                label="Email" size="small" type="email" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                id="password"
                variant="outlined" fullWidth
                label="Password" size="small" type={showPassword?"text":"password"} 
                InputProps={{endAdornment:<InputAdornment>  
                            <IconButton  onClick={togglepassword}>
                                {showPassword?<VisibilityOffIcon/>: <VisibilityIcon /> }
                            </IconButton>
                            </InputAdornment>}}></TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                id="retypepassword"
                variant="outlined" fullWidth
                label="Retype Password" size="small" type={showRePassword?"text":"password"} 
                InputProps={{endAdornment:<InputAdornment>  
                <IconButton onClick={togglerepassword}>
                    {showRePassword?<VisibilityOffIcon/>: <VisibilityIcon/> }
                </IconButton>
                </InputAdornment>}} ></TextField>

                </Grid>
         
                <Grid item xs={12}>
          
                 <Button variant="contained" onClick={submit} color="primary">Signup</Button>
                 </Grid>
            </Grid>
          
        </Paper>


           </div>
          
       
    )
}

export default Signup;