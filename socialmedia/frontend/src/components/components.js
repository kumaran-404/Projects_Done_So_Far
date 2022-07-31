import {React,useState,useEffect} from "react"
import axios from "axios";
import Loader from "react-loader-spinner";
import {Avatar,Divider,Fab,Card,Chip,ListItem,ListItemAvatar,Button ,ListItemText,IconButton,Paper,List,ListSubheader,ListItemButton, TextField, Icon, Link, Typography, ButtonGroup, CardContent} from "@mui/material"
import {BrowserRouter as Router,Routes,Route,useParams} from "react-router-dom"
import { createStyled } from "@mui/system"
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import hstyle from "../../static/css/Homepage.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Aside} from "./asideview"
import {Profile} from "./profileview"
import {PostFrame} from "./postcover";
export const Home=()=>{
    const [profileData,changeProfileData] =useState("");
    const [loader,handleLoader] =useState(true);
    const [data,changeData] =useState("")
    useEffect(()=>{
        if(profileData==="")
        {

            axios.post("/backend/profile/").then(r=>{ 
                changeProfileData(r["data"]);
                setTimeout(()=>{
                    handleLoader(false);
                },2000)
            })

        
    }},[profileData]);
    useEffect(()=>{
        axios.post("/backend/post/get/").then(r=>changeData(r["data"]))
    },[])
    function HomeCenter()
    {
        return(
            <div>
                {data.length==0&& <div style={{position:"absolute",display:"flex",alignItems:"center",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                    
                    <img style={{width:"200px",height:"200px"}} src="/static/nopost.svg"></img>
                    <span >Nothing to explore </span>
                    </div>}
              {
                  data.map(el=>{
                      return <PostFrame data={el}></PostFrame>
                  })
              }
            </div>
        )
    }
    function HomeAside()
    {
        function handleLogout()
        {
            axios.post("/backend/logout/").then(r=>{window.location.reload()})
        }
        return (
            <div>
                <div className={hstyle.homeAside}>
                    
               <div className={hstyle.homeasidetop}>
                 
                   <Chip sx={{color:"white",backgroundColor:"#4b0082"}} variant="outlined" label={profileData["account_name"]} />
                  <Button onClick={handleLogout}>
                      Logout

                  </Button>
                 
                   
               </div>
              
              
             
            </div>

            </div>
            
        )
    }
    return(
        <div>
            
            {loader===true?<PageLoader></PageLoader>:
             <div className={hstyle.content}> 
            
                   <Aside path="/"></Aside>
                   <div className={hstyle.center} style={{width:"100vw"}}>
                     <HomeCenter></HomeCenter>
                    </div>
                      <div className={hstyle.right}>
                          <HomeAside></HomeAside>
                      </div>
             </div>}
        </div>
    )
    
}

function PageLoader()
{
    return(
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>)
}









export const Chat=()=>{

    function ChatCenter()
    {
        return(
            <div>
               chat center!!
            </div>
        )
    }
    function ChatAside()
    {
        return (
            <div>
               <div >
                  
                   chat aside 
               </div>

            </div>
        )
    }
    return(
        <div>
             <div className={hstyle.content}> 
            
           <Aside path="/notifications"></Aside>
           <div className={hstyle.center}>
                <ChatCenter/>
            </div>
              <div className={hstyle.right}>
                  <ChatAside/>
              </div>
        </div>
        </div>
    )
    
}


