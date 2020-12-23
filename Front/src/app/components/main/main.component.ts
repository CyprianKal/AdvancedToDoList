import { Component, OnInit } from '@angular/core';
import {PostService} from 'src/app/services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selectedID: string;
  count : string[] = [];
  posts: any;
  data: [any];
  tutorial = {
    title: '',
    description: '',
  };
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.testGet()
  }
  usunZaznaczenie(){
    this.selectedID = "";
    this.koniecEdycji();
    this.count.length = 0;
  }
  addEdit(){
    if (this.selectedID==""){
      this.addPost()
    }
    else{
      this.testEdit();
    }
  }
  testEdit(){
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.postService.update(this.selectedID,data)
    .subscribe(
        response => {
          console.log(response);
          this.testGet();
        },
        error => {
          console.log(error);
        });
  }
  testGet(){
    this.usunZaznaczenie();
    this.postService.getAll()
      .subscribe(
      data => {
        this.posts = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
      this.sprawdz()
  }
  addPost(){
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.postService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.testGet();
        },
        error => {
          console.log(error);
        });
  }

  usun(x){
    this.postService.delete(x)
      .subscribe(
        response => {
          console.log(response);
          this.testGet();
          console.log(this.selectedID)
        },
        error => {
          console.log(error);
        });
  }

  sprawdz(){
    let y = document.querySelector("#kontener");
    let b = getComputedStyle(y).height;
    if (b>="501x"){document.getElementById("kontener").style.overflowY="scroll";}
    else{document.getElementById("kontener").style.overflowY="visible";}
  }

  delAll(){
    this.postService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.testGet();
        },
        error => {
          console.log(error);
        });
  }
  zaznacz(id){
        if (this.selectedID != id){
          this.count.push(id)
          if(this.count.length<=1){
            this.selectedID=id;
            this.edycja();
            document.getElementById(id).style.backgroundColor="#779ecb";  
          }
          else{
            console.log("You can select only one item!")
          }
        }
        else if(this.selectedID == id){
          this.koniecEdycji();
          this.count = [];
          this.selectedID="";
          document.getElementById(id).style.backgroundColor="";
        }
      }
  edycja(){
    let v = (document.getElementById("tyt") as HTMLInputElement).placeholder="Change title";
    let y = (document.getElementById("opis") as HTMLInputElement).placeholder="Change description";
    let x = (document.getElementById("btt") as HTMLInputElement).innerText="Edit"
  }
  koniecEdycji(){
    let v = (document.getElementById("tyt") as HTMLInputElement).placeholder="Title";
    let y = (document.getElementById("opis") as HTMLInputElement).placeholder="Description";
    let x = (document.getElementById("btt") as HTMLInputElement).innerText="Add"
  }
}


