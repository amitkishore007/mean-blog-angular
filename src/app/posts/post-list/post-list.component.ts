import { PostService } from './../post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  private posts: Post[] = [];
  private postSubscription: Subscription;
  isLoading: boolean = true;

  constructor(private PostService: PostService) { }

  ngOnInit() {
    this.PostService.getPosts();
    this.postSubscription = this.PostService.postUpdateListener().subscribe((posts: Post[])=>{
      this.posts = posts;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSubscription.unsubscribe();
  }

  deletePost(id: string) 
  {
    this.PostService.deletePost(id);
  }

}
