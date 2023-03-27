import axios from "axios"

const apiObj = {
    // baseURL: "http://localhost:5000/",
    baseURL : "/",

    
    async createCustomer(customerObj) {        
        const res = await axios.post(this.baseURL + 'createCustomer',{customerObj});
        return res;
    },

    async updateCustomer(customerObj) {        
        const res = await axios.post(this.baseURL + 'updateCustomer',{customerObj});
        return res;
    },

    async deleteCustomer(customerObj) {        
        const res = await axios.post(this.baseURL + 'deleteCustomer',{customerObj});
        return res;
    },

    async getCustomers(customerObj) {        
        const res = await axios.post(this.baseURL + 'getCustomers',{customerObj});
        return res;
    },

    async createBooking(bookingDetails) {
        const res = await axios.post(this.baseURL + 'createBooking',{bookingDetails});
        return res;
    },

    async updateBooking(bookingDetails) {
        const res = await axios.post(this.baseURL + 'updateBooking',{bookingDetails});
        return res;
    },

    async readBooking(id) {
        const res = await axios.post(this.baseURL + 'readBooking',{id});
        return res;
    },

    async deleteBooking(customerId,id) {
        const res = await axios.post(this.baseURL + 'deleteBooking',{customerId,id});
        return res;
    }
}
export default apiObj;