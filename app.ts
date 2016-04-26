/**
 * Created by sarahhicks on 4/26/16.
 */

import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
    selector: 'reddit-article',
    host: {
        class: 'row'
    },
    template: `
        <div class="four wide column center aligned votes">
            <div class="ui statistic">
                <div class="value">
                    {{ votes }}
                </div>
                <div class="label">
                    Points
                </div>
            </div>
        </div>
        <div class="twelve wide column">
            <a class="ui large header" href="{{ link }}">
                {{ title }}
            </a>
            <ul class="ui big horizontal list voters">
                <li class="item">
                    <a href (click)="voteUp()">
                        <i class="arrow up icon">
                            upvote
                        </i>
                    </a>    
                </li>
                <li class="item">
                    <a href (click)="voteDown()">
                        <i class="arrow down icon">
                            downvote
                        </i>
                    </a>    
                </li>
            </ul>
        </div>
        
`
})
class ArticleComponent {
    votes: number;
    title: string;
    link: string;

    constructor() {
        this.title = 'Angular 2';
        this.link = 'http://angular.io';
        this.votes = 10;
    }

    voteUp() {
        this.votes += 1;
    }
    voteDown() {
        this.votes -= 1;
    }
}

// Main component comes after dependent components
@Component({
    selector: 'reddit',
    template: `
    <form class="ui large form segment">
        <h3 class="ui header">Add a Link</h3>
        
        <div class="field">
            <label for="title">Title:</label>
            <input name="title" #newtitle>
        </div>
        <div class="field">
            <label for="link">Link:</label>
            <input name="link" #newlink>
        </div>
    
        <button (click)="addArticle(newtitle, newlink)"
            class="ui positive right floated button">
            Submit link
        </button>
    </form>
    `
})
    // Component definition class with property/type and value
class RedditApp {
    constructor() {
    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    }
}

// boots the app and first argument is the component
bootstrap(RedditApp);