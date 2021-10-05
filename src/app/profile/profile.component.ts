import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest} from 'rxjs';
import { PostService } from '../services/post.service';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts:any[''];
  postss:any[''];
  constructor(private route:ActivatedRoute,private postService:PostService) { }

  ngOnInit(): void {

    

    console.log("Two seperate subscription");
    
    //getting optional parameters
    this.route.queryParamMap.subscribe(params=>{
      console.log('do something');
    })
    //getting required parameters from the url
    this.route.paramMap
      .subscribe(params => {
        console.log('USER ID:'+params.get('userId'));
        console.log('ID: '+params.get('id'));
        
      })

    //combining the optional and required parameters both using single subscription
    combineLatest([
      this.route.queryParamMap,
      this.route.paramMap
    ]).subscribe(combined=>{
        console.log("Single Subscription");
        console.log('page:'+combined[0].get('page'));
        console.log('ID:'+combined[1].get('id'));

        this.postService.getAll().subscribe(
          postsArr=>{
            this.posts = postsArr;
            console.log(this.posts[0]);
          }
        )
    })

    //this is an example of avoiding a subscribe inside another subscribe and write clean code 
    combineLatest([
      this.route.queryParamMap,
      this.route.paramMap
    ])
    .pipe(
      switchMap(combined=>{
        console.log("map ki");
        console.log('page:'+combined[0].get('page'));
        console.log('ID:'+combined[1].get('id'));

        return this.postService.getAll();
      }))
      .subscribe(posts=>{
        this.postss = posts;
        console.log('from map');
        
        console.log(this.postss[1]);
        
    })
    
  }

}
