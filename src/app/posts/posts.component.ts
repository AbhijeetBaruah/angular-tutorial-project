import { Component, Input, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { AlertErrors } from '../common/error-alert';
import { PostService } from '../services/post.service';
import { Posts } from './postmodel.component';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts?:Posts[];
  post?:Posts;
  
  constructor(private postService:PostService) {
   }

  createPost(data:HTMLInputElement){
    let pi = { title : data.value};
    this.post = pi as Posts;
    this.posts?.splice(0,0,this.post); //to see the latest post above, updating the frontend as we are expecting that request is going to be successful, this is called optimistic update.

    data.value = '';
    
    this.postService.create(this.post)
      .subscribe(
        post =>{
        console.log(post);
        //this.posts?.splice(0,0,post as Posts);//to see the latest post above, this way updates are called pessimistic updates => updating frontend only after receiving success 
      },
      //preferred Implementation of Error Handling
        (error:AppError) =>{
          this.posts?.splice(0,1);//deleting the post if request fails

          AlertErrors.handleError(error);
        }
      );
    
  }
  ngOnInit(): void {
      this.postService.getAll().
      subscribe(
        (response:Posts[]) => {
          this.posts = response;
        },
        (error:AppError)=>{
          AlertErrors.handleError(error);
        }
      );
  }

}
