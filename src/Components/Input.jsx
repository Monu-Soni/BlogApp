import React, { forwardRef, useId } from 'react'

function Input({ label, className, type = "text", placeholder, ...props }, ref) {
    const Id = useId()
    
    return (
        <div className='flex flex-col p-2'>
            <label className='pl-2' htmlFor={Id}>{label}</label>
            <input className={`p-2 border rounded w-full ${className}`}
                placeholder={placeholder} type={type} ref={ref} {...props} id={Id} />
        </div>
    )
}

export default forwardRef(Input) 
