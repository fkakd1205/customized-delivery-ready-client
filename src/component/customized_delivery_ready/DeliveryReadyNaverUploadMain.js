import {useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

// component
import DeliveryReadyNaverUploadBody from './DeliveryReadyNaverUploadBody';
import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';

const DeliveryReadyNaverUploadMain = (props) => {
    const [excelData, setExcelData] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const [refFormHeader, setRefFormHeader] = useState(null);
    const [originColData, setOriginColData] = useState(null);
    const [customizedDeliveryReadyData, setCustomizedDeliveryReadyData] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().getRefFormData();
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
                uploadedFormData.set('file', addFiles[0]);

                await customizedDeliveryReadyNaverDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                            
                            let originExcelData = res.data.data.map(r => r.deliveryReadyCustomItem.details);
                            setOriginColData(originExcelData);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            },
            storeExcelFile: async function () {
                if(!excelData) {
                    alert('파일을 먼저 업로드 해주세요.');
                    return;
                }

                await customizedDeliveryReadyNaverDataConnect().storeFile(excelData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : storeExcelFile');
                    })
            },
            getRefFormData: async function () {
                await axios.get("/api/v1/delivery-ready/ref-form/list")
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setRefFormHeader(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getRefFormData');
                    })
            },
            downloadCustomizedOrderForm: async function () {
                await axios.post(`/api/v1/delivery-ready/customize/download/tailo`, {
                        responseType: 'blob',
                        withCredentials:true
                    })
            },
            changeCustomizedOrderForm: async function () {
                await axios.post("/api/v1/delivery-ready/customize/view", excelData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomizedDeliveryReadyData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : changeCustomizedOrderForm');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            uploadExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().uploadExcelFile(e);
                    }
                }
            },
            storeExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().storeExcelFile();
                    }
                }
            },
            movePage: function () {
                return {
                    customizedDeliveryReadyView: async function () {
                        props.history.replace('/delivery-ready/customized/view');
                    }
                }
            },
        }
    }

    return (
        <>
            <DeliveryReadyNaverUploadBody
                originColData={originColData}
                refFormHeader={refFormHeader}
                customizedDeliveryReadyData={customizedDeliveryReadyData}

                __handleEventControl={__handleEventControl}
            ></DeliveryReadyNaverUploadBody>
        </>
    )
}

export default withRouter(DeliveryReadyNaverUploadMain);