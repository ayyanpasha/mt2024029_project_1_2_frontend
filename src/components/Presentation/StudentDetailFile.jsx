import React, { useEffect } from 'react'

export default function StudentDetailFile({setFileName, label, fileName}) {

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
        }
    };

    return (
        <tr>
            <th scope="col">{label}</th>
            <th scope="col">
                <input
                    type="file"
                    id="geeks"
                    onChange={handleFileChange}
                />
            </th>
        </tr>
    )
}
