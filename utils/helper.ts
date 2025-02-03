import axios from 'axios';


export interface User {
    _id: string;
    email: string;
    name?: string;
}

export const updateUser = async (id: string, token: string, userData: User) => {
    try {
        const response = await axios.put(`http://192.168.0.42:3000/api/user/${id}`, userData, {
            headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("User updated successfully", response.data);
    } catch (error)  {
        console.log("Error updating user", error);
    }
}

export const fetchUser = async (id: string) => {
    try {
        const response = await axios.get(`http://192.168.1.59:3000/api/user/${id}`);
        console.log("User fetched successfully", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching user", error);
    }
}
