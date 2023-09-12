import './global.css'
import { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs,setBlogs] = useState(null)
  const [blog,setBlog] = useState({
    title :'',
    author : '',
    url : '', 
    likes : 0
  })
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    try{
      const asyncFun = async ()=>{
        if(user){
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        }
      }
      asyncFun();
    }catch(err){
      console.log("Something went wrong on getting blogs");
    }
  }, [user])


  

  const handleLogin =async (e)=>{
    e.preventDefault();
    const loginBody = {
        username, password
    }
    try{
        const response = await loginService.logIn(loginBody);
        console.log(response);
        setUser(response);
        window.localStorage.setItem(
          'loggedAppUser', JSON.stringify(response)
        )
        
        setPassword('')
        setUsername('')
        
    }catch(exception){
        console.log("login error")
    }
  }


  const LoginForm = ()=>{
    return(<>
      <h1>Log in your account</h1>
      <form onSubmit={handleLogin}>
          <div>
              <label>username</label>
              <br/>
              <input
              type="text"
              value={username}
              name="Username"
              onChange={e=>setUsername(e.target.value)}
          />
          </div>
          <div>
              <label>Password</label>
              <br/>
              <input
              type="password"
              value={password}
              name="Password"
              onChange={e=>setPassword(e.target.value)}
          />
          </div>
          <button type="submit">login</button>
      </form>
  </>)
  }

  const handleBlog = async ()=>{
    setBlog({...blog, author:user.name})
    
    await blogService.create(blog)
  }

  const handleLogOut = e =>{
    window.localStorage.clear();
    setUser(null);
  }

  const loggedInScene = () =>{
    return(<>
      <h2>Hello, {user.name}</h2>
      <button onClick={handleLogOut}>log Out</button>
      <h3>All Blog posts</h3>
      <Blogs/>
      <NewBlog/>
    </>)
  }
  const Blogs = ()=>{
    const generateBlogs = ()=>{
      
      if(blogs){
        return blogs.map(blog=><li>{`${blog.title} by ${blog.title}`}</li>)
      }
    }
    return(<>
      {generateBlogs()}
    </>)
  }

  const NewBlog = ()=>{
    return(<>
      
      <h1>Add a new blog</h1>
      
      <form onSubmit={handleBlog}>
          <div>
              <label>Title</label>
              <br/>
              <input
              type="text"
              value={blog.title}
              name="Title"
              onChange={e=>setBlog({...blog,title : e.target.value})}
              />
          </div>
          <div>
              <label>URL</label>
              <br/>
              <input
              type="text"
              value={blog.url}
              name="Title"
              onChange={e=>setBlog({...blog,url : e.target.value})}
              />
          </div>
          <div>
              <label>Likes</label>
              <br/>
              <input
              type="text"
              value={blog.likes}
              name="Title"
              onChange={e=>setBlog({...blog,likes : e.target.value})}
              />
          </div>
          <button type="submit">Add</button>
          
      </form>
  </>)
  }

  return (
    <div>
      <h2>blogs</h2>
      {!user?LoginForm():loggedInScene()}
    </div>
  )
}

export default App