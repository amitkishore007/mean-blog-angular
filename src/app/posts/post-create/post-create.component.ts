import { PostService } from './../post.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @ViewChild('postCreate') postForm: NgForm;
  private mode = 'create';
  private postId:string;
  public post:Post;
  isLoading:boolean = false;
  constructor(private postService: PostService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.postService.getPost(this.postId)
            .subscribe((post: Post) => {
              this.isLoading = false;
              if (post) {
                this.post = post;
                this.postForm.form.patchValue({
                  title:this.post.title,
                  content:this.post.content
                })
              }
            });
      } else {
        this.mode = 'create';
        this.postId = undefined;
      }
    });
  }

  onPostCreate() {
    if (this.postForm.invalid) {
      return;
    }

    this.isLoading = true;
    let post: Post = { title: this.postForm.value.title, content: this.postForm.value.content };
    if (this.mode === 'create') {
      this.postService.addPost(post);
    } else {
      this.postService.updatePost(this.postId, this.postForm.value.title, this.postForm.value.content);
    }

    this.router.navigate(['/']);
    this.postForm.reset();
  }
}