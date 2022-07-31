import React, { useState,useLocation, useEffect } from "react"
import axios from "axios"
import {Avatar,Divider,ListItem,ListItemAvatar,Button,Chip, ListItemText,IconButton,Paper,List,ListSubheader,ListItemButton, TextField} from "@mui/material"
import {BrowserRouter as Router,Routes,Route,useParams} from "react-router-dom"
import hstyle from "../../static/css/Homepage.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Home,Chat} from "./components";
import {Profile} from "./profileview";
import {Explore} from "./exploreview";
import PageNotFound from "./pagenotfound";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function Homepage()
{

   
    return(
           <Router>
                <div className={hstyle.wrapper}> 
                    <Routes>
                        <Route path="/" element={<Home ></Home>}></Route>
                        <Route path="/explore/*" element={<Explore></Explore>}></Route>
                        <Route path="/profile" element={<Profile ></Profile>}></Route>
        
                        <Route path="/*" element={<PageNotFound></PageNotFound>}></Route>
                    </Routes>
                </div>
           </Router>
       
           
           
           
              

    )

}






export default Homepage;