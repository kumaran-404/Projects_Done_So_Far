import {React,useState,useEffect} from "react"
import axios from "axios"
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
import { Post } from "./post";


export const  Aside=({path})=>{

    function AsideLapView()
    {
        return(
            <div  className={hstyle.aside} style={{display:path=='/'&&"flex",flexDirection:path=='/'&&"column",justifyContent:path=='/'&&"space-around"}}>
            <div className={hstyle.asidelogo}>
                <img src="/static/logo.svg"/>
            </div>
    

            <Paper sx={{width:"20vw"}}> 
            <List  style={{backgroundColor:"white"}}>
            <ListSubheader  >Menu</ListSubheader>
          <ListItem >
             
              <ListItemButton  onClick={()=>{window.location.href="/"}} style={{backgroundColor:(path==="/")&&"lightgrey"}}>
                  <ListItemAvatar>
                      <HomeOutlinedIcon></HomeOutlinedIcon>
                  </ListItemAvatar>
                  <ListItemText >Home</ListItemText>
              </ListItemButton>
          </ListItem>
          <ListItem  >
             
              <ListItemButton onClick={()=>{window.location.href="/explore"}} style={{backgroundColor:(path==="/explore")&&"lightgrey"}}>
                  <ListItemAvatar>
                      <ExploreOutlinedIcon></ExploreOutlinedIcon>
                  </ListItemAvatar>
                  <ListItemText  >Explore</ListItemText>
              </ListItemButton>
          </ListItem>
          
          <ListItem  >
             
              <ListItemButton onClick={()=>{window.location.href="/profile"}} style={{backgroundColor:(path==="/profile")&&"lightgrey"}}>
                  <ListItemAvatar>
                     <PersonOutlineIcon></PersonOutlineIcon>
                  </ListItemAvatar>
                  <ListItemText  >Profile</ListItemText>
              </ListItemButton>
          </ListItem>
       </List>
       </Paper>
       {path==='/' &&<div style={{flexGrow:2}}>
               <Post></Post>
            </div>}
       </div>
        )
    }
    function AsideMobileView()
    {
        return(
        <div> 
            <div className={hstyle.mobilelogocontainer}>
                <div className={hstyle.mobilelogo}>
                  <img src={"/static/logo.svg"} className={hstyle.logo}/>
                </div>
            </div>
            <div className={hstyle.bottom}>
                    <Button onClick={()=>{window.location.href="/"}} style={{backgroundColor:(path==="/")&&"lightgrey"}}>
                        <HomeOutlinedIcon></HomeOutlinedIcon>
                    </Button>
                    <Button onClick={()=>{window.location.href="/explore"}} style={{backgroundColor:(path==="/explore")&&"lightgrey"}}>
                        <ExploreOutlinedIcon></ExploreOutlinedIcon>
                    </Button>


                    <Button onClick={()=>{window.location.href="/profile"}} style={{backgroundColor:(path==="/profile")&&"lightgrey"}}>
                        <PersonOutlineIcon></PersonOutlineIcon>
                    </Button>
            </div>
        </div>
        
        )
    }

   
    
    return(
        <div> 
            <div className={hstyle.mobiledisappear}>
                <AsideLapView></AsideLapView>
            </div>
            <div className={hstyle.lapdisappear}>
                <AsideMobileView></AsideMobileView>
            </div>
        </div>
    )
}
