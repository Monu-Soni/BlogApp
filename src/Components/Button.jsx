import React from 'react'

function Button({children, bgColor, ...props}) {
  return (
    <div className='inline'>
      <button type="submit" {...props}
        className="hover:border-gray-600 hover:bg-slate-600 mr-1 px-3 py-1 border border-blue-500 rounded-md text-black hover:text-white transition-all">
        {children}
      </button>
    </div>
  )
}

export default Button
