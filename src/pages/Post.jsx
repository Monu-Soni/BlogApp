import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "../Components/index";
import Services from "../appwrite/Services";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

export default function Post() {
    const userData = useSelector((state) => state.Auth.userData);
    const [post, setPost] = useState(null);
    const Navigate = useNavigate();
    const { slug } = useParams();
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            Services.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    Navigate("/")
                }

            });
        } else Navigate("/");
    }, [slug, Navigate])

    const deletePost = () => {
        Services.deletePost(post.$id).then((status) => {
            if (status) { Services.deleteFile(post.images); Navigate("/"); }
        })
    }

    return post ? (
        <div className="py-8">
            <div className="relative flex justify-center mb-4 p-6 border rounded-xl w-full">
                <img src={Services.getFilePreview(post.images)} alt={post.title} className="rounded-xl" />
                {isAuthor && (
                    <div className="top-2 right-6 absolute">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                    </div>
                )}
            </div>
            <div className="mb-6 w-full">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <h1 className="browser-css">{parse(post.content)}</h1>
            </div>
        </div>
    ) : null;
}
