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

    return (
        <div className='py-8 w-full'>
            <div className='flex flex-wrap justify-center sm:justify-start'>
                {posts.map((post) => (<div key={post.$id} className='p-2 sm:w-[300px]'><PostCard {...post} /></div>))}
            </div>
        </div>
    )
}

export default AllPosts