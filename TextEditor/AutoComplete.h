
#ifndef AUTO_
#define AUTO_

#include <bits/stdc++.h>
#include <ncurses.h>


using namespace std ;

class Trie ;

class Node {
    Node** links;
    char data ;
    bool IsEnd ;
    vector <int> flag ;
    friend class Trie ;
    
    public :
    Node(char data){
        this->data = data ;
        links = new Node*[128];
        for(int i=0;i<128;i++){
            links[i] = NULL ;
        }
        IsEnd = false;
    }
};


class Trie {
    Node* root ;
    
    void Insert(string data){
        
        Node* temp  = root ;
    
            for(int i=0;i<data.length();i++){
                int key = data[i] ;
                if(temp->links[key]==NULL){
                    temp->links[key] = new Node(data[i]);
                    temp->flag.push_back(key);
                }
                 temp = temp->links[key];
                
            }
            temp->IsEnd = true ;
    
        
    }
  
    void DisplayAll(Node* temp,vector<string>& a,int& curr){
       
        if(temp->IsEnd) cout<<"this is end!!";
        else {
            stack<Node*> Stack ;
           
            Stack.push(temp);
            stack<string> Prefix ;
            string first (1,temp->data);
            Prefix.push(first);
            vector <string> answer ;
            while(!Stack.empty()){
                    Node* el =Stack.top();
                    string top  = Prefix.top();
                    Stack.pop();
                    Prefix.pop();
                    if(el->IsEnd){
                        a.push_back(top);
                        curr++;
                    }
                    for(auto i:el->flag){
                        Stack.push(el->links[(int)i]);
                        
                        Prefix.push( top+ el->links[(int)i]->data );
                    }
                    
            }
           
        }
        
       
    }

   
    public :
    Trie(vector<string> Words__){
        root =  new Node(-1);
        vector <string> words ={
           "mkdir" ,"rmdir","ls","rm","create","rename","view"
        }  ;
        for(auto i:words){
            Insert(i);
        }
        for(auto i:Words__){
            Insert(i);
        }
    }   
     
  

    
    void suggest(string data,vector <string>& hi,int& cur,bool& exists){

        Node* temp = root ;
        bool flag = false ;
        for(int i=0;i<data.length();i++){
            int index = data[i];
            if(temp->links[index]!=NULL){
                temp = temp->links[index];
            }
            else {
                flag= true ;
                break ;
            }
           
        }
        if(!flag && temp->IsEnd) exists = true ;
        if((!flag) &&(!temp->IsEnd))
            DisplayAll(temp,hi,cur);
       
    }
};

#endif 
// int main(){
//     vector<string> datas ;
//     Trie obj ;
//     while(true){
//         string inp ;
//         cin>>inp ;
//         int curr=0;
//         obj.suggest(inp,datas,curr);
//         for(auto i:datas) {
//             cout<<i<< endl ;

//         }
//         datas.clear();
//     }
// }