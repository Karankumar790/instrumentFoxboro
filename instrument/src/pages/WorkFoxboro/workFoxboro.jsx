import React from 'react'
import PageContainer from '../../components/HOC/PageContainer'

const data =
    [
        { label: "Service Partner", placeholder: "Service Partner" },
        { label: "Contact Person", placeholder: "Contact Person" },
        { label: "Mobile", placeholder: "Mobile" },
        { label: "Email", placeholder: "Email" },
        { label: "City", placeholder: "City" },
        { label: "State", placeholder: "State" },
        { label: "Country", placeholder: "Country" },
    ]

function workFoxboro() {
    return (
        <>
            <PageContainer showheader="true" showfooter="true">
                <p className='text-2xl font-bold ml-2'>
                    Work Foxboro
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-100 rounded-xl shadow-md mt-2">
                    {data.map(({label, placeholder}, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-lg font-semibold text-gray-700 mb-2">{label}</label>
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    ))}
                    <button className='bg-blue-700 p-1 h-10 mt-9 text-white font-bold rounded-md'>Submit</button>
                </div>


            </PageContainer>
        </>
    )
}

export default workFoxboro
