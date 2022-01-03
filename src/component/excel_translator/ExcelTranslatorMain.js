import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

import ExcelTranslatorBody from "./ExcelTranslatorBody";
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';

class TranslatedData {
    constructor() {
        this.id = uuidv4();
        this.translatedData = {
            details : []
        };
    }

    toJSON() {
        return {
            id: this.id,
            translatedData: this.translatedData,
        }
    }
}

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
                        alert(res?.data?.message);
                    })
            },
            createUploadHeaderDetails: async function (uploadHeaderDetails) {
                await excelTranslatorDataConnect().createUploadHeaderDetail(uploadHeaderDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.message);
                    })
            },
            createDownloadHeaderDetails: async function (downloadHeaderDetails) {
                await excelTranslatorDataConnect().createDownloadHeaderDetails(downloadHeaderDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.message);
                    })
            },
            downloadTranslatedExcelFile: async function (translatedData) {
                await  excelTranslatorDataConnect().downloadTranslatedExcelFile(translatedData)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        link.setAttribute('download', '엑셀변환기 다운로드.xlsx');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
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
                    },
                    reset: function () {
                        setUploadedExcelData(null);
                    }
                }
            },
            createUploadHeaderDetails: function () {
                return {
                    submit: async function (uploadHeaderDetails) {
                        await __handleDataConnect().createUploadHeaderDetails(uploadHeaderDetails);
                    }
                }
            },
            createDownloadHeaderDetails: function () {
                return {
                    submit: async function (downloadHeaderDetails) {
                        await __handleDataConnect().createDownloadHeaderDetails(downloadHeaderDetails);
                    }
                }
            },
            downloadTranslatedExcelFile: function () {
                return {
                    submit: async function (downloadHeaderDetail) {
                        // 다운로드 양식으로 변경
                        let excelData = downloadHeaderDetail.map(r => {
                            return uploadedExcelData.map((data, idx) => {
                                if(idx === 0) {
                                    let details = {
                                        colData: r.headerName,
                                        cellType: 'String'
                                    }
                                    return details;
                                }else{
                                    if(r.targetCellNumber === -1) {
                                        let details = {
                                            colData: r.fixedValue,
                                            cellType: 'String'
                                        };
                                        return details;
                                    }else {
                                        return data.uploadedData.details[r.targetCellNumber];
                                    }
                                }
                            });
                        });

                        // dto로 변경
                        let translatedDetail = excelData.map(r => {
                            let data = new TranslatedData().toJSON();
                            data.translatedData.details = r;
                            return data;
                        })

                        await __handleDataConnect().downloadTranslatedExcelFile(translatedDetail);
                    }
                }
            }
        }
    }


    return (
        <>
            <ExcelTranslatorBody
                excelTranslatorHeaderList={excelTranslatorHeaderList}
                uploadedExcelData={uploadedExcelData}

                createTranslatorHeaderTitle={(excelTranslatorTitle) => __handleEventControl().translatorHeader().submit(excelTranslatorTitle)}
                uploadExcelFile={(uploadedFormData) => __handleEventControl().uploadExcelData().submit(uploadedFormData)}
                downloadTranslatedExcelFile={(downloadHeaderDetail) => __handleEventControl().downloadTranslatedExcelFile().submit(downloadHeaderDetail)}
                resetUploadExcelFile={() => __handleEventControl().uploadExcelData().reset()}
                createUploadHeaderDetails={(uploadHeaderDetails) => __handleEventControl().createUploadHeaderDetails().submit(uploadHeaderDetails)}
                createDownloadHeaderDetails={(downloadHeaderDetails) => __handleEventControl().createDownloadHeaderDetails().submit(downloadHeaderDetails)}

            ></ExcelTranslatorBody>
        </>
    )
}

export default withRouter(ExcelTranslatorMain);