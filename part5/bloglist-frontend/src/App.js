import blogService from './services/blog-service'
import Blog from './components/blog'
import LoginForm from './components/login-form'
import { useState, useEffect } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // blogService.getAll().then(blogsInDB => setBlogs(blogsInDB))
  useEffect( () => {
    const getBlogsFromDB = async () => {
      let blogsInDB = await blogService.getAll()
      blogsInDB = await blogsInDB
      setBlogs(blogsInDB.data)
    }
    getBlogsFromDB()
  },[])


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
            
            <p>{user.name} logged in</p>

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
