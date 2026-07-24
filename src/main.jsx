import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { AddPost, AllPost, EditPost, Home, Post } from "./pages/index.js"
import { Login, Signup, Profile } from "./Components/index.js"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import Store from "./Store/Store.js"
import App from "./App.jsx"
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/all-posts" element={<AllPost />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/edit-post/:slug" element={<EditPost />} />
      <Route path="/post/:slug" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
)
createRoot(document.getElementById("root")).render(<Provider store={Store}><RouterProvider router={router} /></Provider>)