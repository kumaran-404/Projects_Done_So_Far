function del()
{
    document.getElementById("input").value="";
}

function create()
{
    document.getElementById("login").style.display="flex";
    document.getElementById("login").style.flexDirection="column";   
}
function destroy()
{
    document.getElementById("login").style.display="none";
}
function navigation(x)
{
    document.getElementById('image'+x).style.zIndex=1;
    document.getElementById("imagenav"+x).style.border="1px solid";
    for(let i=1;i<=3;i++)
    {
        if(i!=x)
        {
            document.getElementById('image'+i).style.zIndex=0;
            document.getElementById("imagenav"+i).style.border="none";
        }
    }

}
function icon()
{
    window.location="index.php";
}
function car()
{
    document.getElementById("cart").style.display="grid";
    document.body.style.overflow="hidden";
 
    
}
function submit(m)
{
    document.cookie="category="+m;

        document.getElementById("myform").action="otherpages/search/search.php";
        document.getElementById("myform").submit();

    
}



function del_icon()
{
    if(document.getElementById("input").value!="")
    document.getElementById("ic").style.visibility="visible";
else 
   document.getElementById("ic").style.visibility="hidden";

}

function logging()
{
    document.getElementById("log").value='home';
    
    document.getElementById("form2").submit();
}


function enter(event)
{
    document.getElementById("cat").value="all";
    if(document.getElementById("input").value!="")
         document.getElementById("ic").style.visibility="visible";
    else 
        document.getElementById("ic").style.visibility="hidden";
    if(event.keyCode==13)
    {
       
  
        document.getElementById("myform").action="otherpages/search/search.php";
        document.getElementById("myform").submit();
    }
}

function submit(m)
{
        
        document.getElementById("cat").value=m;

        document.getElementById("myform").action="otherpages/search/search.php";
        document.getElementById("myform").submit();

    
}