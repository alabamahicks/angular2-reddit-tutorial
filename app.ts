/**
 * Created by sarahhicks on 4/26/16.
 */

import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";


// Class with no Component; In MVC, this is the Model.
class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    domain(): string {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }

    voteUp(): void {
        this.votes += 1;
    }
    voteDown(): void {
        this.votes -= 1;
    }
}

@Component({
    selector: 'reddit-article',
    inputs: ['article'],
    host: {
        class: 'row'
    },
    template: `
        <div class="four wide column center aligned votes">
            <div class="ui statistic">
                <div class="value">
                    {{ article.votes }}
                </div>
                <div class="label">
                    Points
                </div>
            </div>
        </div>
        <div class="twelve wide column">
            <a class="ui large header" href="{{ article.link }}">
                {{ article.title }}
            </a>
            <div class="meta">({{ article.domain() }})</div>
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
    // Fat Models, Skinny Controllers
class ArticleComponent {
    article: Article;

    constructor() {
        this.article = new Article('Angular 2', 'http://angular.io', 10);
    }

    voteUp(): boolean {
        this.article.voteUp();
        // ensure browser won't try to refresh the page:
        return false;
    }
    voteDown(): boolean {
        this.article.voteDown();
        // ensure browser won't try to refresh the page:
        return false;
    }
}

// Main component comes after dependent components
@Component({
    selector: 'reddit',
    directives: [ArticleComponent],
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
    
     <div class="ui grid posts">
      <reddit-article *ngFor="#foobar of sortedArticles()" [article]="foobar"></reddit-article>
    </div>
    `
})
    // Component definition class with property/type and value
class RedditApp {
    articles: Article[];

    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1)
        ]
    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        // create a new Article instance with submitted title and URL
        // add the new instance to the array of Articles
        this.articles.push(new Article(title.value, link.value, 0));
        // clear the input values
        title.value = '';
        link.value = '';
    }

    sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
    }
}

// boots the app and first argument is the component
bootstrap(RedditApp);