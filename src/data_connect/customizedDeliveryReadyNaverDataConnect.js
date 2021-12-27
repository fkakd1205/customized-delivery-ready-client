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
        searchCustomizedTableHeader: async function (titleId) {
            return await axios.get(`/api/v1/delivery-ready/customize/header/selected`, {
                params: {
                    titleId: titleId,
                },
                withCredentials: true
            });
        },
        searchSelectedCustomDeliveryReadyItem: async function (titleId) {
            return await axios.get(`/api/v1/delivery-ready/customize/naver/customized`, {
                params: {
                    titleId: titleId,
                },
                withCredentials: true
            });
        },
        searchRefForm: async function () {
            return await axios.get("/api/v1/delivery-ready/ref-form/list", {
                withCredentials: true
            });
        },
        postCreateCustomTableHeaderList: async function (data) {
            return await axios.post(`/api/v1/delivery-ready/customize/header/list`, data, {
                withCredentials: true
            })
        },
        searchCustomizedTableHeaderTitle: async function () {
            return await axios.get(`/api/v1/delivery-ready/customize/header-title/list`, {
                withCredentials: true
            });
        },
        downloadCustomizedExcelFile: async function (data) {
            return await axios.post(`/api/v1/customized-excel/download`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
    }
}

export {
    customizedDeliveryReadyNaverDataConnect
}
    
