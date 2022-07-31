import React, { useState,useEffect } from 'react'
import {render} from "react-dom"
import {BrowserRouter, Link} from "react-router-dom";
import Login from './components/Login';
import  Signup  from './components/signup';
import Homepage from './components/Homepage';
import CreateProfile from './components/Profile';
import axios from "axios"
import { SunspotLoader } from "react-awesome-loaders";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


function App()
{
    
    const [login,changeLogin]=useState(1)
    const [name,handlename] =useState('');
    function change()
    {
      var name =document.getElementById("name").value ;
      handlename(name);
    }
    return(
      <div>
        {name}
        <input id="name"></input>
        <button onClick={change}>change me </button>
        <Mycomponent name={10}></Mycomponent>
      </div>
    )

    console.log("hi")
    useEffect(function(){
        if (initial)
        {
        var url="backend/islogin/";
        if(window.location.pathname!=="/")  url="../backend/islogin/" 
        axios.post(url).then(r=>{
             if(r["data"]["logined"]==="yes") changeLogin(1);
            else changeLogin(0) 
        
            
        }  );
       } 
     
      
        
    },[initial]);

    useEffect(()=>{
      axios.post("backend/post/get/")
    },[])

    
    return (
          <div>
    
              <div>
            {(window.location.pathname==="/createprofile/")?<CreateProfile></CreateProfile>:((window.location.pathname==="/signup/")? <Signup/> :  ((login==1)?<Homepage></Homepage>:<Login></Login>))}

          
           </div> 
         </div>
        
    )
}

export function Loading()
{
    return(
        <div style={{position:"absolute",top:"50%",let:"50%"}}>
           
      <SunspotLoader
        gradientColors={["#6366F1", "#E0E7FF"]}
        shadowColor={"#3730A3"}
        desktopSize={"100px"}
        mobileSize={"80px"}
      />
           
        </div>
    )
}
render(<App/>,document.getElementById("app"));
