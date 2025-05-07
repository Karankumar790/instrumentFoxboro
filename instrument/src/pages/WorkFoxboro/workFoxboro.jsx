import React, { useState } from 'react'
import PageContainer from '../../components/HOC/PageContainer'
import { useDispatch } from 'react-redux';
import { postWork } from './workFoxSlice';

const data =
    [
        { label: "Service Partner", placeholder: "Service Partner",name: "ServicePartner" },
        { label: "Contact Person", placeholder: "Contact Person", name: "name" },
        { label: "Mobile", placeholder: "Mobile", name: "mobile" },
        { label: "Email", placeholder: "Email", name: "email" },
        { label: "City", placeholder: "City", name: "city" },
        { label: "State", placeholder: "State", name: "state" },
        { label: "Country", placeholder: "Country", name: "country" },
    ]

function workFoxboro() {

    const [valueFrom, setValueFrom] = useState({});
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValueFrom((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        console.log("There are the One",valueFrom )
        dispatch(postWork(valueFrom))
        setValueFrom({
            ServicePartner:"",
            name:"",
            mobile:"",
            email:"",
            city:"",
            state:"",
            country:""
        })
    }


    return (
        <>
            <PageContainer showheader="true" showfooter="true">
                <p className='text-2xl font-bold ml-2'>
                    Work Foxboro
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-100 rounded-xl shadow-md mt-2">
                    {data.map(({ label, placeholder, name }, index) => (
                        <div key={index} className="flex flex-col">
                            <label className="text-lg font-semibold text-gray-700 mb-2">{label}</label>
                            <input
                                type="text"
                                name={name}
                                placeholder={placeholder}
                                onChange={handleInput}
                                value={valueFrom[name]}
                                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit} className='bg-blue-700 p-1 h-10 mt-9 text-white font-bold rounded-md'>Submit</button>
                </div>


            </PageContainer>
        </>
    )
}

export default workFoxboro
