import styled from 'styled-components';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { isCompositeComponent } from 'react-dom/test-utils';

import CustomizedDeliveryReadyDataView from './CustomizedDeliveryReadyDataView';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
    width: 10000px;
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, 300px);
    /* flex-wrap: wrap; */
    border-radius: 5px;
    background-color: rgba(122, 123, 218, 0.125);
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    margin-right: 20px;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    width: 240px;
    padding: 6px;
    align-items: center;
    margin: 4px;
    color: #444;
    text-align: center;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const ControlBtn = styled.button`
    font-size: 16px;
    width: 240px;
    padding: 6px;
    margin: 4px;
    color: #444;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: none;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 100%;
    }

    @media only screen and (max-width:576px){
        width: 100%;
        font-size: 12px;
    }
`;

const Input = styled.input`
    font-size: 20px;
    width: 100%;
    display: none;
`;

const TableContainer = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 12px;
    
    & .fiexed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #efefef80;
`;

const PageControlBtn = styled.button`
    display: inline;
    margin-left: auto;
    font-size: 14px;
    color: #555;
    vertical-align: middle;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: rgba(122, 123, 218);
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 12px;
    }
`;

const DeliveryReadyUpload = (props) => {
    const [excelData, setExcelData] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const [refFormHeader, setRefFormHeader] = useState(null);
    const [originColData, setOriginColData] = useState(null);
    const [customizedDeliveryReadyData, setCustomizedDeliveryReadyData] = useState(null);

    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };

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
                if (e.target.files.length === 0) return;

                let addFiles = e.target.files;

                for (let i = 0; i < addFiles.length; i++) {
                    formData.append('file', addFiles[i]);
                }

                setFormData(formData);

                await axios.post("/api/v1/delivery-ready/customize/upload", formData, config)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                            
                            let originExcelData = res.data.data.map(r => r.deliveryReadyCustomItem.details);
                            setOriginColData(originExcelData);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : uploadExcelFile');
                    })
            },
            storeExcelFile: async function (e) {
                await axios.post("/api/v1/delivery-ready/customize/store", excelData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            console.log("formData");
                            // props.history.replace('/delivery-ready-view');
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
                        await __handleDataConnect().storeExcelFile(e);
                    }
                }
            },
            downloadCustomizedOrderForm: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().downloadCustomizedOrderForm(e);
                    }
                }
            },
            changeCustomizedOrderForm: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().changeCustomizedOrderForm();
                    }
                }
            }
            
        }
    }

    return (
        <>
            <Container className="mt-3">
                <UploadBar>
                    <Form>
                        <ControlLabel htmlFor="upload-file-input"><b>네이버</b> 배송준비 엑셀 파일 업로드</ControlLabel>
                        <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => __handleEventControl().uploadExcelData().submit(e)} />
                    </Form>
                    <Form onSubmit={(e) => __handleEventControl().storeExcelData().submit(e)}>
                        <ControlBtn type="submit"><b>네이버</b> 배송준비 엑셀 파일 저장</ControlBtn>
                    </Form>
                    <Form onSubmit={(e) => __handleEventControl().changeCustomizedOrderForm().submit(e)}>
                        <ControlBtn type="submit"><b>테일로</b> 발주서 양식으로 변환</ControlBtn>
                    </Form>
                </UploadBar>
                <TableContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                {refFormHeader?.map((data, index) => {
                                    return(
                                        <HeaderTh key={'refFormIdx' + index} className="fiexed-header large-cell" scope="col">{data.originColName}</HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {originColData?.map((data, index1) => {
                                return(
                                <BodyTr>
                                    {data.map((data2, index2) => {       
                                        return(
                                            <BodyTd key={'origin_data' + index1 + '_idx' + index2} className="col">{data2.origin_col_data}</BodyTd>
                                        )
                                    })}
                                </BodyTr>
                            )})}
                        </tbody>
                    </table>
                </TableContainer>
            </Container>

            <CustomizedDeliveryReadyDataView
                customizedDeliveryReadyData={customizedDeliveryReadyData}
            ></CustomizedDeliveryReadyDataView>
        </>
    );
}

export default DeliveryReadyUpload;