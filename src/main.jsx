import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AddPost, AllPost, EditPost, Home, Post } from "./pages/index.js"
import { Login, Signup, AuthLayout } from "./Components/index.js"
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import App from './App.jsx'
import './index.css'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
      <Route path='/signup' element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
      <Route path='/all-posts' element={<AuthLayout authentication>{""}<AllPost /></AuthLayout>} />
      <Route path='/add-post' element={<AuthLayout authentication>{""}<AddPost /></AuthLayout>} />
      <Route path='/edit-post/:slug' element={<AuthLayout authentication>{""}<EditPost /></AuthLayout>} />
      <Route path='/post/:slug' element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(

  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
)