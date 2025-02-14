import React, { useId } from 'react'

function Select({ label, options, className, ...props }, ref) {
    const Id = useId()
    return (
        <div className='p-2'>
            <label htmlFor={Id} className='block'>{label}:</label>
            <select {...props} id={Id} ref={ref}
                className={`px-3 py-2 rounded-lg bg-white w-full text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200${className}`}>
                {options?.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)