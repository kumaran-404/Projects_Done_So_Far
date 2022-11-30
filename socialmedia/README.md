Look at video of this project [video](https://youtu.be/Skb2-r6SRYg)

## ER - Diagram :
![Screenshot from 2022-11-30 21-27-23](https://user-images.githubusercontent.com/86183777/204846544-01f82876-f2f2-4707-a2f9-f4515492233b.png)

## Relational Schema :

Account ( primary_key(account_id) , name(unique) , created_at , isPrivate, isActive ) 

Follows( account_id( foreign_key) , following_id(foreign_key) )

Profile( account_id ( foreign_key ) , about, profile_pic);

Post( postid(primary_key) , account_id (foreign_key) , posted_at )

Images( post_is(foeign_key) , image_path) 

Comment( post_id(foreign_key) , Comment_text)

Like( post_id(foreign)key) , liked_by( references Account(account_id) ) )


## What if it is no-SQl

Account {
  
  Account_id ,
  Account_name , 
  Followers[] ,
  Followings[] , 
  posts[] ,
  profile_pic ,
  about 

}

Post {
  
  post_id , 
  images[] , 
  liked_by[] ,
  commented_by{ account_id,time,comment_text}[]  , 
  info

}
