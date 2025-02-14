import React, { useEffect, useState } from 'react'
import { PostCard } from '../Components/index'
import Service from "../appwrite/Services";
import { useSelector } from 'react-redux';

function Home() {
  const authStatus = useSelector((state) => state.Auth.status)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Service.getPosts().then((posts) => { if (posts) { setPosts(posts.documents) } })
  }, [])

  if (posts.length >= 0 && authStatus === false) {
    return (
      <div className="flex flex-wrap mt-4 py-8 p-2 text-center">
        <h1 className="w-full font-bold text-2xl hover:text-gray-500">Login to read posts</h1>
      </div>
    )
  } else if (posts.length === 0 && authStatus === true) {
    return (
      <div className="flex flex-wrap mt-4 py-8 p-2 text-center">
        <h1 className="w-full font-bold text-2xl hover:text-gray-500">No Post To Show</h1>
      </div>
    )
  }
  return (
    <div className='py-8 w-full'>
      <div className='flex flex-wrap justify-center sm:justify-start'>
        {posts.map((post) => (<div key={post.$id} className='p-2 sm:w-[300px]'><PostCard {...post} /></div>))}
      </div>
    </div>
  )
}

export default Home