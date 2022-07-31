
#include <bits/stdc++.h>
#include <ncurses.h>
#include "Execution.h"
#include "AutoComplete.h"


using namespace std ;



class TextEditor{
    
    int cur_x,cur_y ;
    int max_y;

    Folder* root;
    Folder* current ;
    void UpdateCursorPosition(){
        cur_x = getcurx(stdscr) ;
        cur_y = getcury(stdscr);
    }

    void PrintString(string word){
        for(int i=0;i<word.length();i++){
            addch(word[i]);
        }
    }

    void MoveNextPage(string command){
        max_y= getmaxy(stdscr);
        
        if(max_y==cur_y+1){
             wclear(stdscr);
        move(0,0);
        init_pair(1,COLOR_GREEN,COLOR_BLACK);
        attron(COLOR_PAIR(1));
        PrintString(current->name);
        attroff(COLOR_PAIR(1));
        PrintString("$"+command);
        UpdateCursorPosition();
        move(cur_y+1,0);
        }
       
    }
    public :

    TextEditor(){
        initscr();   // initialize ncurses screen
        cbreak();    // get a character without pressing enter
        noecho();    // disabling print of character while reading 
        cur_x =0 ;
        cur_y =0 ;
        string root__="root";
        root = new Folder(root__);
        root->Parent = NULL ;
        current= root;
    }

    ~TextEditor(){
        endwin();
    }

    
    void Read(){
        int iter =0; 
       start_color();
       init_pair(1,COLOR_GREEN,COLOR_BLACK);
       attron(COLOR_PAIR(1));
       Folder* temp = current ;
        int len =0;
        stack <string> Names ;
       while(temp!=NULL){
           Names.push(temp->name);
           len = len+temp->name.length() +1;
           temp=temp->Parent ;
       }
       while(!Names.empty()){
           PrintString("/"+Names.top());
           Names.pop();
       }
 
        attroff(COLOR_PAIR(1));
        printw("$");
        char ch ;
        string word;
        // printw(to_string(cur_y).c_str());
        vector <string > command ;
         command.push_back("");
        while(ch=wgetch(stdscr)){
           
            UpdateCursorPosition();

            // Delete a character
            if((ch=='\b')||(ch==127)||(ch==KEY_BACKSPACE)){
                if(cur_x!=len+1)
                {
                    move(cur_y,cur_x-1);
                    delch();
                    string last(1,word[word.length()-1]);
                    word = word.substr(0,word.length()-1);

                    if((word=="")&&(command.size()>1)){
                        word = command.at(command.size()-2)+ " ";
                        command.pop_back();
                    } 
                   
                       
              
                }
            }
            // for executing command 
            else if(ch=='\n'){
               
                move(cur_y+1,0);
                string sum__="";
                for(auto i:command) sum__=sum__+i+" ";
                MoveNextPage(command.size()==0?"":sum__);
                exec(command,current);
                Read();
            }
            // tab for auto completion 
            else if(ch=='\t'){
               
                if(word!=""){
                    vector <string> Suggestions;
                    int len = 0;
                    bool exists =false;
                    vector<string> Words__ ;
                    for(auto i:current->InsideDir){
                        Words__.push_back(i.first);
                    }
                    Trie obj(Words__);
                    obj.suggest(word,Suggestions,len,exists);
                    string last(1,word[word.length()-1]);
                    word= word.substr(0,word.length()-1);
                    if((len==0)&&(exists)){
                        addch(' ');
			command.push_back(word+last);
			word="";
                    }
                    if(len==1){
                        move(cur_y,cur_x- word.length() -1);
                        PrintString(word+Suggestions[0]);
                        command[command.size()-1]= (word+Suggestions[0]);
                        word="";
                    }
                    else if(len>1){
                        if(cur_y+len > 35){
                          MoveNextPage(word+last);
                        }
                        int iter =1;
                        for(int i=0;i<len;i++){
                            move(cur_y+(iter++),0);
                            PrintString(word+Suggestions[i]);
                            
                            
                        }
                        move(cur_y+iter,0);
                        Read();
                    }
                    
                }
            }
            // add character to terminal
            else {
                addch(ch);
                if(ch!=' '){
                    word+=ch ;
                    command[command.size()-1] =word ;
                }
                else {
                    word="";
                   command.push_back("");
                }
            }
            
        }
    }
};
