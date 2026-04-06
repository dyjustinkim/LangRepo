import LoginButton from '../components/LoginButton'
import logo from '../assets/langrepoimg.png'

export default function Login() {   
    const image = {logo}

    return (
    
    <div className="my-container">
        
          <div className="card">
            <h1 style={{ fontSize: "3rem" }}>Welcome to LangRepo!</h1>
            <p style={{ fontSize: "1.5rem" }}> Upload documents, generate flashcards, and study efficiently</p>
            <img style={{ width: "400px", height: "auto" }} src={image.logo} alt="Logo" className="logo"/>
            <LoginButton/>
        </div>
        <p>Made by Justin Kim</p>
    </div>
    
    )
}


