import loginService from '../services/login-service'
import blogService from '../services/blog-service'


const loginForm = ({username, password, setUsername, setPassword, setUser, setNotification}) => {
   
    const loginHandler = async (event) => {        
        event.preventDefault()
        try {
            const result = await loginService.login(username, password)
            if (result.status === 200) {
                window.localStorage.setItem('loggedBloglistUser', JSON.stringify(result.data))
                setUsername('')
                setPassword('')
                setNotification(['Logged in succesfully', true])
                setTimeout(()=>{setNotification([null, false])},5000)
                blogService.setToken(result.data.token)
                setUser(result.data)
            }             
        } catch (error) {
            setNotification(['Error in log in', false])
            setTimeout(()=>{setNotification([null, false])},5000)
            console.log(error)
        }
    }


    return (
        <form onSubmit={loginHandler}>
            <div>
                <div>
                    username 
                    <input 
                        type="text" 
                        value={username}
                        name="Username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password 
                    <input 
                        type="text" 
                        value={password}
                        name="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>     
                <button type='submit'>login</button>           
            </div>
        </form>
    )
}

export default loginForm