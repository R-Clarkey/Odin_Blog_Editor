import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import "./styles/authPage.css"

import Home from './pages/Home'
import Posts from './pages/Posts'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
