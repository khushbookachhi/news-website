
import { Toaster } from 'react-hot-toast';
import './App.css'
import Navbar from './components/navbar/Navbar'
import News from './pages/news/News'

function App() {
  

  return (
    <><Navbar/>
       <News/>
       <Toaster/>
    </>
  )
}

export default App
