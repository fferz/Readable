import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { initialize } from 'redux-form';
import { upvoteComment, downvoteComment, fetchPosts } from './actions' 
import AddPostIcon from 'react-icons/lib/fa/plus-circle'
import GoHomeIcon from 'react-icons/lib/fa/home'
import PostFormContainer from './PostFormContainer.js'
import Post from './Post.js'
import './App.css'

class App extends Component {
  state = {
    posts : [],
    categories : [],
    votes : null,
    postId: null,
  }

  componentDidMount(){
    
    this.props.savePosts();
    console.log('ejecuta el componentDidMount bola este')

    fetch('/categories',
      {
        headers: { 'Authorization': 'fercategories' }
      }
    )
      .then(res => res.json())
      .then(categories => {this.setState({ categories: categories.categories })}
      )
  }

  newId = () => {
    return Math.trunc(Math.random()*10000)
  }

  render() {
    console.log('Props (render App)', this.props)
    
    //let totalPost = this.props.postReducer.posts.concat(this.props.postReducer.newPosts)

    var i =1
    return (
      <div className="app-container">
        
        <div className="sidenav">
            {this.state.categories.map( category =>
                <div key={i}> 
                    <Link
                      to={`/category/${category.name}`}
                      className="link-category"
                        >{category.name}
                      </Link>
                    {i=i+1}
                </div>)}
        </div>

          <div className="content">
            
            <Route exact path="/" render={() => (
              <div>
                <h1>Posts</h1>
                <Post 
                  posts={this.props.postReducer.posts} />
                
              </div>
            )}/>
            
            <Route path="/create" render={() => (
                <PostFormContainer
                  categories={this.state.categories}
                 />
            )}/>

            {/* Route Params */}
            <Route path="/category/:categoryName" render={({ match }) => (
              <div> 
                <h1>{match.params.categoryName}</h1>
                <Post posts={this.props.postReducer.posts.filter((post) => post.category === match.params.categoryName )} />
              </div>  
            )} />

            <Route path="/edit" render={() => (
                <PostFormContainer
                  categories={this.state.categories}
                  postData={this.props.location.state && this.props.location.state.postData}
                 />
            )}/>

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
  
  console.log('state (mapstateToProps)', state)
  return state

}
function mapDispatchToProps(dispatch){
  return {
    savePosts: () => dispatch(fetchPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)