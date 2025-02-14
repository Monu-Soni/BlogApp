import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { PostForm } from '../Components/index'
import Service from "../appwrite/Services";

function EditPost() {
    const [post, setPosts] = useState(null)
    const Navigate = useNavigate()
    const { slug } = useParams()

    useEffect(() => {
        if (slug) { Service.getPost(slug).then((post) => { if (post) { setPosts(post) } }) }
        else { Navigate('/') }
    }, [slug, Navigate])

    return post ? (<div className='py-8'><PostForm post={post} /></div>) : null
}

export default EditPost