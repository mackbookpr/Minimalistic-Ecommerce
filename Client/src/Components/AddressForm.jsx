import React, { useState } from 'react';

const AddressForm = ({ validPay, setValidPay }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidPay(true);
    };

    return (
        <div className="w-full rounded pt-6 pb-4 mb-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="addressLine1">
                        Address Line 1
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="addressLine1"
                        name="addressLine1"
                        type="text"
                        placeholder="Address Line 1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="addressLine2">
                        Address Line 2
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="addressLine2"
                        name="addressLine2"
                        type="text"
                        placeholder="Address Line 2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="city">
                        City
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="state">
                        State
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-2 md:col-span-2 flex justify-center gap-2">
                    <label className="flex items-center text-gray-700 text-sm font-bold mb-1" htmlFor="country">
                        Country
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-center col-span-1 md:col-span-2">
                    <button
                        className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
