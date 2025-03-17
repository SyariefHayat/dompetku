import { apiInstanceExpress } from "../express/apiInstance";

export const GetUserTransactions = async ( order_id ) => {
    try {
        const response = await apiInstanceExpress.get(`/receipt/${order_id}`);

        if (response.status == 200) return response.data;

    } catch (error) {
        console.log(error);
    }
}