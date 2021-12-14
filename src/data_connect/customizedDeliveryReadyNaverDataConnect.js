import axios from "axios";

const customizedDeliveryReadyNaverDataConnect = () => {
    return {
        postFile: async function (formData) {
            return await axios.post(`/api/v1/delivery-ready/customize/naver/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        storeFile: async function (data) {
            return await axios.post(`/api/v1/delivery-ready/customize/naver/store`, data, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        // changeToCustomizedForm: async function (data) {
        //     return await axios.post(`/api/v1/delivery-ready/customize/naver/customized`, data, {
        //         headers: {
        //             "content-types": "multipart/form-data"
        //         },
        //         withCredentials: true
        //     })
        // },
        searchCustomizedTableHeader: async function () {
            return await axios.get(`/api/v1/delivery-ready/customize/header/list`, {
                withCredentials: true
            });
        },
        searchAllCustomDeliveryReadyItem: async function () {
            return await axios.get(`/api/v1/delivery-ready/customize/naver/customized`, {
                withCredentials: true
            });
        },
        searchRefForm: async function () {
            return await axios.get("/api/v1/delivery-ready/ref-form/list", {
                withCredentials: true
            });
        },
        postCreateCustomTableHeaderList: async function (data) {
            console.log(data);
            return await axios.post(`/api/v1/delivery-ready/customize/header/list`, data, {
                withCredentials: true
            })
        }
    }
}

export {
    customizedDeliveryReadyNaverDataConnect
}
    
