import React from 'react'

function Newsletter() {
    return (
        <div className='bg-orange-200 h-[10em] mt-10 flex gap-5 justify-center items-center'>
            <div className='w-[18em] h-[10em] flex flex-col justify-center gap-2'>
                <h1 className='text-center text-3xl font-bold'>Newsletter</h1>
                <div className="flex gap-2">
                    <input type="email" name="Newsletter" className='rounded-md px-2 w-[250px] border-2 border-black py-1' placeholder='Type you email'/>
                    <button className='rounded-md px-2 bg-white border-2 border-black'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Newsletter