import blogService from './services/blog-service'
import Blog from './components/blog'
import LoginForm from './components/login-form'
import NewBlogForm from './components/newblog-form'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import { useState, useEffect, useRef } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([null, false])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const refreshBloglist = async () => {
    let blogsInDB = await blogService.getAll()
    blogsInDB = await blogsInDB
    setBlogs(blogsInDB.data)
  }
  // blogService.getAll().then(blogsInDB => setBlogs(blogsInDB))
  useEffect( () => {

    refreshBloglist()
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

  const sendBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog)
      if (result.data) {
        setBlogs(blogs.concat(result.data))
      }
      setNotification(['Blog created succesfully', true])
      setTimeout(() => {setNotification([null, false])},5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification(['Could not create blog', false])
      setTimeout(() => {setNotification([null, false])},5000)
      console.log(error)
    }
  }
  // ordena de mayor a menor
  blogs.sort((a,b) => {
    if (a.upvotes > b.upvotes){
      return -1
    } else if (a.upvotes === b.upvotes) {
      return 0
    } else {
      return 1
    }
  })

  return (
    <div>
      <Notification
        message={notification[0]}
        type={notification[1]}
      />
      {
        user === null ?
          <LoginForm
            setUser={setUser}
            setNotification={setNotification}
          /> :
          <div>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in
              <button type='button' onClick={logOutHandler}>Log out</button>
            </p>
            <h2>Create</h2>
            <Togglable ref={blogFormRef} buttonLabel='create'>
              <NewBlogForm
                sendBlog={sendBlog}
              />
            </Togglable>
            {blogs.map((blog, i) =>
              <Blog
                key={i}
                blogdata={blog}
                refreshBloglist= {refreshBloglist}
              />
            )}

          </div>

      }
    </div>
  )
}

export default App
