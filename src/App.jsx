import { Header } from './Components/index'
import { logIn, logOut } from './Store/authSlice'
import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import AuthService from './appwrite/Auth'
import { useDispatch } from 'react-redux'

function App() {
  const [Loading, setLoading] = useState(true)
  const Dispatch = useDispatch()

  useEffect(() => {
    AuthService.getCurrentUser().then((userData) => {
      if (userData) { Dispatch(logIn(userData)) }
      else { Dispatch(logOut()) }
    }).finally(() => setLoading(false))
  }, [])

  return !Loading ? (
    <section className="flex flex-col w-full">
      <Header />
      <main className='min-h-calc'><Outlet /></main>
    </section>
  ) : null
}

export default App