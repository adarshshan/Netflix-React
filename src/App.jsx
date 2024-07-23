import React, { Suspense, lazy } from 'react'
import './assets/App.css'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Profile from './pages/Profile'
import Navbar from './Components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
//lazy loading
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import(/*webpackChunkName:"mySignUpFile"*/'./pages/Signup'))
const Profile = lazy(() => wait(1500).then(() => import('./pages/Profile')))

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Suspense fallback={<span class="loader" />}><Home /></Suspense>} />
          <Route path='/login' element={<Suspense fallback={<span class="loader" />}><Login /></Suspense>} />
          <Route path='/signup' element={<Suspense fallback={<span class="loader" />}> <Signup /></Suspense>} />
          <Route path='/profile' element={<ProtectedRoute>
            <Suspense fallback={<span class="loader" />}><Profile /></Suspense>
          </ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App

function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}