import React,{useState,useEffect} from "react"
import {Grow,Snackbar,IconButton,Button,Fab ,Avatar, Fade,  Tooltip, Divider,Dialog,DialogContent,DialogTitle,DialogContentText, TextField, InputBase, DialogActions,List, ListItem, Icon, ImageList, ImageListItem} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GifIcon from '@mui/icons-material/Gif';
import PollIcon from '@mui/icons-material/Poll';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Picker from "emoji-picker-react";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const  Post =()=>{

    const [open,changeOpen] =useState(false)
    const [openicon,changeOpenIcon] =useState(false);
    const [openTextModal,changeOpenTextModal] =useState(false);
    const [emoji,openEmoji] =useState(false);
    const [input,changeinput] =useState("");
    const [initial,changeInitial] =useState(false);
    const [val,changeDefault] =useState("");
    const [feedback,changeOpenFeedback] =useState(false);
    const [imagePostModal,changeOpenMediaModal] =useState(false);
     return(
        <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex",width:"max-content",justifyContent:"space-around",alignItems:"center",height:"80%",flexDirection:"column"}}   onMouseLeave={()=>{changeOpenIcon(false)}}>
                <Grow in={open } onClick={()=>changeOpenMediaModal(true)}  timeout={1000} onMouseEnter={()=>{changeOpen(true)}} onMouseLeave={()=>{changeOpen(false)}}>
                     <Tooltip title="Image / Video" placement="right">
                     <Fab size="small" >
                         <ImageIcon></ImageIcon>
                     </Fab>
                     </Tooltip>
                </Grow>
                
                <Grow in={open } timeout={500}>
                <Tooltip title="Text" placement="right">
                <Fab size="small"  onClick={()=>changeOpenTextModal(true)} onMouseEnter={()=>{changeOpen(true)}}  onMouseLeave={()=>{changeOpen(false)}}>
                        <TextFieldsIcon></TextFieldsIcon>
                    </Fab>
                    </Tooltip>
                </Grow>
                
                
                <Fab color="primary" onMouseEnter={()=>{changeOpen(true);changeOpenIcon(true)}}  onMouseLeave={()=>{changeOpen(false)}}>
      
                        {openicon===true?<CloseIcon/>:<AddIcon/>}
                </Fab>
                 
            </div>
          
          {openTextModal===true?<PostModal/>:""} 
          {imagePostModal===true&&<ImagePostModal></ImagePostModal>}
           <Snackbar
        open={feedback}
        autoHideDuration={6000}
      
        message="Posted successfully" 
        action ={(<IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={()=>changeOpenFeedback(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>)}
      
      />
        </div>
    )

    function  ImagePostModal()
    {
        const [mediaPostImages,changeMediaPost] =useState([1]);
        function upload()
        {
            document.getElementById("image").click();
        }

        function preview()
        {
            var reader =new FileReader() ;
            var image = document.getElementById("image").files[0] ;

            reader.readAsDataURL(image) ;
          
            reader.onload = function(e){
                changeMediaPost(prevState=>[...prevState,this.result]);
            } 
        }
        function ImageContainer({images})
        {
            const [fullWidth,changeToFullWidth] =useState(false);

            function fadeImage(num)
            {
                
                changeToFullWidth(true);
                changeMediaPost(document.getElementById(num+"button").src);
              
            }
            function deleteImage(num)
            {
                var tempImages =[...images] ;
                tempImages.splice(num,1);
                changeMediaPost(tempImages);

            
            
            }
            return(
                <div>
                    <div style={{overflow:"auto"}}>
                    <ImageList sx={{width:"80%",margin:"auto"}} cols={5} rowHeight={100} >
                    {mediaPostImages.map((item,id)=>{
                        return(
                            <div    style={{position:"relative"}} >
                            <ImageListItem  sx={{cursor:"pointer",border:"1px cornflowerblue  solid",margin:"5px"}}>
                                <img src={item} id={id+"button"} loading="lazy" ></img>
                            </ImageListItem>
                            <div onClick={()=>deleteImage(id)} style={{position:"absolute",right:"0%",bottom:"0%"}}>
                                <IconButton sx={{color:"red"}}>
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </div>
                            <div onClick={()=>fadeImage(id)} style={{position:"absolute",left:"0%",top:"0%"}}>
                                <IconButton sx={{color:"#224466"}}>
                                    <ZoomOutMapIcon></ZoomOutMapIcon>
                                </IconButton>
                            </div>
                            </div>
                        )
                    })}
                    </ImageList>
                   
                </div>
                     {fullWidth===true&&<div style={{width:"100vw",height:"100vh",top:"0",left:"0",backgroundColor:"transparent",position:"fixed",zIndex:100}}>
                       <div style={{width:"100%",height:"100%",position:"relative"}}>
                        <img src={image} height="70%"  width="40%" style={{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
                        <IconButton style={{position:"absolute",right:"69%",top:"11%"}} onClick={()=>changeToFullWidth(false)}>
                            <CloseIcon sx={{color:"info"}}></CloseIcon>
                        </IconButton>
                       
                        </div>
                        </div>}
               
                </div>
                
            )
        }

        return(
            <Dialog fullWidth={true} open={true}>
                <DialogTitle>
                     <IconButton onClick={()=>changeOpenMediaModal(false)}>
                         <CloseIcon></CloseIcon>
                     </IconButton>
                     <Divider></Divider>
                </DialogTitle>
                <DialogContent>
                    <input onChange={preview} type="file" id="image" style={{display:"none"}}></input>
                    <Button onClick={upload}>
                       Upload Image 
                    </Button>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        <ImageContainer images={mediaPostImages}></ImageContainer>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }






    function PostModal()
    {
        const [data,changedata] =useState("");
        const [imgArray,changeImgArray] =useState([]);
        const [images,changeImages] =useState([]);
      

        useEffect(()=>{
            if(data==="")
            {
                axios.post("../backend/profile/").then(r=>changedata(r["data"]["profile_pic"]))
            }
        },[data]);
      
        
        function view()
        {
            var reader =new FileReader() ;
            var image = document.getElementById("image").files[0] ;

            reader.readAsDataURL(image) ;
          
            reader.onload = function(e){
                changeImages(prevState=>[...prevState,this.result]);
            } 
            var a =[];
        
            
            changeImgArray(prev=>[...prev,image]);
          
            
        }
      
        function ImageContainer({images})
        {
            const [fullWidth,changeToFullWidth] =useState(false);

            function fadeImage(num)
            {
                
                changeToFullWidth(true);
                changeImages(document.getElementById(num+"button").src);
              
            }
            function deleteImage(num)
            {
                var tempImages =[...images] ;
                tempImages.splice(num,1);
                changeImages(tempImages);

            
            
            }
            return(
                <div>
                    <div style={{overflow:"auto"}}>
                    <ImageList sx={{width:"80%",margin:"auto"}} cols={5} rowHeight={100} >
                    {images.map((item,id)=>{
                        return(
                            <div    style={{position:"relative"}} >
                            <ImageListItem  sx={{cursor:"pointer",border:"1px cornflowerblue  solid",margin:"5px"}}>
                                <img src={item} id={id+"button"} loading="lazy" ></img>
                            </ImageListItem>
                            <div onClick={()=>deleteImage(id)} style={{position:"absolute",right:"0%",bottom:"0%"}}>
                                <IconButton sx={{color:"red"}}>
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </div>
                            <div onClick={()=>fadeImage(id)} style={{position:"absolute",left:"0%",top:"0%"}}>
                                <IconButton sx={{color:"#224466"}}>
                                    <ZoomOutMapIcon></ZoomOutMapIcon>
                                </IconButton>
                            </div>
                            </div>
                        )
                    })}
                    </ImageList>
                   
                </div>
                     {fullWidth===true&&<div style={{width:"100vw",height:"100vh",top:"0",left:"0",backgroundColor:"transparent",position:"fixed",zIndex:100}}>
                       <div style={{width:"100%",height:"100%",position:"relative"}}>
                        <img src={image} height="70%"  width="40%" style={{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
                        <IconButton style={{position:"absolute",right:"69%",top:"11%"}} onClick={()=>changeToFullWidth(false)}>
                            <CloseIcon sx={{color:"info"}}></CloseIcon>
                        </IconButton>
                       
                        </div>
                        </div>}
               
                </div>
                
            )
        }


        function emojiclick(event,object)
        {
            document.getElementById("posttext").value += object.emoji ;
           

         
        }
     
        function post()
        {
            var data =new FormData() ;
            data.append('text',document.getElementById("posttext").value) ;
            for(let i=0;i<imgArray.length;i++)
            {
                data.append('image'+i,imgArray[i]);
            }
            data.append("type","t");
            axios({method:"POST",url:"backend/post/",data:data,headers:{ "content-type": "multipart/form-data"}}).then(
                r=> {changeOpenFeedback(true);changeOpenTextModal(false);});
           

        }
       
    
           
            

        return(
             
                <Dialog open={true} fullWidth={true}  >
                    
                    <DialogTitle>
                         <IconButton>
                             <CloseIcon onClick={()=>changeOpenTextModal(false)}></CloseIcon>
                         </IconButton>
                         <Divider sx={{width:"100%"}}></Divider>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" sx={{display:"flex"}}>
                            <Avatar ></Avatar>
                            <InputBase multiline rows={7} variant="standard"
                             margin="normal"  autoFocus={true} 
                             style={{marginLeft:"10px"}}  
                             fullWidth placeholder="What's Happening?" id="posttext">
                            </InputBase>
                        </DialogContentText>
                       
                    </DialogContent>
                    <ImageContainer images={images}/>

                    <DialogActions sx={{display:"flex",justifyContent:"space-around"}}>

                        <List sx={{display:"flex"}}>

                            <ListItem>
                                <input onChange={view} style={{display:"none"}} multiple id="image"  type="file"></input>
                                <Tooltip title="Media">
                                    <IconButton onClick={()=>{document.getElementById("image").click()}}> <ImageIcon></ImageIcon></IconButton>
                                </Tooltip>
                            </ListItem>

                            <ListItem>
                                <Tooltip title="Emoji" >
                                    <IconButton onClick={()=>{openEmoji(!emoji);}}>
                                        <InsertEmoticonIcon sx={{color:emoji===true&&"blue"}}></InsertEmoticonIcon>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>

                            <ListItem>
                                <Tooltip title="GIF">
                                    <IconButton>
                                        <GifIcon></GifIcon>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>

                            <ListItem>
                                <Tooltip title="Poll">
                                    <IconButton> 
                                        <PollIcon></PollIcon>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>

                        </List>

                        <Button variant="contained" onClick={post} color="primary">Post</Button>
                    </DialogActions>
                   {emoji===true&& <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                   <Picker onEmojiClick={emojiclick}></Picker>
                       </div>}
                </Dialog>
       
        )
    }
}

