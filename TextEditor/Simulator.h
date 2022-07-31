

#include <bits/stdc++.h>
#include <ncurses.h>

using namespace std ;


class Folder ;

class Base {
	
	protected:
		char Created_at[100] ;
		
	public :
		int type ; // 0 for folder ; 1 for file
		Folder* Parent ;
		string name ;
		Base(string name){
			this->name = name ;
			time_t now = time(0);
			strcpy(Created_at ,ctime(&now));
		}
		friend void operator << (ostream& ,Base&);
};

void operator << (ostream& Out,Base& obj){
	
		if(obj.type==0){
			
			init_pair(2,COLOR_RED,COLOR_BLACK);
       		attron(COLOR_PAIR(2));
			   
			printw((obj.name+" ").c_str());
			attroff(COLOR_PAIR(2));
		}
		else 
			printw(obj.name.c_str());
		printw(" ");
		printw(obj.Created_at);
}

class File : public Base {
	public :
		File(string name) : Base(name){
			this->type =1 ;
		}
};

class Folder :public Base{
	public :
		unordered_map<string,Base*> InsideDir;
		int size ;
	
	public :
		Folder(string name):Base (name){
			this->type=0;
			this->size  =0 ;
		}
		// create
		void  create(string name){
			InsideDir[name] = new File(name);
			InsideDir[name]->Parent = this ;
			size++;
			
		}
		// mkdir 
		void mkdir(string name){
			InsideDir[name] = new Folder(name);
			InsideDir[name]->Parent = this ;
			size++;
		}
		// ls
		void ls(Folder* current){
			int max_y = getmaxy(stdscr);
			int cur_y = getcury(stdscr);
			int len = InsideDir.size();
			if(len+cur_y>max_y-1){
				wclear(stdscr);
				move(0,0);
				Folder* temp = current ;
		        int len =0;
		        stack <string> Names ;
				 init_pair(1,COLOR_GREEN,COLOR_BLACK);
       			attron(COLOR_PAIR(1));
		       	while(temp!=NULL){
		           Names.push(temp->name);
		           len = len+temp->name.length() +1;
		           temp=temp->Parent ;
		       	}
		       while(!Names.empty()){
           			printw(("/"+Names.top()).c_str());
          			 Names.pop();
       			}
				attroff(COLOR_PAIR(1));
	   			printw("ls");
				move(1,0);
			}
			int iter =0;
			cur_y = getcury(stdscr);
			for(auto x:InsideDir){
				move(cur_y+iter++,0);
				cout<<*x.second;			
				
			}
			move(cur_y+iter++,0);
		}
		// cd 
		Base* GoTo(string name){
			if(InsideDir.find(name)==InsideDir.end()){
				return NULL;
			}
			else return InsideDir[name];
		}
		// rm
		void rm(string name){
			Base* NodeToBeDeleted = this->InsideDir[name];
			this->InsideDir.erase(name);
			delete NodeToBeDeleted;
			size--;
		}
		// rename 
		void rename(string old_name,string new_name){
			if(InsideDir[old_name]->type==0){
			InsideDir[new_name] = new Folder(new_name) ;
			*(Folder*)InsideDir[new_name] = *(Folder*)InsideDir[old_name];}
			else {
			InsideDir[new_name] = new File(new_name);
			*(File*) InsideDir[new_name]= *(File*)InsideDir[old_name];

			}
			InsideDir[new_name]->name = new_name ;
			InsideDir.erase(old_name);
		} 
};


// int main(){
// 	Folder obj("root");
// 	obj.CreateFile("hi");
// 	obj.CreateFolder("new_folder");
// 	obj.Display();
// 	Folder* new__ = (Folder*)obj.GoTo("new_folder");
// 	new__->CreateFile("inside_new_folder");
// 	new__->Display();
// }

