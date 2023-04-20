import { Link } from 'react-router-dom'
import '../App.css'

export default function Home() {
  return (
    <div className='Home'>
      <h1>Hey Listen!</h1>
      <p>Welcome to Hey Listen! A fun chat app where you can listen to music with your friends!</p>
      <p>On the left hand side you will see the current music queue with an embedded youtube video.</p>
      <p>On the right hand side you will see the live chat.</p> 
      <p>Don't forget to ask the helpful AI for any music suggestions!</p>
      <p>Enjoy!</p>
      <br></br>
      <Link to="/dashboard">Let's Get Started!</Link>
    </div>
  )
}