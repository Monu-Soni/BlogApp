
function Button({ children, className, bgColor, ...props }) {
  return (
    <div className='inline px-2 py-2'>
      <button type="submit" {...props}
        className={`mr-1 text-xl hover:underline text-[#0FFCBE] transition-all ${className}`}>
        {children}
      </button>
    </div>
  )
}

export default Button
