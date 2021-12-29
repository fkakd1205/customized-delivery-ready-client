import axios from "axios";

const excelTranslatorDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`api/v1/excel-translator/list`, {
                withCredentials: true
            })
        },
        postOne: async function (data) {
            return await axios.post(`/api/v1/excel-translator/one`, data, {
                withCredentials: true
            })
        },
        updateOne: async function (data) {
            return await axios.put(`/api/v1/excel-translator/one`, data, {
                withCredentials: true
            })
        },
        postFile: async function (formData) {
            return await axios.post(`/api/v1/excel-translator/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        downloadTranslatedExcelFile: async function (data) {
            return await axios.post(`/api/v1/excel-translator/download`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        postFileTest: async function (formData) {
            return await axios.post(`/api/v1/excel-translator/upload/test`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        }
    }
}

export {
    excelTranslatorDataConnect
}
    
