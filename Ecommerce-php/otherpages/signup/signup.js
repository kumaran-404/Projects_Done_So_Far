function password(a,b)
{
    if(a==='show')
    {
       
        document.getElementById("show"+b).style.display="";
        document.getElementById("notshow"+b).style.display="none";
        if(b===1)
        document.getElementById("password").type="text";
        else 
        document.getElementById("retypepassword").type="text";

    }
    else 
    {
        document.getElementById("notshow"+b).style.display="";
        document.getElementById("show"+b).style.display="none";
        if(b===1)
        document.getElementById("password").type="password";
        else 
        document.getElementById("retypepassword").type="password";
    }

}
function check()
{
    email=false;
    number=false;
    retype=false;
    pass=false;
   if((document.getElementById("email").value.trim().endsWith("@gmail.com"))&&(document.getElementById("email").value.trim().length>10))
  {
    email=true; 
    document.getElementById("email").style.border="none" 
    document.getElementById("item1").style.opacity=0;
  }
  else 
  {
      document.getElementById("email").style.border="1px solid red";
      document.getElementById("item1").style.opacity=1;
  }
  
 if((document.getElementById("number").value.length===10 ))
  {
      a=document.getElementById("number").value;
      e=0;
        for(let x=0;x<a.length;x++)
      {
          if(!((a.charCodeAt(x)>=48)&&(a.charCodeAt(x)<=57)))
          {
          e=1;   
      
      break;
          }
         
          
      }
      if(e===1)
      {
          number=false;
          document.getElementById("email").style.border="1px solid red";
      document.getElementById("item2").style.opacity=1;

      }
      else 
      {
          number=true;
        document.getElementById("number").style.border="none" 
        document.getElementById("item2").style.opacity=0;
   

      }

      
  }
  else
  {
    document.getElementById("number").style.border="1px solid red";
      document.getElementById("item2").style.opacity=1;
  }

 
  //strong pass word or not  : 8 character where in each atleast one caps ,one small,one digit,one symbol
  a=document.getElementById("password").value ;
  
  num_digit=0;
  num_caps=0;
  num_small=0;
  num_sym=0;
  if(a.length>=8)
  {
  for(let x=0;x<a.length;x++)
  {
      if((a.charCodeAt(x)>=48)&&(a.charCodeAt(x)<=57))  num_digit+=1;
      else if((a.charCodeAt(x)>=97)&&(a.charCodeAt(x)<=122)) num_small+=1;
      else if((a.charCodeAt(x)>=65)&&(a.charCodeAt(x)<=90)) num_caps+=1;
      else num_sym+=1;
  }
}
  if((num_digit>=1)&&  (num_caps>=1)&&  (num_small>=1) && (num_sym>=1))
  {
      pass=true;
      document.getElementById("password").style.border="none";
      document.getElementById("item3").style.opacity=0;

  }
  else 
  {
    document.getElementById("password").style.border="1px solid red";
      document.getElementById("item3").style.opacity=1;

  }

  if(document.getElementById("retypepassword").value===a)
  {
      retype=true;
      document.getElementById("retypepassword").style.border="none";
      document.getElementById("item4").style.opacity=0;
  }
  else 
  {
    document.getElementById("retypepassword").style.border="1px solid red";
      document.getElementById("item4").style.opacity=1;

  }
  if(retype&&pass&&number&&email)
  {
    document.getElementById("myform").submit()
}






  
  


    
}