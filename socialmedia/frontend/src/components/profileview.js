import {React,useState,useEffect} from "react"
import axios from "axios"
import {Avatar,Divider,Fab,Tabs,Tab,Card,TabPanel,ListItem,ListItemAvatar,Button ,ListItemText,IconButton,Paper,List,ListSubheader,ListItemButton, TextField, Icon, Link, Typography, ButtonGroup, CardContent, ListItemIcon, AppBar, Modal} from "@mui/material"
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
import CloseIcon from '@mui/icons-material/Close';
import {Aside} from "./asideview";
import {Loading} from '../index';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import {CommentBox} from './postcover';


export const Profile=()=>{
    const [profileData,changeProfileData] =useState("");
    const [SavedPosts,changeSavedPosts] =useState([]);
    const [posts,changePosts]=useState([])
    const [pic ,changePic] =useState("")
    const [openModal,changeOpenModal] =useState("")
    useEffect(()=>{
        console.log(profileData)
        if(profileData==="")
        {

            axios.post("../backend/profile/").then(r=>changeProfileData(r["data"]));
                  

        }
        else changePic(profileData["profile_pic"])
    },[profileData]);

    
    function ProfileCenter()
    {
        return(
            <div className={hstyle.profilecover}>
                
               <Card className={hstyle.profile} sx={{backgroundColor:"#002147"}}>
                   <div className={hstyle.avatar} style={{clipPath:"polygon(0 0, 0 70%, 48% 85%, 100% 56%, 100% 0, 14% 0%)"}}>
                    
                   <Avatar sx={{height:"100px",width:"100px",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} style={{boxShadow:"rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"}} ></Avatar>
                   </div>
                  
                   <CardContent style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
                       <Typography color="text.primary" style={{color:"white",fontWeight:"bolder"}} variant="h6" >{profileData["account_name"]}</Typography>
                       <Typography color="text.secondary"  style={{color:"white",fontStyle:"italic"}}>{profileData["about"]}</Typography>
                        <Card>
                            <CardContent  className={hstyle.profilecontent} >
                                <div className={hstyle.profilenumbers} >
                                    <span>{profileData["follower_no"]}</span>
                                    <span ><Button onClick={()=>changeOpenModal("follower")}>Followers</Button></span> 
                                </div>
                                                               <hr/>
                                <div className={hstyle.profilenumbers}  >
                                <span>{profileData["following_no"]}</span>
                                    <span ><Button onClick={()=>changeOpenModal("following")}>Following</Button> </span>
                                </div>
                            </CardContent>
                        </Card>
                   </CardContent>
                   
               </Card>
            </div>
        )
    }
    function ProfileAside()
    {
        const [value,changeValue] =useState("post");
        const handleChange =(event,val)=>{
            changeValue(val);
        } ;
        const [post,changePost] =useState("");

        useEffect(()=>{
            axios.get("../backend/post/ownpost/mine").then(r=>changePost(r['data']['data']));

        },[]);
      
         return (
            <div className={hstyle.lapaside}>
                 
                <div className={hstyle.lapasidecont}>
                   
                <Paper className={hstyle.posts} sx={{height:"90%",overflow:"auto"}}  elevation={3}  style={{position:"relative"}}>
                     
                    {post===''?<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} >Loading ...</div>:
                    (post.length===0?<div className={hstyle.no__post}> No posts available :( </div>: 
                    
                    post.map(el=>{
                        return(
                            <Post data={el} profile={profileData}/>
                        )
                    })
                    )}
                     
                     
                </Paper>
                </div>
              

            </div>
        )
    }

    function ProfileMobileView()
    {
        return(
            <div>
                <Aside path='/profile'></Aside>
                 
                 <div>
                     <Paper className={hstyle.mobileprofileWrapper} sx={{margin:"12px",padding:"3vw"}}>
                         <div className={hstyle.mobileprofilepic}>
                            <Avatar style={{width:"30vw",height:"30vw",margin:"5vw"}}  component="div" ></Avatar>
                            
                            <Typography color="text.primary" style={{fontSize:"small",fontWeight:"bolder"}} variant="h6" >{profileData["account_name"]}</Typography>
                            <Typography color="text.secondary"  style={{fontStyle:"italic",fontSize:"small"}}>{profileData["about"]}</Typography>
                         </div>
                         <div className={hstyle.mobileprofilenum}>
                             <div >
                                <span style={{cursor:"pointer"}}  onClick={()=>{changeOpenModal("follower")}}> {profileData["follower_no"]}</span>
                                 <span style={{fontSize:"small"}}> Followers</span>
                             </div>
                             <div >
                                <span style={{cursor:"pointer"}} onClick={()=>{changeOpenModal("following")}}> {profileData["following_no"]}</span>
                                 <span  style={{fontSize:"small"}}>Followings</span>
                             </div>
                        </div>
                     </Paper>
                     <ProfileAside></ProfileAside>
                 </div>

                 
            </div>
        )
    }





    function ProfileLapView()
    {
        return(
            <div className={hstyle.content}> 
                <Aside  path="/profile"></Aside>
                <div className={hstyle.center} style={{maxWidth:"25%",minWidth:"25%",height:"100vh",padding:"10vh 0 "}}>
                    <ProfileCenter></ProfileCenter>
                </div>
                <div className={hstyle.right} style={{maxWidth:"40%",minWidth:"40%"}}>
                   <ProfileAside></ProfileAside>
                </div>
            </div>
        )
    } 


    return(
        <div > 
           <div >
            <div className={hstyle.mobiledisappear}>
             <ProfileLapView></ProfileLapView>
           </div>
           <div className={hstyle.lapdisappear}>
                <ProfileMobileView></ProfileMobileView>
           </div>

</div>
            
            
          
           
           <div className={hstyle.modalcontainer} style={{display:openModal===""?"none":""}}>
               <div className={hstyle.modalbackground}>
                   
               </div>
           {openModal==="following"?<Modal method="Following"></Modal> : (openModal==="follower"?<Modal method="Followers"></Modal> :"")}
           </div>
         
        </div>
    )
    
function Modal({method})
{
   const [arr,changeArr] =useState("")
    
    if(arr==="")
    {
        if(method==="Following")
    axios.post("../backend/getfollowings/").then(r=>changeArr(r["data"]["data"]));
    else 
    axios.post("../backend/getfollowers/").then(r=>changeArr(r["data"]["data"]))
    }

   
    return(
        <div className={hstyle.modal} >
                <Paper sx={{padding:"0px 15px 10px 15px",overflow:"auto"}} className={hstyle.modalpaper}>
                <ListSubheader sx={{position:"sticky",top:"0",padding:"10px 0"}}>
                    <div className={hstyle.modaltop}>

                    {method}
                            <IconButton onClick={()=>changeOpenModal("")}>
                                <CloseIcon></CloseIcon>
                            </IconButton>
                            </div>
                        </ListSubheader>
                        {arr!==""?
                    <List sx={{overflow:"auto",width:"100%"}}>
                    
                       {arr.map((item)=>{
                           return(
                               <div style={{display:"flex",flexDirection:"column"}}>

                               <div style={{display:"flex",justifyContent:"space-evenly",marginLeft:"7px"}}>
                                   <ListItemAvatar>
                                        <Avatar src={item[3]!==""?"/static/"+item[2].substring(17):""}></Avatar>
                                    </ListItemAvatar>
                                   <ListItemText sx={{cursor:"pointer"} } onClick={()=>{window.location.href="/explore/"+item[1]}} >
                                    {item[1]}
                                   </ListItemText>
                                  
                                </div>
                                <Divider style={{width:"100%",margin:"10px 0"}}></Divider>
                                </div>
                           )
                       })}
                        
                        

                    </List>:<div style={{width:"100%",height:"100%",position:"sticky",bottom:"0"}}>
                        <img  style={{width:"100%",height:"100%"}}src="/static/images/undraw_waiting__for_you_ldha.svg"/>
                        </div>}
                </Paper>
               
            
        </div>
    )
}

}


export function Post({data,div})
{
    return(
        <div className={hstyle.each__post}>
           <Content data={data}></Content>
           <Bottom likes={data['likes']} div={div} comments={data['comments']}></Bottom>
        </div>
    )
}

function Content({data})
{
    return(
        <div style={{padding:"10px"}}>
            {data['post_info']['post_text']}
            <Image data={data['image']}></Image>
        </div>
    )
}

function Image({data})
{
    const [open,open_image] =useState(false); 
    const [image,changeImage] =useState("")
    return(
        <div className={hstyle.image__cont}>
           {
               data.map(el=>{
                   if(data.length==0)
                   {
                       return(
                           <div>
                               no images
                           </div>
                       )
                   }
                   else 
                   {
                    return(

                   
                        <div >
                           <img onClick={()=>{open_image(true);changeImage('/static/'+el['image'].substring(13))}} src={'/static/'+el['image'].substring(13)}></img>
                         </div>
                        )
                   }
               })
           }
           <div  className={hstyle.preview__image} style={{display:open?"":"none"}}>
               <IconButton onClick={()=>open_image(false)}>
                   <CloseIcon></CloseIcon>
               </IconButton>
               <img src={image}></img>
           </div>
        </div>
    )
}

function Bottom({likes,comments,div})
{

    function likeModal()
    {
        changeOpenModal(true) ;
        setTimeout(()=>{
            changeOpenModal(false);
        },4000)
    }
    const [open,handleOpen] =useState(false);
    const [openModal,changeOpenModal] =useState(false);
    return(
        <div>
            <IconButton sx={{fontSize:"small"}} onClick={likeModal}>
                <FavoriteOutlinedIcon sx={{color:"red"}}></FavoriteOutlinedIcon>
                {likes.length}
            </IconButton>
            <IconButton onClick={()=>handleOpen(!open)} sx={{fontSize:"small"}} >
                <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                {comments.length}
            </IconButton>

            <CommentBox  name={div==='explore'?'others':'owner'} comments={comments} open={open}
            ></CommentBox>
          
           <LikeModal likes={likes} open={openModal}></LikeModal>
        </div>
    )
}


function LikeModal({likes,open})
{
  
    if(open===true)
    {
        return(
            <Paper className={hstyle.like__modal}>
                <h4>Liked by</h4>
                {likes.length===0?<div className={hstyle.no_like}>No likes</div>:
                
                likes.map(el=>{
                    return(
                        <div className={hstyle.each__like}>
                                         <Avatar  src={el['profile_pic']!==null? '/static'+el['profile_pic'].substring(23):""}></Avatar>                        
                        <a href={"/explore/"+el['name']} className={hstyle.liked__by}> {el['name']} </a>
                        <Divider></Divider>
                        </div>
                    )
                }) 
                }
                
            </Paper>
        )
    }
    else 
    {
        return(
            <div></div>
        )
    }
}
