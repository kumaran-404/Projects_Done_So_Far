import {React,useState,useEffect} from "react"
import axios from "axios"
import Loader from "react-loader-spinner";
import {Avatar,Divider,Fab,Card,Chip,ListItem,ListItemAvatar,Button ,ListItemText,IconButton,Paper,List,ListSubheader,ListItemButton, TextField, Icon, Link, Typography, ButtonGroup, CardContent, InputAdornment} from "@mui/material"
import {useLocation,BrowserRouter as Router,Routes,Route,useParams} from "react-router-dom"
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
import {Aside } from "./asideview"
import SearchIcon from '@mui/icons-material/Search';
import {Post} from "./profileview.js"

export const Explore=()=>{
   
    const [datas,changeData] =useState("")
    const [name,changeName]=useState("")
    const [displayNames,changeDisplayNames] =useState([]);
    const [previewName,changePreviewName]  =useState("");
    const [previewProfile,changePreviewProfile ] =useState("");
    useEffect(()=>{
        if(datas==="")
        {
            axios.get("../backend/fetchnames").then(r=>changeData(r["data"]["details"]));
        }
    
      
    },[datas])
    
    function changeToLower(a)
    {
       var first_letter = a.charAt(0).toUpperCase() ;
       var rem_words = a.slice(1) ;
       return (first_letter+rem_words); 
     
    }
    function changeToUpper(a)
    {
       var first_letter = a.charAt(0).toLowerCase() ;
       var rem_words = a.slice(1) ;
       return (first_letter+rem_words); 
     
    }
    function changevalues(name)
    {
        var k = (name ==="lap")?1:2;
        var name  =document.getElementById("name"+k).value ;
        var tempDisplayNames = [] 

       
        changeName(name);
       
        if(name!="")
        {
        for(var i of  datas)
        {
            
            if((changeToLower(i["account_name"])).startsWith(name)||(changeToUpper(i["account_name"]).startsWith(name)))
            {
                
                tempDisplayNames.push(i);
            }
        }
        changeDisplayNames(tempDisplayNames);
       
       }
       else changeDisplayNames([])
    }
   function ExploreCenter()
   {
       return(
           <Paper sx={{padding:"20px",height:"70vh",overflow:"auto"}}>
           <div className={hstyle.lapprofileview}>
               <TextField placeholder="Type Name" id="name1" defaultValue={name} autoFocus onChange={()=>changevalues("lap")}></TextField>
               <div className={hstyle.searchresult}>
                 

                 {displayNames.map(item=>{
                     return(
                         <div >
        
                         <div className={hstyle.profileview}>
                             <Avatar component="section" src={"/static/"+item["profile_pic"].substring(16)}/>
                             <div >
                                 <span onClick={()=>{changePreviewName(item["account_name"])}} > {item["account_name"]} </span>
                                 <span> {item["first_name"]} {" "}{item["last_name"]} </span>
                             </div>
                         </div>
                         <Divider/>
                       
                         </div>
                     )
                 })}
                 {displayNames.length===0&&<img style={{position:"relative"}} src={"/static/images/no_results.svg"}/>}
                 </div>
           </div>
           </Paper>
       )
   }
   function ExploreAside()
   {
       if(previewName!=="")
       {

        axios.post("../backend/profile/",{"data":previewName}).then(r=>changePreviewProfile(r["data"]))
        changePreviewName("")
        
       }
       function handlePage()
       {
           
        window.location.href = previewProfile["account_name"];
        
       }
       return (
           <div style={{marginTop:"70px"}}>
               {previewProfile!=="" &&
              <div className={hstyle.profilecover}>
                
                <Card className={hstyle.profile} sx={{backgroundColor:"#002147"}}>
                    <div className={hstyle.avatar} style={{clipPath:"polygon(0 0, 0 70%, 48% 85%, 100% 56%, 100% 0, 14% 0%)"}}>
                     
                    <Avatar sx={{height:"100px",width:"100px",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} style={{boxShadow:"rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"}}></Avatar>
                    </div>
                   
                    <CardContent style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
                        <Typography color="text.primary" style={{color:"white",fontWeight:"bolder"}} variant="h6" >{previewProfile["account_name"]}</Typography>
                        <Typography color="text.secondary"  style={{color:"white",fontStyle:"italic"}}>{previewProfile["about"]}</Typography>
                         <Card>
                             <CardContent className={hstyle.profilecontent} >
                                 <div className={hstyle.profilenumbers} >
                                     <span>{previewProfile["follower_no"]}</span>
                                     <span>Followers</span>
                                 </div>
                                 <hr/>
                                 <div className={hstyle.profilenumbers}  >
                                 <span>{previewProfile["following_no"]}</span>
                                     <span>Following </span>
                                 </div>
                                 <hr/>
                                 <div className={hstyle.profilenumbers}  >
                                 <span>{previewProfile["post_count"]}</span>
                                     <span>posts </span>
                                 </div>
                             </CardContent>
                         </Card>
                         <Button variant="contained" onClick={handlePage} color="secondary">View Profile</Button>
                    </CardContent>
                    
                </Card>
             </div>}
           </div>
       )
   }

   function ExploreLapView()
   {
       
       return(
        <div className={hstyle.content}> 
            <Aside path="/explore"></Aside>
         
            <Routes>
                <Route path="/:user_id" element={<ExploreProfLapView/>}></Route>
                <Route path="/" element={<Lap/>}></Route>
            </Routes>
       
  
            
        </div>
       )
   }
   function Lap()
   {
       return(
           
           <>
               <div className={hstyle.center} style={{padding:"5%"}}>
                <ExploreCenter></ExploreCenter> 
            </div>
            <div className={hstyle.right}>
               <ExploreAside></ExploreAside>
            </div>
            </>
           
       )
   }


   function ExploreMobileView()
   {
       return(
           <div>
               <Aside path="/explore"/>
        
              <Routes>
                  <Route path="/" element={<MobProfView></MobProfView>}></Route>
                  <Route path="/:user_id" element={<Mob></Mob>}></Route>
              </Routes>
                
           </div>
       )
   }
   function MobProfView()
   {
       return(
        <div className={hstyle.mobileexploretab} >
        <TextField variant="outlined" classNames={hstyle.input} color="info" sx={{borderRadius:"10px",boxShadow:"0 0 5px rgba(81, 203, 238, 1)"}} placeholder="Search Name..." id="name2" defaultValue={name} autoFocus onChange={()=>{changevalues("mobile")}}
         InputProps={{startAdornment:<InputAdornment>
         <IconButton>
             <SearchIcon></SearchIcon>
         </IconButton>
         </InputAdornment>}}
         size={"small"}
        ></TextField>
        
        <div className={hstyle.searchresult}>
          

        {displayNames.map(item=>{
            return(
                <div>
                 <Paper>
                <div className={hstyle.profileview}>
                    <Avatar component="section" src={"/static/"+item["profile_pic"].substring(16)}/>
                    <div >
                        <span onClick={()=>{window.location.href=item["account_name"]}} > {item["account_name"]} </span>
                        <span> {item["first_name"]} {" "}{item["last_name"]} </span>
                    </div>
                </div>
                <Divider/>
                </Paper>
                </div>
            )
        })}
        {displayNames.length===0&&<img style={{position:"relative",top:"10vh"}} src={"/static/images/no_results.svg"}/>}
        </div>
        </div>
       )
   }
 
   function Mob()
   {
       
       const {user_id} = useParams();
       function post()
       {
           axios.post("../../backend/follow/",{"follower_name":user_id});
       }
       
           var data = {"account_name":user_id}
          
       return(
           <div>
               {user_id}
               <button onClick={post}>Follow</button>
           </div>
       )
   }
function ExploreProfLapView(props)
   {
       const [button,handleButton] = useState("");
    function post()
    {
        axios.post("../../backend/follow/",{"follower_name":user_id}).then(r=>handleButton("Following"));
    }
    function unfollow()
    {
        axios.post("../backend/unfollow/",{"account_name":user_id}).then(r=>{handleButton("Follow")});    
    }
    function handleRequest()
    {
        if(button=='Follow') post() ;
        else unfollow();
    }
       const {user_id}=useParams();
       const [flag,changeFlag] =useState(false);
       const [pagefound,changePageFound] =useState(true);
       const [data,changedata] =useState({})
       const [posts,handlePost] =useState([])
       useEffect(()=>{
     
        var data = {"account_name":user_id}
        axios.post("../../backend/wholeprofile/",data).then(r=>{
            (handleButton( r["data"]["is_following"]===0?"Follow":"Following"));
            if(r["data"]["is_same"]) 
            window.location.href="/profile";
            else 
            changeFlag(true);
            if((r["data"]["data"])==="not found" )
               changePageFound(false);
            changedata(r["data"]);

            axios.post("../../backend/post/ownpost/others/",{'user':r['data']['account_id']}).then(r=>handlePost(r['data']['data']))
            
        })
        
       },[]);


    
       return(
           <>
            {pagefound===true? (flag==true?(<div className={hstyle.center+" "+hstyle.div__} style={{height:"100vh",minWidth:"60%",height:"100%"}}>
                <ProfileShow button={button}  func={handleRequest} name={user_id} data={data}></ProfileShow>
                <Paper sx={{backgroundColor:"white",padding:"20px"}}>
                  {posts.length!==0? (
                      posts.map(el=>{
                          return(
                              <Post data={el} div='explore'></Post>
                          )
                      })
                  ):<div style={{display:"flex",alignItems:"center",position:"relative",top:"25%",left:"25%"}}>
                    
                  <img style={{width:"200px",height:"200px"}} src="/static/nopost.svg"></img>
                  <span >No posts has been made </span>
                  </div>}
                  </Paper>
              </div>
            ):<div className={hstyle.center} >
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
</div>
 )       
         :"404!! not found"}
         <div className={hstyle.right} style={{minWidth:"0%"}}>
</div> 
           </>
       )
   }
   return(
       <div>
           <div className={hstyle.mobiledisappear}>
                 <ExploreLapView/>
            
            </div>

            <div className={hstyle.lapdisappear}>
                
                <ExploreMobileView/>

            </div>
       </div>
   )
   
}


function ProfileShow({data,name,func,button})
{
    var a =data['profile_pic'];
    return(<Paper className={hstyle.profile__show} >
        <div className={hstyle.my__cont}>
       
            <div className={hstyle.profile__pic}> 
                 <img src={typeof(a)==='string'?'/static'+a.substring(23):"/static/no-user.png"}/>  
            </div>

            <div style={{color:"blue",fontWeight:"light",textTransform:"capitalize",marginTop:"40px"}}>
               {data['about']}
            </div>
        </div>

         <div className={hstyle.stat__div}>
            <span className={hstyle.user__name}>{name}</span>
            <div className={hstyle.profile__stat}>
                <div >
                    <span>Followers</span>
                    <span>{data['follower_no']}</span>
                </div>
                <div >
                    <span>Followings</span>
                    <span>{data['following_no']}</span>
                </div>
                <div >
                    <span>Posts</span>
                    <span>0</span>
                </div>

            </div>
            <Button onClick={func}>{button}</Button>
           
         </div>
       
    </Paper>)
}