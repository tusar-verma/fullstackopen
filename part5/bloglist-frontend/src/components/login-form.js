import loginService from '../services/login-service'


const loginForm = ({username, password, setUsername, setPassword, setUser}) => {
   
    const loginHandler = async (event) => {        
        event.preventDefault()
        try {
            const result = await loginService.login(username, password)
            if (result.status === 200) {
                setUser(result.data)

            } else {
                console.log(result.data)
            } 
            
        } catch (error) {
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
                        onChange={({target}) => {setUsername(target.value)}}
                    ></input>
                </div>
                <div>
                    password 
                    <input 
                        type="text" 
                        value={password}
                        name="Password"
                        onChange={({target}) => {setPassword(target.value)}}
                    ></input>
                </div>     
                <button type='submit'>login</button>           
            </div>
        </form>
    )
}

export default loginForm