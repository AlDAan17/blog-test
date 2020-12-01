import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import ArticlesListContainer from '../../containers/articles-list-container';
import ArticlePageContainer from '../../containers/article-page-container';
import SignUpContainer from '../../containers/sign-up-container';
import SignInContainer from '../../containers/sign-in-container';
import HeaderContainer from '../../containers/header-container';
import EditProfileContainer from '../../containers/edit-profile-container';
import CreateArticleContainer from '../../containers/create-article-container';
import EditArticleContainer from '../../containers/edit-article-container'

const App = () => {
    return (
        <Router>
            <HeaderContainer/>
            <Switch>
              <Route path="/articles/:slug/edit" component={EditArticleContainer} />
                <Route path='/articles/:slug' component={ArticlePageContainer}/>
                <Route path='/sign-up' component={SignUpContainer}/>
                <Route path='/sign-in' component={SignInContainer}/>
                <Route path="/profile" component={EditProfileContainer} />
                <Route path="/new-article" component={CreateArticleContainer} />
                <Route exact path={['/', '/articles']} component={ArticlesListContainer}/>
            </Switch>
        </Router>
    );
}

export default App;
