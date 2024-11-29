import axios from 'axios';

export async function fetchUsers() {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/detail`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data;

    } catch (error) {
        // Handle errors appropriately
        throw new Error('Error fetching data: ' + (error.response ? error.response.status : error.message));
    }
}

export async function fetchEducation() {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/education`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });


        return response.data;

    } catch (error) {
        // Handle errors appropriately
        throw new Error('Error fetching data: ' + (error.response ? error.response.status : error.message));
    }
}

export async function deleteEducationWithId(educationId) {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/education`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: { educationId }
        });

        return response.data;

    } catch (error) {
        // Handle errors appropriately
        throw new Error('Error fetching data: ' + (error.response ? error.response.status : error.message));
    }
}


export async function postEducation(education) {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/education`, education, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;

    } catch (error) {
        // Handle errors appropriately
        throw new Error('Error fetching data: ' + (error.response ? error.response.status : error.message));
    }
}


export async function fetchDomain() {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/domain`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data, status: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
}

export async function fetchPlacement() {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/placement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data, status: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
}

export async function fetchSpecialization() {
    try {
        const token = localStorage.getItem('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/specialization`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data, status: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
}

export const login = async (username, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
    }

    const data = await response.text();

    localStorage.setItem('Authorization', data);

    return data;
};

export const signup = async (username, password, email) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            email
        }),
    });

    if (!response.ok) {
        throw new Error('Signup failed: ' + response.statusText);
    }

    const data = await response.text();

    localStorage.setItem('Authorization', data);

    return data.token;
};

export const changePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem('Authorization');

    if (!token) {
        throw new Error('Authorization token is missing');
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            oldPassword,
            newPassword,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to change password: ' + response.statusText);
    }

    const data = await response.text();
    return data;
};

export const modifyStudentDetails = async (studentData) => {
    const token = localStorage.getItem('Authorization');

    if (!token) {
        throw new Error('Authorization token is missing');
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(studentData),
    });

    if (!response.ok) {
        throw new Error('Failed to modify student details: ' + response.statusText);
    }

    const data = await response.text();
    return data;
};
