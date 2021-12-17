import {useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

import CustomizedExcelUploadBody from './CustomizedExcelUploadBody';
import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';

class ExcelHeader {
    constructor() {
        this.cid = 1;
        this.id = uuidv4();
        this.uploadHeaderTitle = '';
        this.downloadHeaderTitle = '';
        this.uploadHeaderDetail = null;
        this.downloadHeaderDetail = null;
        this.startRowNumber = 0;
    }

    toJSON() {
        return {
            cid: this.cid,
            id: this.id,
            uploadHeaderTitle: this.uploadHeaderTitle,
            downloadHeaderTitle: this.downloadHeaderTitle,
            uploadHeaderDetail: this.uploadHeaderDetail,
            downloadHeaderDetail: this.downloadHeaderDetail,
            startRowNumber: this.startRowNumber
        }
    }
}

const CustomizedExcelUploadMain = () => {
    const [uploadExcelTitle, setUploadExcelTitle] = useState(null);
    const [downloadExcelTitle, setDownloadExcelTitle] = useState(null);
    const [excelHeaderData, setExcelHeaderData] = useState([]);
    // const [excelHeader, setExcelHeader] = useState(new ExcelHeader().toJSON());
    const [customizedExcelData, setCustomizedExcelData] = useState(null);

    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };

    const config2 = {
        headers: {
            "response-type": "blob"
        }
    };

    useEffect(() => {
        async function fetchInit() {
            // upload

            let uploadHeaderDetail1 = {
                headerId: uuidv4(),
                headerName: '상품명',
                dataType: 'STRING',
                cellNumber: 0
            }

            let uploadHeaderDetail2 = {
                headerId: uuidv4(),
                headerName: '옵션명',
                dataType: 'STRING',
                cellNumber: 1
            }

            let uploadHeaderDetail3 = {
                headerId: uuidv4(),
                headerName: '수취인명',
                dataType: 'STRING',
                cellNumber: 2
            }

            let uploadHeaderDetail4 = {
                headerId: uuidv4(),
                headerName: '결제일',
                dataType: 'DATE',
                cellNumber: 3
            }

            let uploadHeaderDetail5 = {
                headerId: uuidv4(),
                headerName: '판매채널',
                dataType: 'STRING',
                cellNumber: 4
            }

            let uploadHeaderDetail6 = {
                headerId: uuidv4(),
                headerName: '',
                dataType: 'STRING',
                cellNumber: -1
            }
            
            // download

            let downloadHeaderDetail1 = {
                headerId: uuidv4(),
                headerName: '수취인이름',
                dataType: 'STRING',
                targetCellNumber: 2,
                fixedValue: null,
                uploadHeaderId: uploadHeaderDetail3.headerId
            }

            let downloadHeaderDetail2 = {
                headerId: uuidv4(),
                headerName: '상품이름',
                dataType: 'STRING',
                targetCellNumber: 0,
                fixedValue: null,
                uploadHeaderId: uploadHeaderDetail1.headerId
            }

            let downloadHeaderDetail3 = {
                headerId: uuidv4(),
                headerName: '옵션이름',
                dataType: 'STRING',
                targetCellNumber: 1,
                fixedValue: null,
                uploadHeaderId: uploadHeaderDetail2.headerId
            }

            let downloadHeaderDetail4 = {
                headerId: uuidv4(),
                headerName: '결제날짜',
                dataType: 'DATE',
                targetCellNumber: 3,
                fixedValue: null,
                uploadHeaderId: uploadHeaderDetail4.headerId
            }

            let downloadHeaderDetail5 = {
                headerId: uuidv4(),
                headerName: '판매채널',
                dataType: 'STRING',
                targetCellNumber: -1,
                fixedValue: '스마트스토어',
                uploadHeaderId: uploadHeaderDetail5.headerId
            }

            let downloadHeaderDetail6 = {
                headerId: uuidv4(),
                headerName: '판매스토어',
                dataType: 'STRING',
                targetCellNumber: -1,
                fixedValue: '원하트',
                uploadHeaderId: uploadHeaderDetail6.headerId
            }

            // dto 생성
            let detail1 = [
                uploadHeaderDetail1,
                uploadHeaderDetail2,
                uploadHeaderDetail3,
                uploadHeaderDetail4,
                uploadHeaderDetail5,
                uploadHeaderDetail6
            ]

            let detail2 = [
                downloadHeaderDetail1,
                downloadHeaderDetail2,
                downloadHeaderDetail3,
                downloadHeaderDetail4,
                downloadHeaderDetail5,
                downloadHeaderDetail6
            ]

            let uploadDetail = {
                details: detail1
            }

            let downloadDetail = {
                details: detail2
            }

            let header1 = new ExcelHeader().toJSON();
            header1.uploadHeaderTitle='네이버';
            header1.downloadHeaderTitle = '테일로';
            header1.uploadHeaderDetail = uploadDetail;
            header1.downloadHeaderDetail = downloadDetail;
            header1.startRowNumber = 3;

            console.log(header1);
            
            setExcelHeaderData(header1);
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            uploadExcelFile: async function (e) {
                // 파일을 선택하지 않은 경우
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.append('file', addFiles[0]);
                uploadedFormData.append(
                    "dto",
                    new Blob([JSON.stringify(excelHeaderData)], { type: "application/json" })
                );

                await axios.post("/api/v1/customized-excel/upload", uploadedFormData, config)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomizedExcelData(res.data.data);
                            console.log(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            downloadExcelFile: async function () {
                await  customizedDeliveryReadyNaverDataConnect().downloadCustomizedExcelFile(customizedExcelData)
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                        const link = document.createElement('a');
                        link.href = url;

                        link.setAttribute('download', '커스터마이징_테스트_다운로드.xlsx');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        }
    }

    const __handleEventControl = () => {
        return {
            uploadExcelTitle: function () {
                return {
                    onChangeInputValue: function (e) {
                        e.preventDefault();
                        setUploadExcelTitle(e.target.value);
                    }
                }
            },
            downloadExcelTitle: function () {
                return {
                    onChangeInputValue: function (e) {
                        e.preventDefault();
                        setDownloadExcelTitle(e.target.value);
                    }
                }
            },
            uploadExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().uploadExcelFile(e);
                    }
                }
            },
            downloadExcelData: async function (e) {
                e.preventDefault();

                await __handleDataConnect().downloadExcelFile();
            },
        }
    }

    return (
        <>
            <CustomizedExcelUploadBody
                uploadExcelTitle={uploadExcelTitle}
                downloadExcelTitle={downloadExcelTitle}
                excelHeaderData={excelHeaderData}
            
                __handleEventControl={__handleEventControl}
            ></CustomizedExcelUploadBody>
        </>
    )
}

export default withRouter(CustomizedExcelUploadMain);