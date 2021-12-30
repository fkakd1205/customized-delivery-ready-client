import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

import ExcelTranslatorBody from "./ExcelTranslatorBody";
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';

const ExcelTranslatorMain = () => {
    const [excelTranslatorHeaderList, setExcelTranslatorHeaderList] = useState([]);
    const [uploadedExcelData, setUploadedExcelData] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchExcelTranslatorHeader();
        }

        fetchInit();
    }, [])

    const __handleDataConnect = () => {
        return {
            searchExcelTranslatorHeader: async function () {
                await excelTranslatorDataConnect().searchList()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelTranslatorHeaderList(res.data.data);
                        }
                    })
                    .catch(err => {
                       console.log(err); 
                    });
            },
            createTranslatorHeader: async function (data) {
                await excelTranslatorDataConnect().postOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                            this.searchExcelTranslatorHeader();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            uploadExcelFile: async function (uploadedFormData) {
                await excelTranslatorDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setUploadedExcelData(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            // createUploadHeaderDetails: async function (uploadHeaderDetails) {
            //     await excelTranslatorDataConnect().createUploadHeaderDetail()
            // }
        }
    }

    const __handleEventControl = () => {
        return {
            translatorHeader: function () {
                return{
                    submit:  async function (data) {
                        await __handleDataConnect().createTranslatorHeader(data);
                    }
                }
            },
            uploadExcelData: function () {
                return {
                    submit: async function (uploadedFormData) {
                        await __handleDataConnect().uploadExcelFile(uploadedFormData);
                    }
                }
            },
            createUploadHeaderDetails: function () {
                return {
                    submit: async function (uploadHeaderDetails) {
                        await __handleDataConnect().createUploadHeaderDetails(uploadHeaderDetails);
                    }
                }
            }
        }
    }


    return (
        <>
            <ExcelTranslatorBody
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                createTranslatorHeaderTitle={(excelTranslatorTitle) => __handleEventControl().translatorHeader().submit(excelTranslatorTitle)}
                uploadExcelFile={(uploadedFormData) => __handleEventControl().uploadExcelData().submit(uploadedFormData)}
                createUploadHeaderDetails={(uploadHeaderDetails) => __handleEventControl().createUploadHeaderDetails().submit(uploadHeaderDetails)}
                uploadedExcelData={uploadedExcelData}

            ></ExcelTranslatorBody>
        </>
    )
}

export default withRouter(ExcelTranslatorMain);