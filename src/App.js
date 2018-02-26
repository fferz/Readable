import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import AddPostIcon from 'react-icons/lib/fa/plus-circle'
import GoHomeIcon from 'react-icons/lib/fa/home'
import NewPost from './NewPost.js'
import Post from './Post.js'
import './App.css'

class App extends Component {
  state = {
    posts : [],
    categories : []
  }

  componentDidMount(){
    fetch('/posts',
      {
        headers: { 'Authorization': 'fer' }
      }
    )
      .then(res => res.json())
      .then(posts => {this.setState({ posts })
      console.log('post', posts)}
      )
      fetch('/categories',
      {
        headers: { 'Authorization': 'fercategories' }
      }
    )
      .then(res => res.json())
      .then(categories => {this.setState({ categories: categories.categories })}
      )
      
  }
  render() {
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
                <Post posts={this.state.posts} />
                
              </div>
            )}/>
            
            <Route path="/create" render={() => (
                <NewPost
                  categories={this.state.categories} />
            )}/>

            {/* Route Params */}
            <Route path="/category/:categoryName" render={({ match }) => (
              <div> 
                <h1>{match.params.categoryName}</h1>
                <Post posts={this.state.posts.filter((post) => post.category === match.params.categoryName )} />
              </div>  
            )} />

            <div className="new-post">
              <Link
                  to="/create"
                  className="add-post"
                ><AddPostIcon size={50} />
              </Link>
            </div>
            <div className="to-home">
              <Link
                  to="/"
                  className="home"
                ><GoHomeIcon size={50} />
              </Link>
            </div>

      </div>
    </div>
    )
   
  }
}

export default App;
