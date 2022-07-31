import { IconButton, InputAdornment, TextField,Paper,Chip,Button ,Avatar,Snackbar,Alert} from "@mui/material";

import React, { useState,useEffect } from "react"
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import CheckIcon from '@mui/icons-material/Check';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import profilestyle from "../../static/css/profile.css"
import Picker from "emoji-picker-react"
import axios from "axios"
import FormData from "form-data"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function CreateProfile()
{
    const [bio,changeBio]  =useState("");
    const [now,changeNow]=useState(0);
    const [value ,changeValue]=useState("1234567890");
    const [edit,changeEditMode] =useState(false);
    const [imageSrc,changeimageSrc]=useState("");
    const [imageError,changeError] =useState("");
    const [open,changeOpen] =useState(false)
    const [image,changeImage] =useState("")
    useEffect(()=>{
        if(value==="1234567890")
        { console.log("hi")
            axios.post("../backend/profile/").then(r=>changeValue(r["data"]["account_name"]))
        }
    },[value])

   
    function changeprofile()
    {
        var data = new FormData()
        data.append("profile_pic",image);
        data.append("bio",bio);
        data.append("account_name",value);
        axios({method:"POST",url:"../backend/changeprofile/",data :data ,headers:{ "content-type": "multipart/form-data"}}).then(r=>  { window.location="";changeOpen(!open);} );
    }
    return(
        <div className={profilestyle.fullcont}>

              <Paper className={profilestyle.wrapper}>
               
           
               <DisplayTask now={now} />
                 
                 <div className={profilestyle.innerbox}>   
               {now===0? <AccountName></AccountName> :(now===1 ?  <ProfilePic></ProfilePic>: <Bio></Bio>)  } 
               {now==3&&"ru sure of fnishing ??"}
               </div>
     
                <div className={profilestyle.buttongroup}>
                <Button size="small" onClick={()=>{  now>0&&changeNow(now-1)}}> Back</Button>
                 <Button size="small" variant="contained" onClick={()=>{now<3&&changeNow(now+1) ; now==3&&changeprofile(); }}> {now==3?"Finish":"Next"} </Button>
                
                 </div>
             </Paper>
             <Snackbar open={open} autoHideDuration={6000} >
  <Alert  severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>
</Snackbar>
        </div>

      
    )

   


function DisplayTask({now})
{
    var taskList =[ "Edit account name","Set profile picture","bio"];
   
    return(
        <div className={profilestyle.top}> 
             <div className={profilestyle.banner}>
            {taskList.map((r,iter)=>{
                return(
                    <div style={{flexGrow:1,textAlign:"center"}}>
                        <Chip  label={iter<now? <CheckIcon ></CheckIcon>:(iter+1)} color={iter<now?"success":"primary"}></Chip>
                        <span className={profilestyle.task}>{r}</span>
                        
                    </div>
                )
            })}
           
        </div>
    
        </div>
       
    )
}


function AccountName()
{
    
    
   
    return(
        <div>
            
            <TextField value={value}  size={"small"}  className={profilestyle.acct} onChange={()=>{changeValue(document.getElementById("input").value)}} id="input" focused={edit}    disabled={!edit}  autoFocus={true} InputProps={{endAdornment:
            <InputAdornment>
            <IconButton onClick={()=>changeEditMode(!edit)} >
                 {!edit===true?  <ModeEditOutlineTwoToneIcon style={{color:"blue"}}></ModeEditOutlineTwoToneIcon>:<DoneAllTwoToneIcon style={{color:"green"}}/> } 
            </IconButton>
            </InputAdornment>
            }} ></TextField>
            
        </div>
    
    )
}

function ProfilePic()
{
    function imagePreview()
    {
       
        var reader = new FileReader();
        var image =document.getElementById("file").files[0];
        var name  =image["name"].split(".");
        name =name[1];
        if(!(name ==="jpg" || name==="png" || name=="jpeg"))
        { console.log(name);changeError("invalid import ") ; document.getElementById("file").value="" } 
        else  {reader.readAsDataURL(image);changeError("")}
        reader.onload = function(e){
        changeimageSrc(this.result);
       changeImage(image)

        
        }
       
    }
  
    return(
        <div className={profilestyle.image_preview}>
           <Avatar id="image-preview" src={imageSrc} className={profilestyle.image}></Avatar>
           <input type="file" id="file"   style={{"display":"none"}}   onChange={imagePreview} ></input>
           <IconButton onClick={()=>{ document.getElementById("file").click() }}> <AddAPhotoIcon></AddAPhotoIcon> </IconButton>
            <div  style={{visibility: imageError!=="" ?"visible":"hidden" }}>  Invalid Import</div>
        </div>

    )
}

function Bio()
{
    function emojiClicked(a,obj)
    {
         changeBio(document.getElementById("bio").value +obj["emoji"])
    }

    const [openEmoji,changeOpenEmoji] =useState(false)
    var k=bio ;
    return(
        <div className={profilestyle.bio} >
            <div >
            <TextField   id="bio"  className={profilestyle.about} rows={5} multiline 
            defaultValue={k}  onBlur={()=>{changeBio(document.getElementById("bio").value)}}
            color="info"></TextField>

            <IconButton style={{"color":(openEmoji?"#b0e0e6":"")}}  className={profilestyle.bioEmoji} onClick={()=>changeOpenEmoji(!openEmoji)}>
                 <InsertEmoticonIcon></InsertEmoticonIcon>
             </IconButton>
          
            </div>
              
              { <div style={{visibility:openEmoji?"visible":"hidden"}}> <Picker  onEmojiClick={emojiClicked}></Picker></div>} 
       
            
         </div>
    )
}


}

export default CreateProfile;