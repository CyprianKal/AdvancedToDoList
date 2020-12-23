import { Component, OnInit } from '@angular/core';
import {PostService} from 'src/app/services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  posts: any;
  data: [];
  tutorial = {
    title: '',
    description: '',
  };
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.testGet()
  }
  testGet(){
    
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
        },
        error => {
          console.log(error);
        });
  }

  sprawdz(){
    let y = document.querySelector("#kontener");
    let b = getComputedStyle(y).height;
    console.log(b)
    if (b>="501x"){
      document.getElementById("kontener").style.overflowY="scroll";
    }
    else{
      document.getElementById("kontener").style.overflowY="visible";
    }


  }
}

