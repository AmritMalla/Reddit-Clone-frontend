import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/auth/shared/post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { VotePayload } from './VotePayload';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;

  votePayLoad: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string = 'green';
  downvoteColor: string = "yellow";
  isLoggedIn: boolean;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService) {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayLoad.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayLoad.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayLoad.postId = this.post.id;
    this.voteService.vote(this.votePayLoad).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);

    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

}
