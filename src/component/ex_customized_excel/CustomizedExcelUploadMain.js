import {useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

import CustomizedExcelUploadBody from './CustomizedExcelUploadBody';
import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';
import { ElevatorSharp } from '@mui/icons-material';

class ExcelHeader {
    constructor() {
        this.id = uuidv4();
        this.uploadHeaderTitle = '';
        this.downloadHeaderTitle = '';
        this.uploadHeaderDetail = {
            details : [new UploadHeaderDetail().toJSON()]
        };
        this.downloadHeaderDetail = {
            details : [new DownloadHeaderDetail(this.uploadHeaderDetail.details[0].headerId).toJSON()]
        };
        this.rowStartNumber = 0;
    }

    toJSON() {
        return {
            id: this.id,
            uploadHeaderTitle: this.uploadHeaderTitle,
            downloadHeaderTitle: this.downloadHeaderTitle,
            uploadHeaderDetail: this.uploadHeaderDetail,
            downloadHeaderDetail: this.downloadHeaderDetail,
            rowStartNumber: this.rowStartNumber
        }
    }
}

class UploadHeaderDetail {
    constructor() {
        this.headerId = uuidv4();
        this.dataType = '';
        this.headerName = '';
        this.cellNumber = -1;
    }

    toJSON() {
        return {
            headerId: this.headerId,
            dataType: this.dataType,
            headerName: this.headerName,
            cellNumber: this.cellNumber
        }
    }
}

class DownloadHeaderDetail {
    constructor(uploadHeaderId) {
        this.headerId = uuidv4();
        this.dataType = '';
        this.headerName = '';
        this.targetCellNumber = -1;
        this.fixedValue = '';
        this.uploadHeaderId = uploadHeaderId
    }

    toJSON() {
        return {
            headerId: this.headerId,
            dataType: this.dataType,
            headerName: this.headerName,
            targetCellNumber: this.targetCellNumber,
            fixedValue: this.fixedValue,
            uploadHeaderId: this.uploadHeaderId
        }
    }
}

const CustomizedExcelUploadMain = () => {
    const [uploadExcelTitle, setUploadExcelTitle] = useState(null);
    const [downloadExcelTitle, setDownloadExcelTitle] = useState(null);
    const [excelHeaderData, setExcelHeaderData] = useState([]);
    const [customizedExcelData, setCustomizedExcelData] = useState(null);
    const [headerDetail, setHeaderDetail] = useState(new ExcelHeader().toJSON());

    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };

    useEffect(() => {
        async function fetchInit() {
            // upload

            // let uploadHeaderDetail1 = {
            //     headerId: uuidv4(),
            //     headerName: '상품명',
            //     dataType: 'STRING',
            //     cellNumber: 0
            // }

            // let uploadHeaderDetail2 = {
            //     headerId: uuidv4(),
            //     headerName: '옵션명',
            //     dataType: 'STRING',
            //     cellNumber: 1
            // }

            // let uploadHeaderDetail3 = {
            //     headerId: uuidv4(),
            //     headerName: '수취인명',
            //     dataType: 'STRING',
            //     cellNumber: 2
            // }

            // let uploadHeaderDetail4 = {
            //     headerId: uuidv4(),
            //     headerName: '결제일',
            //     dataType: 'DATE',
            //     cellNumber: 3
            // }

            // let uploadHeaderDetail5 = {
            //     headerId: uuidv4(),
            //     headerName: '판매채널',
            //     dataType: 'STRING',
            //     cellNumber: 4
            // }

            // // upload파일에 존재하지 않는 헤더를 download할 떄 필요한 경우
            // // uploadDetial6, downloadDetail6
            // let uploadHeaderDetail6 = {
            //     headerId: uuidv4(),
            //     headerName: '',
            //     dataType: 'STRING',
            //     cellNumber: -1
            // }
            
            // // download

            // let downloadHeaderDetail1 = {
            //     headerId: uuidv4(),
            //     headerName: '수취인이름',
            //     dataType: 'STRING',
            //     targetCellNumber: 2,
            //     fixedValue: null,
            //     uploadHeaderId: uploadHeaderDetail3.headerId
            // }

            // let downloadHeaderDetail2 = {
            //     headerId: uuidv4(),
            //     headerName: '상품이름',
            //     dataType: 'STRING',
            //     targetCellNumber: 0,
            //     fixedValue: null,
            //     uploadHeaderId: uploadHeaderDetail1.headerId
            // }

            // let downloadHeaderDetail3 = {
            //     headerId: uuidv4(),
            //     headerName: '옵션이름',
            //     dataType: 'STRING',
            //     targetCellNumber: 1,
            //     fixedValue: null,
            //     uploadHeaderId: uploadHeaderDetail2.headerId
            // }

            // let downloadHeaderDetail4 = {
            //     headerId: uuidv4(),
            //     headerName: '결제날짜',
            //     dataType: 'DATE',
            //     targetCellNumber: 3,
            //     fixedValue: null,
            //     uploadHeaderId: uploadHeaderDetail4.headerId
            // }

            // let downloadHeaderDetail5 = {
            //     headerId: uuidv4(),
            //     headerName: '판매채널',
            //     dataType: 'STRING',
            //     targetCellNumber: -1,
            //     fixedValue: '스마트스토어',
            //     uploadHeaderId: uploadHeaderDetail5.headerId
            // }

            // // upload파일에 존재하지 않는 헤더를 download할 떄 필요한 경우
            // // uploadDetial6, downloadDetail6
            // let downloadHeaderDetail6 = {
            //     headerId: uuidv4(),
            //     headerName: '판매스토어',
            //     dataType: 'STRING',
            //     targetCellNumber: -1,
            //     fixedValue: '원하트',
            //     uploadHeaderId: uploadHeaderDetail6.headerId
            // }

            // // dto 생성
            // let detail1 = [
            //     uploadHeaderDetail1,
            //     uploadHeaderDetail2,
            //     uploadHeaderDetail3,
            //     uploadHeaderDetail4,
            //     uploadHeaderDetail5,
            //     uploadHeaderDetail6
            // ]

            // let detail2 = [
            //     downloadHeaderDetail1,
            //     downloadHeaderDetail2,
            //     downloadHeaderDetail3,
            //     downloadHeaderDetail4,
            //     downloadHeaderDetail5,
            //     downloadHeaderDetail6
            // ]

            // let uploadDetail = {
            //     details: detail1
            // }

            // let downloadDetail = {
            //     details: detail2
            // }

            // // let header1 = new ExcelHeader().toJSON();

            // setHeaderDetail({
            //     ...headerDetail,
            //     uploadHeaderTitle : headerDetail.uploadHeaderTitle,
            //     downloadHeaderTitle : headerDetail.downloadHeaderTitle,
            //     uploadHeaderDetail : uploadDetail,
            //     downloadHeaderDetail : downloadDetail,
            //     rowStartNumber : 3
            // })

            // setHeaderDetail(new ExcelHeader().toJSON());
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
                    new Blob([JSON.stringify(headerDetail)], { type: "application/json" })
                );

                console.log(headerDetail);

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
            }
        }
    }

    const __handleEventControl = () => {
        return {
            uploadExcelTitle: function () {
                return {
                    onChangeInputValue: function (e) {
                        e.preventDefault();
                        setHeaderDetail({
                            ...headerDetail,
                            [e.target.name] : e.target.value
                        })
                    }
                }
            },
            downloadExcelTitle: function () {
                return {
                    onChangeInputValue: function (e) {
                        e.preventDefault();
                        setHeaderDetail({
                            ...headerDetail,
                            [e.target.name] : e.target.value
                        })
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
            downloadExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().downloadExcelFile();
                    }
                }
            },
            customizedHeader: function () {
                return {
                    onChangeUploadExcelInputValue: function (e, dataId) {
                        e.preventDefault();

                        let data = headerDetail.uploadHeaderDetail.details.map(r => {
                            if(r.headerId == dataId) {
                                return {
                                    ...r,
                                    [e.target.name] : e.target.value
                                }
                            }else{
                                return r;
                            }
                        });

                        setHeaderDetail({
                            ...headerDetail,
                            uploadHeaderDetail: {
                                details: data
                            }
                        });
                    },
                    onChangeDownloadExcelInputValue: function (e, dataId) {
                        e.preventDefault();

                        e.preventDefault();

                        let data = headerDetail.downloadHeaderDetail.details.map(r => {
                            if(r.headerId == dataId) {
                                return {
                                    ...r,
                                    [e.target.name] : e.target.value
                                }
                            }else{
                                return r;
                            }
                        });

                        setHeaderDetail({
                            ...headerDetail,
                            downloadHeaderDetail: {
                                details: data
                            }
                        });
                    },
                    onChangeInputValue: function (e) {
                        e.preventDefault();

                        setHeaderDetail({
                            ...headerDetail,
                            [e.target.name] : e.target.value
                        })
                    },
                    addCustomizedCell: function (e) {
                        e.preventDefault();

                        let uploadDetails = headerDetail.uploadHeaderDetail.details;
                        let newUploadDetail = new UploadHeaderDetail().toJSON();
                        uploadDetails.push(newUploadDetail);

                        let downloadDetails = headerDetail.downloadHeaderDetail.details;
                        let newDownloadDetail = new DownloadHeaderDetail(newUploadDetail.headerId).toJSON();
                        downloadDetails.push(newDownloadDetail);

                        // console.log(uploadDetails);

                        setHeaderDetail({
                            ...headerDetail,
                            uploadHeaderDetail : {
                                details : uploadDetails
                            },
                            downloadHeaderDetail : {
                                details : downloadDetails
                            }
                        });
                    },
                    deleteCustomizedCell: function (e, headerId) {
                        e.preventDefault();

                        let deleteDownloadCell = headerDetail.downloadHeaderDetail.details.filter(r => r.headerId == headerId)[0];

                        console.log(deleteDownloadCell);

                        let downloadHeaderDetails = headerDetail.downloadHeaderDetail.details.filter(r => r.headerId !== deleteDownloadCell.headerId);
                        let uploadHeaderDetails = headerDetail.uploadHeaderDetail.details.filter(r => r.headerId !== deleteDownloadCell.uploadHeaderId);

                        console.log(downloadHeaderDetails);
                        console.log(uploadHeaderDetails);
                        if(headerDetail.downloadHeaderDetail.details.length > 1){
                            setHeaderDetail({
                                ...headerDetail,
                                uploadHeaderDetail : {
                                    details : uploadHeaderDetails
                                },
                                downloadHeaderDetail : {
                                    details : downloadHeaderDetails
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            <CustomizedExcelUploadBody
                headerDetail={headerDetail}
                excelHeaderData={excelHeaderData}
            
                __handleEventControl={__handleEventControl}
            ></CustomizedExcelUploadBody>
        </>
    )
}

export default withRouter(CustomizedExcelUploadMain);