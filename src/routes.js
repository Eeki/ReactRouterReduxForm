import React from 'react';
import  { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

//Routes can be nested in routes...
export default (
  <Route path="/" component={App} > // '/' --> esim google.com/ esim silloin. Nyt / => render App
    <IndexRoute component={PostIndex} /> // IndexRoute --> If route is not maching any other child route render this route
    <Route path="posts/new" component={PostsNew}/>
    <Route path="posts/:id" component={PostsShow}/> {/* /:id -> this.props.params.id    Tämä tapahtuu routerin toimesta automaattisesti!!*/}
  </Route>
);



//Routes can be nested in routes... ESIMERKKI
//export default (
//  <Route path="/" component={App} > // '/' --> esim google.com/ esim silloin. Nyt / => render App
//    <IndexRoute component={PostIndex} /> // IndexRoute --> If route is not maching any other child route render this route
//    <Route path="greet" component={Greeting} /> // because nested the route /greet will render App, Greeting
//    <Route path="greet2" component={Greeting} />
//    <Route path="greet3" component={Greeting} />
//  </Route>
//);
