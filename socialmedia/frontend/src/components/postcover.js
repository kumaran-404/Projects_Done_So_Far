import React, { useState,useRef,useEffect } from "react"
import {Avatar,Divider,ListItem,ListItemAvatar,Button,Chip, ListItemText,IconButton,Paper,List,ListSubheader,ListItemButton, TextField} from "@mui/material"
import style from "../../static/css/post.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export function PostFrame({data})
{
    if(data['post_data']['post_type']==="t")
    {
        return <TextPost data={data}></TextPost>
    }
    else 
    {
        return <ImagePost data={data}></ImagePost>
    }
}

export function TextPost({data})
{
    return(
        <Paper className={style.post}>
            <PostTop name={data["posted_by"]}  profilepic={data["profile_pic"]}></PostTop>
            <TextContent data={data}></TextContent>
            <PostBottom name={data['posted_by']} data={data}></PostBottom>
        </Paper> 
    )
}

export function ImagePost({data})
{
    return(
        <Paper className={style.post}>   
           <PostTop></PostTop>
           <PostBottom></PostBottom>
        </Paper> 
    )
}

function PostTop({name,profilepic})
{
    function explore()
    {
        window.location.href = "/explore/"+name ;
    }
    return(
        <div className={style.postTop}>
        
            <Avatar src={"/static/"+profilepic.substring(24)}> </Avatar>
            <span onClick={explore} className={style.accountName}>{name}</span>
        </div>
    )
}

function PostBottom({data,name})
{
    const [openComment,changeOpenComment]=useState(false)
    const [like,changeLike] =useState(data["post_data"]["already_liked"])
    const [likeNum,changeLikeNum] = useState(data["post_likes"].length) ;
    const likes= data["post_likes"].length;

    function likeit()
    {
        axios.post("/backend/post/likes/like/",{"post_id":data["post_data"]["post_id"]}).then(r=>{
        
            changeLikeNum((likeNum===likes)?likes+1:likes);
            changeLike(!like)

        })
        
    }
    function dislikeit()
    {
        axios.post("/backend/post/likes/dislike/",{'post_id':data["post_data"]["post_id"]}).then(r=>{
            changeLikeNum(likeNum-1);
            changeLike(!like)
        })
    }

    return(
        <div 
        className={style.postBottom}>
        
          <div style={{marginLeft:"10px",display:"flex"}}>

      
            <span className={style.font}>
                {
                    like==false? 
                    <div className={style.likepanel}>
                        <FavoriteBorderIcon  onClick={likeit} sx={{cursor:"pointer",fontSize:"30px"}}></FavoriteBorderIcon>
                        <div style={{marginRight:"10px"}}>
                            {likeNum}
                        </div>
                    
                    </div>:

                    <div className={style.likepanel}>

                        <FavoriteOutlinedIcon onClick={dislikeit} sx={{cursor:"pointer",color:"red",fontSize:"30px"}}/>
                    
                        <div style={{marginRight:"10px"}}>
                            {likeNum}
                        </div>
                    </div>
                }
               
               </span>
            <div className={style.commentpanel} >
            <span className={style.font}>
                <ChatBubbleOutlineRoundedIcon onClick={()=>{changeOpenComment(!openComment)}} sx={{cursor:"pointer",fontSize:"30px",color:openComment&&"blue"}}/>
            </span>
            <span>{data["post_comments"].length}</span>
            </div>
           

            </div>
            <Comment name={name} pdata={data["post_data"]["post_id"]} comments={data["post_comments"]} open={openComment} ></Comment>
        </div>
    )
}


function Comment({open,comments,pdata,name})
{  
    const [openComment,changeOpenComment] =useState(false);
    const comment = useRef();
    const [c,changeComments] = useState("");


    useEffect(()=>{
        axios.post("backend/post/comment/get/",{"post_id":pdata}).then(r=>changeComments(r["data"]["data"]))
    },[])
 
    function post()
    {
        var post_comment = comment.current.value ;
       
        var data ={'post_id':pdata,'comment_text':post_comment};
        axios.post("/backend/post/comment/post/",data).then(r=>{changeComments(r["data"]["data"]);comment.current.value=""});
    }
    if(open===true)
    {
    return(
        <div>
          
            <div className={style.commentsection}>
            <TextField 
            multiline={true}
            sx={{width:"90%"}}
            placeholder="Write your comment"
            inputRef={comment}
            
            ></TextField>
            <IconButton onClick={post}> 
                <SendIcon/>
            </IconButton>
            </div>
            

            <Button onClick={()=>{changeOpenComment(!openComment)}}>{openComment?"Less":"More"}</Button>
            <CommentBox name={name} comments={c} open={openComment}></CommentBox>

            
        </div>
    )
    }
    else 
    {
        return(
            <div>

            </div>
        )
    }
}

export function CommentBox({open,comments,name})
{
   
    const [this__comment,changeComment] =useState(comments);
    function del(id,pid)
    {
        var data ={'id':id,'post_id':pid};
        axios.post("../backend/post/comment/delete/",data).then(r=>{
            changeComment(r['data']['data']) ;
            
        });
    }
    
    if(open===true)
    {
    return(
        <div>
          
            {
                
               
                this__comment.map(el=>{
                    return(
                      
                        <div className={style.eachcomment}>
                             
                            <div style={{display:"flex"}}>
                                <div className={style.coverpic}></div>
                                <div className={style.commentedby}>{el["commented_by"]}</div>
                            </div>
                            <div className={style.commenttext}>
                                {el["comment_text"]}
                              
                            </div>
                            {name==='owner'?<Button color="error" onClick={()=>del(el['comment_id'],el['post_id'])}> Delete</Button>:""}
                    </div>
                    )


                })
            }
       
           
        </div>
    )
    }
    else 
    {
        return(
            <div>
            </div>
        )
    }
}


function TextContent({data})
{
    return(
        <div>
            <div className={style.content}>
                {data["post_data"]["post_text"]}


            </div>
            <Images images={data["post_images"]}></Images>
        </div>
    )
}

function Images({images})
{
    const [pos,changePos] = useState(0);
    return(<div>
            
            {images.length>0 ?
            <div className={style.imagecont}>
                <img src={"/static/"+images[pos].substring(13)} style={{width:"100%",height:"400px"}}/>
                {
                    images.length>1 ?<div className={style.navButton}>
                        <IconButton  disabled={pos==0?true:false} onClick={()=>{changePos(pos>0?pos-1:pos)}}>
                            <ArrowBackIosIcon sx={{color:pos!==0&&"black"}}/>
                        </IconButton>
                        <IconButton  disabled={pos==images.length-1?true:false} onClick={()=>{changePos(pos<images.length-1?pos+1:pos)}}>
                            <ArrowForwardIosIcon sx={{color:pos!=images.length-1&&"black"}}></ArrowForwardIosIcon>
                        </IconButton>
                        </div> :""
                }
            </div> :""}
        </div>
    )
}