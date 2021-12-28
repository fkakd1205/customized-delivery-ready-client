import React, { useReducer, useState } from 'react';
import styled from "styled-components";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Container = styled.div`

`;

const ItemContainer = styled.div`
`;

const ItemWrapper = styled.div`
    background:white;
    /* border: 1px solid #5961c788; */
    border-radius: 5px;
`;

const ItemHeaderWrapper = styled.div`
    border-bottom: 1px solid #5961c788;
    padding:10px;
    overflow: auto;
    display: grid;
    grid-template-columns: 6fr 1fr;
    
    & .ref-stock-btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const DataTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const BodyContainer = styled.div`
    padding: 10px;
`;

const DataWrapper = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    min-height: 300px;
    padding: 16px;
    height: auto;
    background-color: rgba(70, 130, 180, 0.09);

    & .arrow-img {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const CommonInputEl = styled.input`
    font-size: 1.1rem;
    border: none;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ced4da;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const DataInputEl = styled.input`
    /* font-size: 1.2rem; */
    border: none;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ced4da;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const CustomDataGroup = styled.div`
    text-align: center;
    width: 100%;
    padding: 10px;

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        color: #8e90e3;
    }
`;

const SubmitBtn = styled.button`
    border: none;
    border-radius: 50%;
    background-color: #c7cee3ee;
    margin: 10px 45px;
`;

const UploadDataGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 7fr;
    text-align: center;
    align-items: center;

    & .add-cell-btn {
        grid-column: span 3;
    }
`;

const DownloadDataGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: 7fr 1fr;
    text-align: center;
    align-items: center;

    & .add-cell-btn {
        grid-column: span 3;
    }
`;

const DeleteBtn = styled.div`
    color: #ff7979;

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        color: #ffbaba;
    }
`;

const HeaderInfo = styled.div`
    display: grid;
    grid-template-columns: 40% 50%;
    place-content: space-evenly center;
`;

const DataGroup = styled.div`
    display: grid;
    grid-template-columns: 45% 10% 45%;
    place-content: space-evenly center;
`;

const ArrowSpan = styled.div`
    height: 100%;

    /* @media only screen and (max-width:576px){
        transform: rotate(90deg);
    } */
`;

const FormInput = styled.div`
    color: black;
    display: flex;
    background-color: white;
    vertical-align: middle;
`;

const CreateDownloadExcelHeaderComponent = (props) => {
    return (
        <>
            <Container>
                <form onSubmit={(e) => props.downloadExcel().submit(e)}>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>다운로드 엑셀 유형 등록</GroupTitle>
                                <SubmitBtn type="submit"><AddTaskIcon /></SubmitBtn>
                            </ItemHeaderWrapper>
                        </ItemWrapper>
                    </ItemContainer>
                    <BodyContainer>
                        <HeaderInfo className="input-group mb-3">
                            <DataTitle>엑셀 유형 이름</DataTitle>
                            <CommonInputEl type="text" name='storageTitle'
                                value={props.uploadExcelHeader?.storageTitle}
                                onChange={(e) => props.onChangeInputValue(e)}
                                required
                            />
                        </HeaderInfo>
                        <DataWrapper>
                            {props.uploadCustomizedHeaderList?.map((data, idx) => {
                                return (
                                    <React.Fragment key={data.id}>
                                        <DataGroup>
                                            <UploadDataGroup>
                                                <div>{idx + 1}</div>
                                                <FormInput>
                                                    <div style={{ width: '100%' }}>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="header-select-id">Title</InputLabel>
                                                                <Select
                                                                    labelId="header-select-id"
                                                                    id="header-select"
                                                                    label="header-selector"
                                                                    value={data.refUploadHeaderName || ''}
                                                                >
                                                                    {props.selectedUploadHeader?.uploadHeaderDetail.details.map((data2, idx2) => {
                                                                        return (
                                                                            <MenuItem key={'excel_translator_upload_title' + idx2} value={data2.headerName} 
                                                                                onClick={(e) => props.downloadExcel().selectedUploadHeaderName(e, data.id, data2)}
                                                                            >{data2.headerName}</MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </div>
                                                </FormInput>
                                            </UploadDataGroup>
                                            <ArrowSpan className="arrow-img"><ArrowForwardIosIcon /></ArrowSpan>
                                            <DownloadDataGroup>
                                                <DataInputEl type="text" name='uploadHeaderName' placeholder='다운로드 엑셀 항목명' onChange={(e) => props.onChangeUploadInputValue(e, data.id)} required></DataInputEl>
                                                <DeleteBtn><RemoveCircleOutlineIcon type="button" sx={{ fontSize: 30 }} onClick={(e) => props.downloadExcel().deleteCell(e, data.id)} /></DeleteBtn>
                                            </DownloadDataGroup>
                                        </DataGroup>
                                    </React.Fragment>
                                )
                            })}

                            <CustomDataGroup>
                                <AddCircleOutlineIcon type="button" sx={{ fontSize: 30}}
                                    onClick={(e) => props.downloadExcel().addCell(e)}
                                />
                            </CustomDataGroup>
                        </DataWrapper>
                    </BodyContainer>
                </form>
            </Container>
        </>
    ) 
}

export default CreateDownloadExcelHeaderComponent;