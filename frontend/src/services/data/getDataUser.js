import { apiInstanceExpress } from "../express/apiInstance";

export const getDataUser = async (email, token) => {
    try {
        const url = `/dashboard/${email}/${token}`;
        const response = await apiInstanceExpress.get(url);

        if (response.status == 200) return response.data;

    } catch (error) {
        console.log(error);
    }
}