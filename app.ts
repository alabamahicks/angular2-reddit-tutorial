/**
 * Created by sarahhicks on 4/26/16.
 */

import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

// Component annotation: at min, defines tag and what to display
@Component({
    selector: 'reddit',
    template: `
    <form class="ui large form segment">
        <h3 class="ui header">Add a Link</h3>
        
        <div class="field">
            <label for="title">Title:</label>
            <input name="title">
        </div>
        <div class="field">
            <label for="link">Link:</label>
            <input name="link">
        </div>
    </form>
    `
})
    // Component definition class with property/type and value
class RedditApp {
    constructor() {
    }
}

// boots the app and first argument is the component
bootstrap(RedditApp);