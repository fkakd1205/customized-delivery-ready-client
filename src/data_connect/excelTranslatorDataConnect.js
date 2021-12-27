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
        }
    }
}

export {
    excelTranslatorDataConnect
}
    
