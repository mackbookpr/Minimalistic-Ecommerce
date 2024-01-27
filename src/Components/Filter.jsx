import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductFilters } from '../Store/Actions/ProductFilters';

function Filter() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    dispatch(ProductFilters({ category: event.target.value }));
  };

  return (
    <div className="max-w-[200px] px-[1.25em]">
      <div className="h-[25em] overflow-y-scroll w-[14em] flex flex-col gap-2">
        <div>
          <h1 className='text-lg font-bold'>Categories</h1>
        </div>
        <div className='py-1 flex gap-1'>
          <input
            type="checkbox"
            id="kurtaCheckbox"
            value="Kurta"
            checked={selectedCategory === 'Kurta'}
            className='mt-0.5'
            onChange={handleCategoryChange}
          />
          <h1>Kurta</h1>
        </div>
        <div className='py-1 flex gap-1'>
          <input
            type="checkbox"
            id="dhotiCheckbox"
            value="dhoti"
            checked={selectedCategory === 'dhoti'}
            className='mt-0.5'
            onChange={handleCategoryChange}
          />
          <h1>Dhoti</h1>
        </div>
        <div className='py-1 flex gap-1'>
          <input
            type="checkbox"
            id="lungiCheckbox"
            value="lungi"
            checked={selectedCategory === 'lungi'}
            className='mt-0.5'
            onChange={handleCategoryChange}
          />
          <h1>Lungi</h1>
        </div>
      </div>
    </div>
  );
}

export default Filter;
