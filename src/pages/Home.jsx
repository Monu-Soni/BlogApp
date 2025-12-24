import { useEffect, useState } from 'react'
import { PostCard, Button } from '../Components/index'
import Service from "../appwrite/Services";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import img from "/pito.avif"

function Home() {
  const authStatus = useSelector((state) => state.Auth.status)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Service.getPosts().then((posts) => { if (posts) { setPosts(posts.documents) } })
  }, [])

  if (posts.length >= 0 && authStatus === false) {
    return (
      <div className='flex flex-col md:flex-row justify-end bg-[#106EBE] min-h-calc'>
        <div className="flex flex-col justify-center gap-2 text-center p-2 w-full md:w-1/2">
          <h1 className="text-[#0FFCBE] text-3xl md:text-4xl font-bold">Connecting brands with the people they love.</h1>
          <p className='text-white text-xl md:text-2xl font-bold'>Thoughtful copywriting and brand messaging, crafted with care for you and your people.</p>
          <Button className="text-[#106EBE] bg-[#0FFCBE] hover:bg-white rounded-full md:px-16 px-10 md:py-2">
            <Link to={"/login"}>Log In</Link>
          </Button>
        </div>
        <div className='md:w-1/2 flex flex-wrap justify-center'>
          <img src={img} alt="img" />
        </div>
      </div>
    )
  } else if (posts.length === 0 && authStatus === true) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl text-gray-500">No Post To Show</h1>
      </div>
    )
  }
  return (
    <div className='py-6 w-full'>
      <div className='flex flex-wrap justify-center sm:justify-start'>
        {posts.map((post) => (<div key={post.$id} className='p-2 sm:w-72'><PostCard {...post} /></div>))}
      </div>
    </div>
  )
}

export default Home