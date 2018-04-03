import React, { Component } from 'react'
import { Route, Link, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts } from './actions/PostsAction'
import AddPostIcon from 'react-icons/lib/fa/plus-circle'
import GoHomeIcon from 'react-icons/lib/fa/home'
import PostFormContainer from './components/PostFormContainer.js'
import Post from './components/Post.js'
import PostView from './components/PostView'
import './App.css'
import CommentFormContainer from './components/CommentFormContainer'
import {fetchCategories} from "./actions/CategoriesAction";


class App extends Component {

    componentDidMount() {

        this.props.savePosts();
        this.props.saveCategories();
    }

    CategoryPosts = ({match}) => (
        <div>
            <h1>{match.params.categoryName}</h1>
                {this.props.postReducer.posts.filter((post) => post.category === match.params.categoryName ).map((p) =>
                    <div key={p.id}>
                        <Link to={`${match.url}/${p.id}`}>
                            <div className="post-title">
                                {p.title}
                            </div>
                        </Link>
                        <div className="post-author">
                            {p.author}
                        </div>
                        <div className="post-category">category:{p.category}</div>
                    </div>
                )}
            <Route path={`/:categoryName/:postId`} component={this.Post}/>
        </div>
    )

    Post = ({match}) => (
        <PostView
            postDataView={this.props.postReducer.posts.find(({id}) => id === match.params.postId)}/>
    )

    PostId = ({match}) => (
        <div>
            {this.props.postReducer.posts.find(({id}) => id === match.params.postId)
                ? <PostView
                    postDataView={this.props.postReducer.posts.find(({id}) => id === match.params.postId)}/>
                : this.NoMatchPostId()}
        </div>
    )

    PostEdit = ({match}) => (
        <div>
            {this.props.postReducer.posts.find(({id}) => id === match.params.postId)
                ? <PostFormContainer
                    postData={this.props.postReducer.posts.find(({id}) => id === match.params.postId)}/>
                : this.NoMatchPostId()}
        </div>
    )

    NoMatchPostId = () => (
        <div>
            <h1>the post that you are looking for does not exist :(</h1>
        </div>
    )

    render() {
        console.log('Props (render App)', this.props)
        console.log('State (render App)', this.state)

    var i =1
    return (
        <Router>
            <div className="app-container">

                <div className="sidenav">
                    {this.props.categoryReducer.categories.map( category =>
                        <Link
                            to={`/${category.name}`}
                            className="link-category">
                            {category.name}
                        </Link>
                    )}
                    <div>
                        <Link
                            to="/most-voted">
                            most voted
                        </Link>

                        <Link
                            to="/most-recent">
                            most recent
                        </Link>

                    </div>
                </div>

                <div className="content">

                    <Switch>

                        <Route exact path="/" render={() => (
                            <div>
                                <h1>Posts</h1>
                                <Post />
                            </div>
                        )}/>

                        <Route  path="/create" render={() => (
                            <PostFormContainer/>
                        )}/>


                        <Route path="/post/:postId/edit-comment" render={() => (
                            <CommentFormContainer
                              commentData={this.props.location.state.commentData} />
                        )} />
                        <Route path="/post/:postId/edit" component={this.PostEdit}/>

                        <Route path="/post/:postId" component={this.PostId} />

                        

                        <Route path="/most-voted" render={() =>
                            <div>
                                <h1>the most voted posts</h1>
                                <Post
                                    posts={[].concat(this.props.postReducer.posts).sort(
                                        function (a, b) {
                                            if (a.voteScore < b.voteScore) { return 1 };
                                            if (a.voteScore > b.voteScore) { return -1 };
                                            return 0;
                                        }
                                    )}/>
                            </div>
                        } />

                        <Route path="/most-recent" render={() => (
                            <div>
                                <h1>the most recent posts</h1>
                                <Post
                                    posts={[].concat(this.props.postReducer.posts).sort(
                                        function(a,b){
                                            if (a.timestamp < b.timestamp){ return 1};
                                            if (a.timestamp > b.timestamp){ return -1};
                                            return 0;
                                        }
                                    )} />
                            </div>
                        )} />

                        <Route path="/:categoryName" component={this.CategoryPosts} />

                    </Switch>

                    <div className="new-post">
                        <Link
                            to="/create"
                            className="add-post"
                        ><AddPostIcon size={50} color="black"/>
                        </Link>
                    </div>
                    <div className="to-home">
                        <Link
                            to="/"
                            className="home"
                        ><GoHomeIcon size={50} color="black"/>
                      </Link>
                    </div>
                </div>
            </div>
        </Router>
    )
   
  }
}


const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
)



function mapStateToProps (state){

    return state

}
function mapDispatchToProps(dispatch){
    return {
        savePosts: () => dispatch(fetchPosts()),
        saveCategories: () => dispatch(fetchCategories()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))