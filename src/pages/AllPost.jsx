import React, { useState, useEffect } from 'react'
import { PostCard } from '../Components/index'
import Service from "../appwrite/Services";

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        Service.getPosts([]).then((posts) => {
            if (posts) { setPosts(posts.documents) }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="text-center">
                <h1 className="font-bold text-2xl text-gray-500">No Post To Show</h1>
            </div>
        )
    } else {
        return (
            <div className='py-8 w-full'>
                <div className='flex flex-wrap justify-center sm:justify-start'>
                    {posts.map((post) => (<div key={post.$id} className='p-2 sm:w-[300px]'><PostCard {...post} /></div>))}
                </div>
            </div>
        )
    }
}

export default AllPosts