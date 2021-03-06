import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ExcelTranslatorCommonModal from "./modal/ExcelTranslatorCommonModal";
import CreateTranslatorHeaderTitleComponent from "./modal/CreateTranslatorHeaderTitleComponent";
import UploadedExcelDataBoard from "./UploadedExcelDataBoard";
import DownloadedExcelDataBoard from "./DownloadedExcelDataBoard";
import CreateTranslatorUploadHeaderDetailComponent from "./modal/CreateTranslatorUploadHeaderDetailComponent";
import CreateTranslatorDownloadHeaderDetailComponent from "./modal/CreateTranslatorDownloadHeaderDetailComponent";

const Container = styled.div`
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const DataTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;

    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const TitleSelector = styled.div`
    display: grid;
    /* grid-template-columns: 15% 20% 5%; */
    grid-template-columns: 90% 10%;
    grid-template-rows: 1fr;
    padding: 20px 0px;
    text-align: center;
    align-items: center;
`;

const FormInput = styled.div`
    color: black;
    display: flex;
    /* background-color: white; */
    vertical-align: middle;
`;

const TilteBar = styled.div`
    padding: 15px;
    background-color: #c2c9df;
`;

const StorageControlBtn = styled.button`
    background: #a2a9c1;
    color:white;
    border:1px solid #a2a9c1;
    border-radius: 3px;
    margin-left: 10px;
    padding: 10px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const DataContainer = styled.div`
    background-color: #f2f5ff;
`;

const TranslatorBtnBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    align-items: center;
    background-color: #f2f5ff;
    /* padding: 10px; */
`;

const Form = styled.form`
    margin: 10px;
    float: right;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 1rem;
    width: 90%;
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
    font-size: 1rem;
    width: 90%;
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

const ExcelTableGroup = styled.div``;

class ExcelTranslatorHeader {
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

class UploadHeaderDetail {
    constructor() {
        this.id = uuidv4();
        this.cellNumber = -1;
        this.headerName = '';
        this.cellType = '';
    }

    toJSON() {
        return {
            id: this.id,
            cellNumber: this.cellNumber,
            headerName: this.headerName,
            cellType: this.cellType
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

const initialExcelTitle = null;

const excelTitleInfoReducer = (state, action) => {
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

const ExcelTranslatorControlBar = (props) => {
    const [excelTitleInfo, dispatchExcelTitleInfo] = useReducer(excelTitleInfoReducer, initialExcelTitle);
    const [selectedHeaderTitle, setSelectedHeaderTitle] = useState(null);
    const [excelTranslatorTitle, setExcelTranslatorTitle] = useState(new ExcelTranslatorHeader().toJSON());
    const [uploadHeaderDetail, setUploadHeaderDetail] = useState(new UploadHeaderDetail().toJSON());
    const [downloadHeaderDetailList, setDownloadHeaderDetailList] = useState([]);
    const [fixedValueCheckList, setFixedValueCheckList] = useState([]);

    const [createTranslatorHeaderTitleModalOpen, setCreateTranslatorHeaderTitleModalOpen] = useState(false);
    const [createTranslatorUploadHeaderDetailModalOpen, setCreateTranslatorUploadHeaderDetailModalOpen] = useState(false);
    const [createTranslatorDownloadHeaderDetailModalOpen, setCreateTranslatorDownloadHeaderDetailModalOpen] = useState(false);

    const onCreateTranslatorHeaderTitleModalOpen = () => {
        setCreateTranslatorHeaderTitleModalOpen(true);
        setExcelTranslatorTitle(new ExcelTranslatorHeader().toJSON());
    }

    const onCreateUploadExcelHeaderModalClose = () => {
        setCreateTranslatorHeaderTitleModalOpen(false);
    }

    const onCreateTranslatorUploadHeaderDetailModalOpen = () => {
        setCreateTranslatorUploadHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorUploadHeaderDetailModalClose = () => {
        setCreateTranslatorUploadHeaderDetailModalOpen(false);
    }

    const onCreateTranslatorDownloadHeaderDetailModalOpen = () => {
        setCreateTranslatorDownloadHeaderDetailModalOpen(true);
    }

    const onCreateTranslatorDownloadHeaderDetailModalClose = () => {
        setCreateTranslatorDownloadHeaderDetailModalOpen(false);
    }

    const onChangeInputValue = (e) => {
        dispatchExcelTitleInfo({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onChangeDownloadInputValue = (e, headerId) => {
        onChangeInputValue(e);

        setDownloadHeaderDetailList(downloadHeaderDetailList.map(r => {
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

    const excelTranslatorHeader = () => {
        return {
            selectedUploadHeaderName: function (e, data) {
                e.preventDefault();

                // uploadedExcelData??? null??? ??????
                props.resetUploadExcelFile();
                setSelectedHeaderTitle(props.excelTranslatorHeaderList.filter(r => r.id === data.id)[0]);
            },
            submit: async function (e) {
                e.preventDefault();

                // ?????? ????????? ?????? ?????? (????????? ?????????, ???????????? ?????????, ????????? ?????? ???)
                let excelHeader = excelTranslatorTitle;
                excelHeader.uploadHeaderTitle = excelTitleInfo.uploadHeaderTitle;
                excelHeader.downloadHeaderTitle = excelTitleInfo.downloadHeaderTitle;
                excelHeader.rowStartNumber = excelTitleInfo.rowStartNumber;

                await props.createTranslatorHeaderTitle(excelHeader);
                onCreateUploadExcelHeaderModalClose();
            },
            storeUploadedExcelHeaderDetail: async function (e) {
                e.preventDefault();

                // ???????????? header ?????????
                let uploadedHeader = props.uploadedExcelData[0].uploadedData;

                let uploadDetails = uploadedHeader.details.map((r, idx) => {
                    let data = new UploadHeaderDetail().toJSON();
                    data.cellNumber = idx;
                    data.headerName = r.colData;
                    data.cellType = r.cellType;

                    return data;
                })

                let excelHeader = selectedHeaderTitle;
                excelHeader.uploadHeaderDetail.details = uploadDetails;

                await props.createUploadHeaderDetails(excelHeader)
                onCreateUploadExcelHeaderModalClose();
            }
        }
    }

    const excelFile = () => {
        return {
            uploadExcel: function () {
                return {
                    uploadExcelFile: async function (e) {
                        e.preventDefault();
        
                        // ?????? ???????????? ???????????? ?????? ??????
                        if(!selectedHeaderTitle) {
                            alert('?????? ????????? ?????? ??????????????????.');
                            return;
                        }
        
                        // ????????? ???????????? ?????? ??????
                        if(e.target.files.length === 0) return;
        
                        let addFiles = e.target.files;
        
                        var uploadedFormData = new FormData();
                        uploadedFormData.append('file', addFiles[0]);
                        uploadedFormData.append(
                            "dto",
                            new Blob([JSON.stringify(selectedHeaderTitle)], { type: "application/json" })
                        );
        
                        await props.uploadExcelFile(uploadedFormData);
                    }
                }
            },
            downloadExcel: function () {
                return {
                    downloadTranslatedExcelFile: async function (e) {
                        e.preventDefault();

                        await props.downloadTranslatedExcelFile(selectedHeaderTitle.downloadHeaderDetail.details);
                    }
                }
            },
            uploadedExcelForm: function () {
                return {
                    open: function (e) {
                        e.preventDefault();

                        if(!selectedHeaderTitle) {
                            alert('?????? ????????? ?????? ??????????????????.');
                            return;
                        }else if(!props.uploadedExcelData) {
                            alert('??????????????? ????????? ?????? ????????? ?????? ?????????????????????.');
                            return;
                        }
                        
                        onCreateTranslatorUploadHeaderDetailModalOpen();
                    },
                    close: function () {
                        onCreateTranslatorUploadHeaderDetailModalClose()
                    }
                }
            },
            downloadExcelForm: function () {
                return {
                    open: function (e) {
                        e.preventDefault();

                        if(!selectedHeaderTitle) {
                            alert('?????? ????????? ?????? ??????????????????.');
                            return;
                        }
                        
                        // ????????? ?????? ???????????? ?????????
                        if(selectedHeaderTitle.downloadHeaderDetail.details.length > 0) {
                            setDownloadHeaderDetailList(selectedHeaderTitle.downloadHeaderDetail.details);
                        }else {     // ????????? ????????? ???????????? ??????
                            setDownloadHeaderDetailList([new DownloadHeaderDetail().toJSON()]);
                        }
                        onCreateTranslatorDownloadHeaderDetailModalOpen();
                    },
                    close: function () {
                        onCreateTranslatorDownloadHeaderDetailModalClose();
                    },
                    addCell: function (e) {
                        e.preventDefault();

                        setDownloadHeaderDetailList(downloadHeaderDetailList.concat(new DownloadHeaderDetail().toJSON()));
                    },
                    deleteCell: function (e, headerId) {
                        e.preventDefault();
        
                        if(downloadHeaderDetailList.length > 1){
                            setDownloadHeaderDetailList(downloadHeaderDetailList.filter(r => r.id !== headerId));
                        }
                    },
                    createDownloadExcelHeaderDetail: async function (e) {
                        e.preventDefault();
        
                        let excelHeader = selectedHeaderTitle;
                        excelHeader.downloadHeaderDetail.details = downloadHeaderDetailList;
        
                        await props.createDownloadHeaderDetails(excelHeader)
        
                        onCreateTranslatorDownloadHeaderDetailModalClose();
                    },
                    selectedUploadHeaderName: function (e, customizedDataId, downloadHeaderDetailData) {
                        e.preventDefault();
        
                        setDownloadHeaderDetailList(downloadHeaderDetailList.map(r => {
                            if(r.id === customizedDataId) {
                                // ????????? ???????????? ?????? ??????????????? targetCellNumber??? ??????
                                if(!fixedValueCheckList.includes(customizedDataId)){
                                    r.targetCellNumber = downloadHeaderDetailData.cellNumber;
                                }
                                r.refUploadHeaderName = downloadHeaderDetailData.headerName;
                                r.uploadHeaderId = downloadHeaderDetailData.id;
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
                            setDownloadHeaderDetailList(downloadHeaderDetailList.map(r => {
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
                    }
                }
            }
        }
    }

    return (
        <>
            <Container>
                <DataContainer>
                    <TranslatorBtnBox>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input">?????? ?????? ?????????</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => excelFile().uploadExcel().uploadExcelFile(e)} />
                        </Form>
                        <Form onSubmit={(e) => excelFile().downloadExcel().downloadTranslatedExcelFile(e)}>
                            <ControlBtn type="submit">????????? ????????????</ControlBtn>
                        </Form>
                        <TitleSelector>
                            <FormInput>
                                <div style={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="storage-title-select-id">?????? ?????? ??????</InputLabel>
                                            <Select
                                                labelId="storage-title-select-id"
                                                id="storage-title-select"
                                                value={selectedHeaderTitle?.uploadHeaderTitle + ' > ' + selectedHeaderTitle?.downloadHeaderTitle || ''}
                                                label="storage-title-selector"
                                                defaultValue=''
                                            >
                                                {props.excelTranslatorHeaderList?.map((data, idx) => {
                                                    return (
                                                        <MenuItem key={'excel_translator_title' + idx} value={data.uploadHeaderTitle + ' > ' + data.downloadHeaderTitle} onClick={(e) => excelTranslatorHeader().selectedUploadHeaderName(e, data)}>{data.uploadHeaderTitle + ' > ' + data.downloadHeaderTitle}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </FormInput>
                            <div>
                                <StorageControlBtn type="button" onClick={() => onCreateTranslatorHeaderTitleModalOpen()}><AddIcon /></StorageControlBtn>
                            </div>
                        </TitleSelector>
                    </TranslatorBtnBox>
                </DataContainer>
            </Container>

            {/* ?????? ????????? ?????? ??? ????????? ?????? */}
            <UploadedExcelDataBoard
                selectedHeaderTitle={selectedHeaderTitle}
                uploadedExcelData={props.uploadedExcelData}
                excelFormControl={(e) => excelFile().uploadedExcelForm(e)}
            ></UploadedExcelDataBoard>

            {/* ?????? ???????????? ?????? ?????? */}
            <DownloadedExcelDataBoard
                selectedHeaderTitle={selectedHeaderTitle}
                excelFormControl={(e) => excelFile().downloadExcelForm(e)}
            ></DownloadedExcelDataBoard>

            {/* Create Header Title Modal */}
            <ExcelTranslatorCommonModal
                open={createTranslatorHeaderTitleModalOpen}
                onClose={() => onCreateUploadExcelHeaderModalClose()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateTranslatorHeaderTitleComponent
                    excelTitleInfo={excelTitleInfo}
                    onChangeInputValue={onChangeInputValue}
                    excelTranslatorHeaderControl={excelTranslatorHeader}
                ></CreateTranslatorHeaderTitleComponent>
            </ExcelTranslatorCommonModal>

            {/* Create Upload Header Form Check Modal */}
            <ExcelTranslatorCommonModal
                open={createTranslatorUploadHeaderDetailModalOpen}
                onClose={() => excelFile().uploadedExcelForm().close()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateTranslatorUploadHeaderDetailComponent
                    excelTitleInfo={excelTitleInfo}
                    excelTranslatorHeaderControl={excelTranslatorHeader}
                    excelFormControl={excelFile().uploadedExcelForm}
                    uploadedExcelDataHeader={props.uploadedExcelData}
                ></CreateTranslatorUploadHeaderDetailComponent>
            </ExcelTranslatorCommonModal>

            {/* Create Download Header Modal */}
            <ExcelTranslatorCommonModal
                open={createTranslatorDownloadHeaderDetailModalOpen}
                onClose={() => excelFile().downloadExcelForm().close()}
                maxWidth={'md'}
                fullWidth={true}
            >
                <CreateTranslatorDownloadHeaderDetailComponent
                    excelTitleInfo={excelTitleInfo}
                    selectedHeaderTitle={selectedHeaderTitle}
                    downloadHeaderDetailList={downloadHeaderDetailList}
                    excelTranslatorHeaderControl={excelTranslatorHeader}
                    excelFormControl={excelFile().downloadExcelForm}
                    onChangeInputValue={onChangeInputValue}
                    onChangeDownloadInputValue={onChangeDownloadInputValue}
                ></CreateTranslatorDownloadHeaderDetailComponent>
            </ExcelTranslatorCommonModal>
            
        </>
    )
}

export default ExcelTranslatorControlBar;