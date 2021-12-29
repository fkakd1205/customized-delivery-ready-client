import axios from 'axios';
import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

import ExcelTranslatorBody from "./ExcelTranslatorBody";
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';

const ExcelTranslatorMain = () => {
    const [excelTranslatorHeaderList, setExcelTranslatorHeaderList] = useState([]);
    const [translatedExcelData, setTranslatedExcelData] = useState(null);

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
            createUploadHeader: async function (data) {
                await excelTranslatorDataConnect().postOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            updateUploadHeader: async function (data) {
                await excelTranslatorDataConnect().updateOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            uploadExcelFile: async function (e, headerData) {
                // 파일을 선택하지 않은 경우
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.append('file', addFiles[0]);
                uploadedFormData.append(
                    "dto",
                    new Blob([JSON.stringify(headerData)], { type: "application/json" })
                );

                await excelTranslatorDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setTranslatedExcelData(res.data.data)
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            downloadExcelFile: async function () {
                await  excelTranslatorDataConnect().downloadTranslatedExcelFile(translatedExcelData)
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
            uploadHeader: function () {
                return {
                    createOne: async function (data) {
                        await __handleDataConnect().createUploadHeader(data);
                    },
                    updateOne: async function (data) {
                        await __handleDataConnect().updateUploadHeader(data);
                    }
                }
            },
            uploadExcelData: function () {
                return {
                    submit: async function (e, headerData) {
                        e.preventDefault();
                        await __handleDataConnect().uploadExcelFile(e, headerData);
                    }
                }
            },
            downloadExcelFile: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().downloadExcelFile();
                    }
                }
            }
        }
    }

    return (
        <>
            <ExcelTranslatorBody
                excelTranslatorHeaderList={excelTranslatorHeaderList}

                __handleEventControl={__handleEventControl}
            ></ExcelTranslatorBody>
        </>
    )
}

export default withRouter(ExcelTranslatorMain);