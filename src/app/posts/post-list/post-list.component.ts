import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  posts: Post[] = [];
  private PostsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.postsService.getPosts();
    this.PostsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
          this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.PostsSub.unsubscribe();
  }

}
