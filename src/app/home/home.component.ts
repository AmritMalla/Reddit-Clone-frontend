import { PostService } from './../shared/post.service';
import { PostModel } from './../auth/shared/post-model';
import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post =>{
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }

}
