import Service from "../appwrite/Services"
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

function PostCard({ $id, title, content, images }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className='bg-gray-100 p-4 rounded-xl min-w-[200px]'>
        <div className='justify-center mb-4 w-full'>
          <img src={Service.getFilePreview(images)} alt={title} className='rounded-xl w-auto h-[200px]' />
        </div>
        <h2 className='font-bold text-xl underline'>{title}</h2>
        <h2 className='font-normal text-base browser-css'>{parse(content)}</h2>
      </div>
    </Link>
  )
}


export default PostCard