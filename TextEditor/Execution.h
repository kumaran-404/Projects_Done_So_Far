#include <bits/stdc++.h>
#include <ncurses.h>
#include "Simulator.h"
#include <gr

using namespace std ;

void printString(string output){
    int cur_y = getcury(stdscr);
    int max_y = getmaxy(stdscr);

    if(cur_y==max_y){
        wclear(stdscr);
        move(0,0);
        printw(output.c_str());
        move(1,0);
    }
    else {
        move(cur_y,0);
        printw(output.c_str());
        move(cur_y+1,0);
    }
}

stack <string> undo;
stack <string> redo;
stack <string> undo_name;
stack <string> redo_name;
stack <Folder*> undo_pos;
stack <Folder*> redo_pos;




int exec(vector<string> commands,Folder*& curr ){
    
    if(commands.size()>0){

    string main__= commands[0];
    
    // create a folder 
    if(main__=="mkdir"){
        if(curr->InsideDir.find(commands[1])!= curr->InsideDir.end())  {
                printString("ERROR: Directory already exists"); 
        }
        else  {
            curr->mkdir(commands[1]);
            undo.push("rm");
            undo_name.push(commands[1]);
            undo_pos.push(curr);
        }
    }

    // list the directory 
    if(main__=="ls"){
        curr->ls(curr);      
    }


    // remove folder or file 
    if(main__=="rm"){

       if(curr->InsideDir.find(commands[1])!= curr->InsideDir.end()){
           
           if(curr->InsideDir[commands[1]]->type==0){
               // folder 
               undo.push("mkdir");
           }
           else {
               undo.push("create");
               
           }
           curr->rm(commands[1]);
           undo_name.push(commands[1]);
            undo_pos.push(curr);
       }
       else {
           printString("ERROR:Folder/File doesn't exists");
       }
    }

    // create file 
    if(main__=="create"){
        if(curr->InsideDir.find(commands[1])!=curr->InsideDir.end()){
            printString("ERROR:File already exists");
        }
        else  {
            curr->create(commands[1]);
            undo.push("rm");
            undo_name.push(commands[1]);
            undo_pos.push(curr);
        }
    }

    // navigate     
    if(main__=="cd"){
        Folder* old = curr;
        if(commands[1]!=".."){
             if(curr->InsideDir.find(commands[1])!=curr->InsideDir.end())
             curr = (Folder*)curr->GoTo(commands[1]);
             else printString("ERROR: No such directory exists");
        }
       
        else  curr = curr->Parent ;

        if(curr==NULL) curr =old;
    }

    // undo 

    if(main__=="clear"){
        return -1;
    }

    if((main__=="undo")&&(undo.size()!=0)){
         if(undo.top()=="rm"){
            redo_name.push(undo_name.top());
            redo_pos.push(undo_pos.top());
            if( undo_pos.top()->InsideDir.find(undo_name.top())->second->type ==0)
                redo.push("mkdir");
            else redo.push("create");

            undo_pos.top()->rm(undo_name.top());
            
        
        }

        else if(undo.top()=="mkdir"){
            redo.push("rmdir");
            redo_name.push(undo_name.top());
            redo_pos.push(undo_pos.top());
            undo_pos.top()->mkdir(undo_name.top());
        }

        else if(undo.top()=="create"){
            redo.push("rm");
            redo_name.push(undo_name.top());
            redo_pos.push(undo_pos.top());
            undo_pos.top()->create(undo_name.top());
             
        }

        undo.pop();
        undo_name.pop();
        undo_pos.pop() ;

    }


    if((main__ == "redo")&&(redo.size()>0))
    {

        if(redo.top()=="mkdir"){
            redo_pos.top()->mkdir(redo_name.top());
            undo.push("rm");
            undo_pos.push(redo_pos.top());
            undo_name.push(redo_name.top());
        }

        else if(redo.top()=="rm"){

             redo_pos.top()->rm(redo_name.top());
             undo_pos.push(redo_pos.top());
             undo_name.push(redo_name.top());

             if(redo_pos.top()->InsideDir[redo_name.top()]->type==0) undo.push("mkdir");
             else undo.push("create");

        }

        else if(redo.top()=="create"){
            redo_pos.top()->create(redo_name.top());
            undo_pos.push(redo_pos.top());
            undo_name.push(redo_name.top());
            undo.push("rm");
        }

        redo_pos.pop();
        redo_name.pop();
        redo.pop();

    }
    if(main__=="rename"){
	curr->rename(commands[1],commands[2]);
	
	}
    }
    return 0;
}



// #include <bits/stdc++.h>
// #include <ncurses.h>
// #include "Simulator.h"
// using namespace std ;


// void exec(vector<string> commands,Folder*& curr ){
//     if(commands.size()>0){
// string main__= commands[0];

//     if(main__=="mkdir"){
//         int flag=0;
//         for(int i=1;i<commands.size();i++){
//             Base* ToBeSearched = curr->InsideDir[commands[i]] ;
//             if(ToBeSearched != NULL){
//               flag=1;
//               break;
//             }
//         }
//         if(flag==1)
//           cout<<"\nDirectory already exists !!!";
//         else{
//           curr->CreateFolder(commands[1]);
//           undo.push("rmdir");
//           undo_name.push(commands[1]);
//           undo_pos.push(curr);
//         }
        
//     }
//     if(main__=="ls"){
//         for(auto i:curr->InsideDir){
//             string name = i.second->name ;
//             printw(name.c_str());
//         }
//     }
    // if(main__=="rm"){
    //     int flag1=0
    //     for(int i=1;i<commands.size();i++){
    //         Base* ToBeDeleted = curr->InsideDir[commands[i]] ;
    //         flag1=1;
    //     }
    //     if(flag1==1)
    //     {
    //         curr->InsideDir.erase(commands[i]);
    //         delete ToBeDeleted ;
    //         undo.push("touch");
    //         undo_name.push(commands[1]);
    //         undo_pos.push(curr);
    //     }
    //     else
    //       cout<<"\nFile does not exist !!!";
    // }

//     if(main__=="rmdir"){
//         int flag2=0
//         for(int i=1;i<commands.size();i++){
//             Base* ToBeDeleted = curr->InsideDir[commands[i]] ;
//             flag2=1;
//         }
//         if(flag2==1)
//         {
//             curr->InsideDir.erase(commands[i]);
//             delete ToBeDeleted ;
//             undo.push("mkdir");
//             undo_name.push(commands[1]);
//             undo_pos.push(curr);
//         }
//         else
//           cout<<"\nDirectory does not exist !!!";
//     }

//     if(main__=="undo"){
//         if(undo.top()=="rm"){
//             redo.push("touch");
//             redo_name.push(undo_name.top());
//             redo_pos.push(undo_pos.top());
//             undo_pos.top()->InsideDir.erase(undo_name.top());
//             undo.pop();
//             undo_name.pop();
//         }

//         else if(undo.top()=="mkdir"){
//             redo.push("rmdir");
//             redo_name.push(undo_name.top());
//             redo_pos.push(undo_pos.top());
//             undo_pos.top()->CreateFolder(undo_name.top());
//             undo.pop();
//             undo_name.pop();
//         }

//         else if(undo.top()=="rmdir"){
//             redo.push("mkdir");
//             redo_name.push(undo_name.top());
//             redo_pos.push(undo_pos.top());
//             undo_pos.top()->InsideDir.erase(undo_name.top());
//             undo.pop();
//             undo_name.pop();
//         }
//     }

//     if(main__=="redo"){
//         if(redo.top()=="mkdir"){
//             curr->CreateFolder(redo_name.top());
//         }
//         else if(redo.top()=="rmdir"){
//             Base* ToBeDeleted = ->InsideDir[redo_name.top()] ;
//             redo_pos.top()->InsideDir.erase(redo_name.top());
//             delete ToBeDeleted ;
//         }
//         else if(redo.top()=="rm"){
//             Base* ToBeDeleted = ->InsideDir[redo_name.top()] ;
//             redo_pos.top()->InsideDir.erase(redo_name.top());
//             delete ToBeDeleted ;
//         }
//     }


//     }
    
// }
