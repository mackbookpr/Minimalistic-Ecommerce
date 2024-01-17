import React from 'react'

function Filter() {
    return (
        <div className="max-w-[200px] px-[1.25em]">
            <div className="h-[25em] overflow-y-scroll w-[14em] flex flex-col gap-2">
                <div>
                    <h1 className='text-lg font-bold'>Categories</h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="kurta" className='mt-0.5' />
                    <h1>Kurta</h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="dhoti" className='mt-0.5' />
                    <h1>Dhoti</h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="lungi" className='mt-0.5' />
                    <h1>Lungi</h1>
                </div>

                <div>
                    <h1 className='text-lg font-bold'>Shop by Price</h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="kurta" className='mt-0.5' />
                    <h1>Under </h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="dhoti" className='mt-0.5' />
                    <h1>Dhoti</h1>
                </div>
                <div className='py-1 flex gap-1'>
                    <input type="checkbox" name="" id="lungi" className='mt-0.5' />
                    <h1>Lungi</h1>
                </div>

            </div>
        </div>
    )
}

export default Filter