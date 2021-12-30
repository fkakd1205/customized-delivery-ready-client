import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExcelTranslatorCommonModal from "./modal/ExcelTranslatorCommonModal";
import CreateUploadExcelHeaderComponent from "./modal/CreateUploadExcelHeaderComponent";
import CreateDownloadExcelHeaderComponent from "./modal/CreateDownloadExcelHeaderComponent";

const Container = styled.div`
    margin-top: 80px;
    margin-bottom: 120px;
    padding: 0 20%;
`;

const DataWrapper = styled.div`
    background:white;
    border: 1px solid #7778a5c7;
    border-radius: 3px;
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding: 3%;
    border-bottom: 1px solid #7778a5c7;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const TranslatorBar = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    padding:15px;
    border-bottom: 1px solid #7778a5c7;
`;

const TitleSelector = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 25% 50% 25%);
    grid-template-rows: 1fr;
    padding: 10px;
    text-align: center;
    align-items: center;
`;

const TranslatorBtnBox = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 3%;
    text-align: center;
    align-items: center;
    background-color: #e4e8f1;
`;

const FormInput = styled.div`
    color: black;
    display: flex;
    vertical-align: middle;
`;

const StorageControlBtn = styled.button`
    background: #a2a9c1;
    color:white;
    border:1px solid #a2a9c1;
    border-radius: 3px;
    margin-left: 10px;
    padding: 5px 7px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const Form = styled.form`
    margin: 10px;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 1.2rem;
    width: 70%;
    padding: 14px;
    margin: 4px;
    color: #444;
    text-align: center;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    transition: opacity 0.1s linear;
    font-weight: 500;

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
    font-size: 1.2rem;
    width: 70%;
    padding: 14px;
    margin: 4px;
    color: #444;
    vertical-align: middle;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: none;
    transition: opacity 0.1s linear;
    font-weight: 500;

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

const initialExcelHeader = null;

const uploadExcelHeaderReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return null;
        default: return {...state}
    }
}

class UploadHeaderDetail {
    constructor() {
        this.id = uuidv4();
        this.headerName = '';
    }

    toJSON() {
        return {
            id: this.id,
            headerName: this.headerName
        }
    }
}

class DownloadHeaderDetail {
    constructor() {
        this.id = uuidv4();
        this.headerName = '';
        this.targetCellNumber = -1;
        this.fixedValue = '';
        this.uploadHeaderId = null;
    }

    toJSON() {
        return {
            id: this.id,
            headerName: this.headerName,
            targetCellNumber: this.targetCellNumber,
            fixedValue: this.fixedValue,
            uploadHeaderId: this.uploadheaderId
        }
    }
}

class UploadExcelHeader {
    constructor() {
        this.id = uuidv4();
        this.uploadHeaderTitle = '';
        this.downloadHeaderTitle = '';
        this.uploadHeaderDetail = {
            details : []
        };
        this.downloadHeaderDetail = {
            details : []
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

const ExcelTranslatorBody = (props) => {
    const [uploadExcelHeader, dispatchUploadExcelHeader] = useReducer(uploadExcelHeaderReducer, initialExcelHeader);

    const [uploadCustomizedHeaderList, setUploadCustomizedHeaderList] = useState([]);
    const [selectedUploadHeader, setSelectedUploadHeader] = useState(null);

    const [createUploadExcelHeaderModalOpen, setCreateUploadExcelHeaderModalOpen] = useState(false);
    const [createDownloadExcelHeaderModalOpen, setCreateDownloadExcelHeaderModalOpen] = useState(false);

    const [fixedValueCheckList, setFixedValueCheckList] = useState([]);

    const onCreateUploadExcelHeaderModalOpen = () => {
        setCreateUploadExcelHeaderModalOpen(true);
        setUploadCustomizedHeaderList([new UploadHeaderDetail().toJSON()]);
    }

    const onCreateUploadExcelHeaderModalClose = () => {
        setCreateUploadExcelHeaderModalOpen(false);
        setUploadCustomizedHeaderList([new UploadHeaderDetail().toJSON()]);
        dispatchUploadExcelHeader({ type:'CLEAR' });
    }

    const onCreateDownloadExcelHeaderModalOpen = () => {
        setCreateDownloadExcelHeaderModalOpen(true);
        setUploadCustomizedHeaderList([new DownloadHeaderDetail().toJSON()]);
    }

    const onCreateDownloadExcelHeaderModalClose = () => {
        setCreateDownloadExcelHeaderModalOpen(false);
        setUploadCustomizedHeaderList([new DownloadHeaderDetail().toJSON()]);
        dispatchUploadExcelHeader({ type:'CLEAR' });
    }

    const onChangeInputValue = (e) => {
        dispatchUploadExcelHeader({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onChangeUploadInputValue = (e, headerId) => {
        onChangeInputValue(e);

        setUploadCustomizedHeaderList(uploadCustomizedHeaderList.map(r => {
            if(r.id === headerId) {
                return {
                    ...r,
                    [e.target.name]: e.target.value
                }    
            }else{
                return r;
            }
        }));
    }

    const uploadExcel = () => {
        return {
            addCell: function (e) {
                e.preventDefault();

                setUploadCustomizedHeaderList(uploadCustomizedHeaderList.concat(new UploadHeaderDetail().toJSON()));
            },
            deleteCell: function (e, headerId) {
                e.preventDefault();

                if(uploadCustomizedHeaderList.length > 1){
                    setUploadCustomizedHeaderList(uploadCustomizedHeaderList.filter(r => r.id !== headerId));
                }
            },
            submit: async function (e) {
                e.preventDefault();

                let excelHeader = new UploadExcelHeader().toJSON();

                excelHeader.uploadHeaderTitle = uploadExcelHeader.storageTitle;
                excelHeader.uploadHeaderDetail.details = uploadCustomizedHeaderList;
                excelHeader.rowStartNumber = uploadExcelHeader.rowStartNumber;

                await props.__handleEventControl().uploadHeader().createOne(excelHeader);
                onCreateUploadExcelHeaderModalClose();
            },
            selectedUploadHeader: async function (e, data) {
                e.preventDefault();

                setSelectedUploadHeader(props.excelTranslatorHeaderList.filter(r => r.id === data.id)[0]);
            }
        }
    }

    const downloadExcel = () => {
        return {
            addCell: function (e) {
                e.preventDefault();
                
                setUploadCustomizedHeaderList(uploadCustomizedHeaderList.concat(new DownloadHeaderDetail().toJSON()));
            },
            deleteCell: function (e, headerId) {
                e.preventDefault();

                if(uploadCustomizedHeaderList.length > 1){
                    setUploadCustomizedHeaderList(uploadCustomizedHeaderList.filter(r => r.id !== headerId));
                }
            },
            submit: async function (e) {
                e.preventDefault();

                let excelHeader = selectedUploadHeader;
                excelHeader.downloadHeaderTitle = uploadExcelHeader.storageTitle;
                excelHeader.downloadHeaderDetail.details = uploadCustomizedHeaderList;
            
                await props.__handleEventControl().uploadHeader().updateOne(excelHeader);

                onCreateDownloadExcelHeaderModalClose();
            },
            selectedUploadHeaderName: function (e, customizedDataId, uploadHeaderDetailData) {
                e.preventDefault();

                setUploadCustomizedHeaderList(uploadCustomizedHeaderList.map(r => {
                    if(r.id === customizedDataId) {
                        // 고정값 체크되지 않은 데이터들만 targetCellNumber을 변경
                        if(!fixedValueCheckList.includes(customizedDataId)){
                            r.targetCellNumber = uploadHeaderDetailData.cellNumber;
                        }
                        r.refUploadHeaderName = uploadHeaderDetailData.headerName;
                        r.uploadHeaderId = uploadHeaderDetailData.id;
                        return r;
                    }else{
                        return r;
                    }
                }))
            },
            isChecked: function (headerId) {
                return fixedValueCheckList.includes(headerId);
            },
            checkOne: function (e, headerId) {
                if (e.target.checked) {
                    setFixedValueCheckList(fixedValueCheckList.concat(headerId));
                    setUploadCustomizedHeaderList(uploadCustomizedHeaderList.map(r => {
                        if(r.id === headerId) {
                            r.targetCellNumber = -1;
                            return r;
                        }else{
                            return r;
                        }
                    }));
                } else {
                    setFixedValueCheckList(fixedValueCheckList.filter(r => r !== headerId));
                }
            },
        }
    }

    return(
        <>
            <Container>
                <DataWrapper>
                    <GroupTitle>엑셀 변환기</GroupTitle>
                    <TranslatorBar>
                        <TitleSelector>
                            <div>업로드 엑셀 양식</div>
                            <FormInput>
                                <div style={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="upload-storage-select-id">Title</InputLabel>
                                            <Select
                                                labelId="upload-storage-select-id"
                                                id="upload-storage-select"
                                                value={selectedUploadHeader?.uploadHeaderTitle || ''}
                                                label="upload-storage-selector"
                                            >
                                                {props.excelTranslatorHeaderList?.map((data, idx) => {
                                                    return (
                                                        <MenuItem key={'excel_translator_upload_title' + idx} value={data.uploadHeaderTitle} onClick={(e) => uploadExcel().selectedUploadHeader(e, data)}>{data.uploadHeaderTitle}</MenuItem>
                                                )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </FormInput>
                            <div>
                                <StorageControlBtn type="button" onClick={() => onCreateUploadExcelHeaderModalOpen()}><AddIcon /></StorageControlBtn>
                                <StorageControlBtn type="button"><EditIcon /></StorageControlBtn>
                            </div>
                        </TitleSelector>

                        <TitleSelector>
                            <div>다운로드 엑셀 양식</div>
                            <FormInput>
                                <div style={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="download-storage-select-id">Title</InputLabel>
                                            <Select
                                                labelId="download-storage-select-id"
                                                id="download-storage-select"
                                                value={selectedUploadHeader?.downloadHeaderTitle || ''}
                                                label="download-storage-selector"
                                            >
                                                <MenuItem value={selectedUploadHeader?.downloadHeaderTitle}
                                                >{selectedUploadHeader?.downloadHeaderTitle}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </FormInput>
                            <div>
                                <StorageControlBtn type="button" onClick={() => onCreateDownloadExcelHeaderModalOpen()}><AddIcon /></StorageControlBtn>
                                <StorageControlBtn type="button"><EditIcon /></StorageControlBtn>
                            </div>
                        </TitleSelector>
                    </TranslatorBar>
                    <TranslatorBtnBox>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input">엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e, selectedUploadHeader)} />
                        </Form>
                        <Form onSubmit={(e) => props.__handleEventControl().downloadExcelFile().submit(e)}>
                            <ControlBtn type="submit">발주서 다운로드</ControlBtn>
                        </Form>
                    </TranslatorBtnBox>
                </DataWrapper>

                {/* 자유형식 엑셀 업로드 */}
                <Form>
                    <ControlLabel htmlFor="upload-file">헤더지정x 엑셀 파일 업로드</ControlLabel>
                    <Input id="upload-file" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData2().submit(e)} />
                </Form>
            </Container>

            {/* Upload Header Modal */}
            <ExcelTranslatorCommonModal
                open={createUploadExcelHeaderModalOpen}
                onClose={() => onCreateUploadExcelHeaderModalClose()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateUploadExcelHeaderComponent
                    uploadExcelHeader={uploadExcelHeader}
                    uploadCustomizedHeaderList={uploadCustomizedHeaderList}
                    uploadExcel={uploadExcel}
                    onChangeInputValue={onChangeInputValue}
                    onChangeUploadInputValue={onChangeUploadInputValue}
                ></CreateUploadExcelHeaderComponent>
            </ExcelTranslatorCommonModal>

            {/* Download Header Modal */}
            <ExcelTranslatorCommonModal
                open={createDownloadExcelHeaderModalOpen}
                onClose={() => onCreateDownloadExcelHeaderModalClose()}
                maxWidth={'md'}
                fullWidth={true}
            >
                <CreateDownloadExcelHeaderComponent
                    selectedUploadHeader={selectedUploadHeader}
                    uploadCustomizedHeaderList={uploadCustomizedHeaderList}
                    downloadExcel={downloadExcel}
                    onChangeInputValue={onChangeInputValue}
                    onChangeUploadInputValue={onChangeUploadInputValue}
                ></CreateDownloadExcelHeaderComponent>
            </ExcelTranslatorCommonModal>
        </>
    )
}

export default ExcelTranslatorBody;