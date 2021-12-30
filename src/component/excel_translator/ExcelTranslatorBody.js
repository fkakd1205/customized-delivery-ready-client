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
import CreateTranslatorHeaderDetailComponent from "./modal/CreateTranslatorHeaderDetailComponent";


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
    grid-template-columns: 15% 20% 5%;
    grid-template-rows: 1fr;
    padding: 20px 0px;
    text-align: center;
    align-items: center;
`;


const FormInput = styled.div`
    color: black;
    display: flex;
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
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    align-items: center;
    background-color: #f2f5ff;
    /* padding: 10px; */
`;

const Form = styled.form`
    margin: 10px;

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

const ExcelTranslatorBody = (props) => {
    const [excelTitleInfo, dispatchExcelTitleInfo] = useReducer(excelTitleInfoReducer, initialExcelTitle);
    const [selectedHeaderTitle, setSelectedHeaderTitle] = useState(null);
    const [excelTranslatorTitle, setExcelTranslatorTitle] = useState(new ExcelTranslatorHeader().toJSON());
    const [uploadHeaderDetail, setUploadHeaderDetail] = useState(new UploadHeaderDetail().toJSON());

    const [createTranslatorHeaderTitleModalOpen, setCreateTranslatorHeaderTitleModalOpen] = useState(false);
    const [createTranslatorHeaderDetailModalOpen, setCreateTranslatorHeaderDetailModalOpen] = useState(false);

    const onCreateTranslatorHeaderTitleModalOpen = () => {
        setCreateTranslatorHeaderTitleModalOpen(true);
    }

    const onCreateUploadExcelHeaderModalClose = () => {
        setCreateTranslatorHeaderTitleModalOpen(false);
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

    const excelTranslatorHeader = () => {
        return {
            selectedUploadHeaderName: function (e, data) {
                e.preventDefault();

                setSelectedHeaderTitle(props.excelTranslatorHeaderList.filter(r => r.id === data.id)[0]);
            },
            submit: async function (e) {
                e.preventDefault();

                // 엑셀 타이틀 정보 설정
                let excelHeader = excelTranslatorTitle;
                excelHeader.uploadHeaderTitle = excelTitleInfo.uploadHeaderTitle;
                excelHeader.downloadHeaderTitle = excelTitleInfo.downloadHeaderTitle;
                excelHeader.rowStartNumber = excelTitleInfo.rowStartNumber;

                await props.createTranslatorHeaderTitle(excelHeader);
                onCreateUploadExcelHeaderModalClose();
            },
            storeExcelForm: async function (e) {
                e.preventDefault();

                // 업로드된 header 데이터
                let uploadedHeader = props.uploadedExcelData[0].uploadedData;

                let data = uploadedHeader.details.map((r, idx) => {
                    let data2 = new UploadHeaderDetail().toJSON();
                    data2.cellNumber = idx;
                    data2.headerName = r.colData;
                    data2.cellType = r.cellType;

                    return data2;
                })

                let excelHeader = excelTranslatorTitle;
                excelHeader.uploadHeaderDetail.details = data;

                await props.createUploadHeaderDetails(excelHeader)

            }
        }
    }

    const excelFile = () => {
        return {
            uploadExcel: function () {
                return {
                    uploadExcelFile: async function (e) {
                        e.preventDefault();
        
                        // 헤더 타이틀을 선택하지 않은 경우
                        if(!selectedHeaderTitle) {
                            alert('헤더 형식을 먼저 선택해주세요.');
                            return;
                        }
        
                        // 파일을 선택하지 않은 경우
                        if(e.target.files.length === 0) return;
        
                        let addFiles = e.target.files;
        
                        var uploadedFormData = new FormData();
                        uploadedFormData.append('file', addFiles[0]);
        
                        await props.uploadExcelFile(uploadedFormData);
                    }
                }
            },
            uploadedExcelForm: function () {
                return {
                    open: function (e) {
                        e.preventDefault();

                        if(!selectedHeaderTitle) {
                            alert('헤더 형식을 먼저 선택해주세요.');
                            return;
                        }else if(!props.uploadedExcelData) {
                            alert('저장하려는 양식의 엑셀 파일을 먼저 업로드해주세요.');
                            return;
                        }
                        
                        setCreateTranslatorHeaderDetailModalOpen(true);
                    },
                    close: function () {
                        setCreateTranslatorHeaderDetailModalOpen(false);
                    }
                }
            }
        }
    }

    return (
        <>
            <Container>
                <TilteBar>
                    <GroupTitle>엑셀 변환기</GroupTitle>
                </TilteBar>
                <DataContainer>
                    <TitleSelector>
                        <DataTitle>엑셀 형식 선택</DataTitle>
                        <FormInput>
                            <div style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="storage-title-select-id">엑셀 형식 선택</InputLabel>
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

                    <TranslatorBtnBox>
                        <Form>
                            <ControlLabel htmlFor="upload-file-input">엑셀 파일 업로드</ControlLabel>
                            <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => excelFile().uploadExcel().uploadExcelFile(e)} />
                        </Form>
                        <Form onSubmit={(e) => props.__handleEventControl().downloadExcelFile().submit(e)}>
                            <ControlBtn type="submit">발주서 다운로드</ControlBtn>
                        </Form>
                    </TranslatorBtnBox>
                </DataContainer>
            </Container>

            <UploadedExcelDataBoard
                uploadedExcelData={props.uploadedExcelData}
                excelFormControl={(e) => excelFile().uploadedExcelForm(e)}
            ></UploadedExcelDataBoard>

            <DownloadedExcelDataBoard
                selectedHeaderTitle={selectedHeaderTitle}
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

            {/* Create Header Form Check Modal */}
            <ExcelTranslatorCommonModal
                open={createTranslatorHeaderDetailModalOpen}
                onClose={() => excelFile().uploadedExcelForm().close()}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <CreateTranslatorHeaderDetailComponent
                    excelTitleInfo={excelTitleInfo}
                    excelTranslatorHeaderControl={excelTranslatorHeader}
                    excelFormControl={excelFile().uploadedExcelForm}
                    uploadedExcelDataHeader={props.uploadedExcelData}
                ></CreateTranslatorHeaderDetailComponent>
            </ExcelTranslatorCommonModal>
        </>
    )
}

export default ExcelTranslatorBody;