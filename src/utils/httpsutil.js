export async function fetchUsers() {
    try {
        const token = localStorage.getItem('Authorization');
        
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const response = await fetch('http://localhost:8080/users', {
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
    const response = await fetch('http://localhost:8080/login', {
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

    const data = await response.json();

    localStorage.setItem('Authorization', data);

    return data.token;
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/signup', {
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
        throw new Error('Signup failed: ' + response.statusText);
    }

    const data = await response.json();

    localStorage.setItem('Authorization', data);

    return data.token;
};

export const changePassword = async (oldPassword, newPassword, token) => {
    const response = await fetch('http://localhost:8080/password', {
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

    const data = await response.json();
    return data;
};

export const modifyStudentDetails = async (studentData, token) => {
    const response = await fetch('http://localhost:8080/detail', {
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

    const data = await response.json();
    return data;
};