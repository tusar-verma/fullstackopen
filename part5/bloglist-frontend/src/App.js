import blogService from './services/blog-service'
import Blog from './components/blog'
import LoginForm from './components/login-form'
import NewBlogForm from './components/newblog-form'
import { useState, useEffect } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState(null)

  // blogService.getAll().then(blogsInDB => setBlogs(blogsInDB))
  useEffect( () => {
    const getBlogsFromDB = async () => {
      let blogsInDB = await blogService.getAll()
      blogsInDB = await blogsInDB
      setBlogs(blogsInDB.data)
    }
    getBlogsFromDB()
  }, [])
 
  useEffect( () => {
    const userLoggedJSON = window.localStorage.getItem('loggedBloglistUser')
    if (userLoggedJSON) {
      const userData = JSON.parse(userLoggedJSON)
      blogService.setToken(userData.token)
      setUser(userData)
    }
  }, [])

  const logOutHandler = (event) => {
    event.preventDefault()
    if (user !== null) {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    }
  }


  return (
    <div>
      {
        user === null ?
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setUser={setUser}
          /> :
          <div>
            <h2>Blogs</h2>

            <p>
              {user.name} logged in
              <button type='button' onClick={logOutHandler}>Log out</button>
            </p> 
            <h2>Create</h2>
            <NewBlogForm 
              blogs={blogs}
              setBlogs={setBlogs}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              
            />
            {blogs.map((blog, i) => 
              <Blog
                key={i}
                blogdata={blog}
              />
            )}

          </div>
        
      }
    </div>
  )
}

export default App;
