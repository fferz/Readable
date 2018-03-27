import React, { Component } from 'react'
//import { Link } from 'react-router-relative-link'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { upvoteComment, downvoteComment, fetchPosts } from './actions/PostsAction'
import AddPostIcon from 'react-icons/lib/fa/plus-circle'
import GoHomeIcon from 'react-icons/lib/fa/home'
import PostFormContainer from './components/PostFormContainer.js'
import Post from './components/Post.js'
import PostView from './components/PostView'
import './App.css'
import CommentFormContainer from './components/CommentFormContainer'
import {fetchCategories} from "./actions/CategoriesAction";

class App extends Component {
    state = {
        categories : [],
    }

    componentDidMount() {

        this.props.savePosts();
        this.props.saveCategories();
    }

    render() {
        console.log('Props (render App)', this.props)
        console.log('State (render App)', this.state)

    var i =1
    return (
        <div className="app-container">
        
            <div className="sidenav">
                {this.props.categoryReducer.categories.map( category =>
                <div key={i}>
                    <Link
                        to={`/${category.name}`}
                        className="link-category"
                    >{category.name}
                    </Link>
                    {i=i+1}
                </div>)}
                <hr />
                <Link
                    to={"/most-voted"}
                    className="link-most-voted">
                    most voted
                </Link>
                <Link
                    to={"/most-recent"}
                    className="link-most-recent">
                    most recent
                </Link>
            </div>

            <div className="content">
            
                    <Route exact path="/" render={() => (
                        <div>
                            <h1>Posts</h1>
                            <Post />
                        </div>
                    )}/>

                    <Route path="/create" render={() => (
                        <PostFormContainer/>
                    )}/>

                    <Route path="/:categoryName" render={({ match }) => (
                        <div>
                            <h1>{match.params.categoryName}</h1>
                            <Post posts={this.props.postReducer.posts.filter((post) => post.category === match.params.categoryName )} />
                        </div>
                    )} />

                    <Route path={`/edit`} render={() => (
                        <PostFormContainer
                          postData={this.props.location.state && this.props.location.state.postData}
                         />
                    )}/>

                    <Route path="/post/:postId" render={() => (
                        <PostView
                            postDataView={this.props.location.state.postDataView}/>

                        )} />

                    <Route path="/post/edit-comment" render={() => (
                        <CommentFormContainer
                          commentData={this.props.location.state.commentData} />
                    )} />

                    <Route path="/most-voted" render={() => (
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
                    )} />

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
    )
   
  }
}






function mapStateToProps (state){

    return state

}
function mapDispatchToProps(dispatch){
    return {
        savePosts: () => dispatch(fetchPosts()),
        saveCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)