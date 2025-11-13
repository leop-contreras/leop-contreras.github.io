import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import CV from './pages/CV'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/cv' element={<CV />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
