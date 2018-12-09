import { ApiResponse } from './../api-response.model';
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class PostService {

    private posts: Post[] = [];
    private post:Post;
    private postEvent: Subject<Post[]> = new Subject<Post[]>();

    constructor(private httpClient: HttpClient){}

    addPost(post: Post) 
    {
        this.httpClient.post<ApiResponse>(environment.api_url+'/posts', post)
            .pipe(map((response: ApiResponse)=>{
                return this.transformPost(response.data);
            }))
            .subscribe((post:Post)=>{
                this.posts.push(post);
                this.postEvent.next([...this.posts]);
            });
    }

    getPosts() 
    {
        this.httpClient.get<ApiResponse>(environment.api_url+'/posts')
            .pipe(map((response: ApiResponse)=>{
               return response.data.map((post)=>{
                   return this.transformPost(post);
                });
            }))
            .subscribe((posts)=>{
                this.posts = posts;
                this.postEvent.next([...this.posts]);
            });
    }

    postUpdateListener() 
    {
        return this.postEvent.asObservable();
    }

    getPost(id: string)
    {
       return this.httpClient.get<ApiResponse>(environment.api_url+'/posts/'+id)
                  .pipe(map((response: ApiResponse)=>{
                        return this.transformPost(response.data);
                  }));
    }

    private transformPost(post:{_id:string, title:string, content:string})
    {
        return {
            id: post._id,
            title: post.title,
            content: post.content
        }
    }

    updatePost(id:string, title:string, content:string)
    {
        const post = {title:title, content:content};
        this.httpClient.put(environment.api_url + '/posts/'+id, post)
            .pipe(map((response: ApiResponse) => {
                return this.transformPost(response.data);
            }))
            .subscribe((updated: Post)=>{
                const updatedPosts = [...this.posts];
                const index = updatedPosts.findIndex((p) => p.id === updated.id);
                if (index !== -1) {
                    updatedPosts[index] = updated;
                    this.posts = updatedPosts;
                }
                this.postEvent.next([...this.posts]);
            });
    }

    deletePost(id: string) 
    {
        this.httpClient.delete(environment.api_url+'/posts/'+id)
            .pipe(map((apiResponse: ApiResponse)=>{
                return this.transformPost(apiResponse.data);
            }))
            .subscribe((post: Post)=>{
                const index = this.posts.findIndex(p=>p.id===post.id);
                this.posts.splice(index, 1);
                this.postEvent.next([...this.posts]);
            });
    }
}