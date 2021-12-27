import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Container = styled.div`
    margin-top: 80px;
    margin-bottom: 120px;
    padding: 0 5%;
`;

const BackBtn = styled.button`
    position: fixed;
    top:10px;
    left:10px;
    background: #8e90e3;
    color: white;
    border:none;
    width:52px;
    height: 52px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    transition: 0.4s;
    z-index: 999;
    
    & .back-button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        background:#c6c7ff;
    }
`;

const CreateBtn = styled.button`
    position: fixed;
    bottom:30px;
    right:30px;
    background: #8e90e3;
    color: white;
    border:none;
    width:70px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    z-index: 999;
    transition: 0.4s;
    & .button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        background: #c6c7ff;
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

const BodyWrapper = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }

    .row-start-number-input {
        width: 20%;
    }
`;

const ItemWrapper = styled.div`
    background:white;
    border: 1px solid #5961c788;
    border-radius: 5px;

    padding-bottom: 15px;
`;

const BodyContainer = styled.div`

`;

const ItemContainer = styled.div`
    margin: 10px 0;

    animation: scaleOutToIn 0.8s;
    -moz-animation: scaleOutToIn 0.8s; /* Firefox */
    -webkit-animation: scaleOutToIn 0.8s; /* Safari and Chrome */
    -o-animation: scaleOutToIn 0.8s; /* Opera */
`;

const CommonInputEl = styled.input`
    font-size: 1.2rem;
    border: none;
    width: 50%;
    padding: 10px;
    border-bottom: 1px solid #ced4da;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const KeyGroup = styled.div`
    & .input-group{
        padding: 0 15px;
    }

    @media only screen and (max-width:992px){
        & .input-group{
            padding: 0;
        }
    }
`;

const ItemHeaderWrapper = styled.div`
    border-bottom: 1px solid #5961c788;
    padding:10px;
    overflow: auto;
    
    & .ref-stock-btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

const DataWrapper = styled.div`
    padding: 10px;
    margin: 20px;
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

const DataTitle = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const DataGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
    justify-content: space-between;
    overflow: scroll;

    & .add-cell-btn {
        grid-column: span 3;
    }
`;

const UploadDetailGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
`;

const DownloadDetailGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-content: center;
`;


const CustomDataGroup = styled.div`
    text-align: center;
    width: 95%;
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

const DataInputEl = styled.input`
    border: none;
    border-bottom: 1px solid #ced4da;
    padding: 5px;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const DataSelectBtn = styled.div`
    background-color: #e3e3e3;
`;

const ArrowSpan = styled.div`
    height: 100%;

    /* @media only screen and (max-width:576px){
        transform: rotate(90deg);
    } */
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

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 5px;
    background-color: rgba(122, 123, 218, 0.125);
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const ControlLabel = styled.label`
    font-size: 16px;
    width: 240px;
    padding: 10px;
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
    padding: 10px;
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

// const initialExcelUploadHeader = null;

// const excelUploadHeaderReducer = (state, action) =>{
//     switch(action.type){
//         case 'INIT_DATA':
//             return action.payload;
//         case 'CHANGE_DATA':
//             return {
//                 ...state,
//                 [action.payload.tagName]:action.payload.value
//             }
//         default : return {...state};
//     }
// }

const CustomizedExcelUploadBody = (props) => {
    // const [excelUploadHeader, dispatchExcelUploadHeader] = useReducer(excelUploadHeaderReducer, initialExcelUploadHeader);
    // const [hello, setHello] = useState(null);
    // const [testModalOpen, setTestModalOpen] = useState(false);

    // async function newFunction(){
    //     let data = await getExcelData();
    //     // setHello('hello');
    //     dispatchExcelUploadHeader({
    //         type:'INIT_DATA',
    //         payload:data
    //     })
    // }

    // function onValueChange(e){
    //     dispatchExcelUploadHeader({
    //         type:'CHANGE_DATA',
    //         payload:{
    //             tagName: e.target.name,
    //             value: e.target.value
    //         }
    //     })
    // }

    // function onTestModalOpen(){
    //     setTestModalOpen(true)
    // }

    // function onTestModalClose(){
    //     setTestModalOpen(false)
    // }

    // function onSubmit(e){
    //     e.preventDefault();
    //     props.onSubmit(excelUploadHeader);
    // }

    return (
        <>
           <Container className='container'>
                <UploadBar>
                    <Form>
                        <ControlLabel htmlFor="upload-file-input">엑셀 파일 업로드</ControlLabel>
                        <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e)} />
                    </Form>
                    {/* <Form onSubmit={(e) => props.__handleEventControl().downloadExcelData().submit(e)}> */}
                        {/* <ControlBtn type="submit">엑셀 파일 다운로드</ControlBtn> */}
                        <ControlBtn type="button" onClick={(e) => props.__handleEventControl().downloadExcelData().submit(e)}>엑셀 파일 다운로드</ControlBtn>
                    {/* </Form> */}
                </UploadBar>
                <form onSubmit={(e) => props.__handleEventControl().customizedHeader().submit(e)} >
                    <CreateBtn type='submit' disabled={props.isSubmit}>
                        <NoteAddIcon />
                    </CreateBtn>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>엑셀 변환기</GroupTitle>
                            </ItemHeaderWrapper>
                            <BodyContainer>
                                <BodyWrapper>
                                    <div className="input-group mb-3">
                                        <DataTitle>업로드 엑셀 타이틀</DataTitle>
                                        <CommonInputEl type="text" name='uploadHeaderTitle'
                                            value={props.headerDetail.uploadHeaderTitle} onChange={(e) => props.__handleEventControl().uploadExcelTitle().onChangeInputValue(e)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <DataTitle>다운로드 엑셀 타이틀</DataTitle>
                                        <CommonInputEl type="text" name='downloadHeaderTitle'
                                            value={props.headerDetail.downloadHeaderTitle} onChange={(e) => props.__handleEventControl().downloadExcelTitle().onChangeInputValue(e)}
                                        />
                                    </div>
                                    <div>
                                        <span>데이터 시작 행</span>
                                        <CommonInputEl type="number" name='rowStartNumber' className="row-start-number-input"
                                            value={props.headerDetail.rowStartNumber} onChange={(e) => props.__handleEventControl().downloadExcelTitle().onChangeInputValue(e)}
                                        />
                                    </div>
                                </BodyWrapper>


                                <DataWrapper>
                                    <DataGroup>
                                        <UploadDetailGroup>
                                            <div>
                                                <div type="text">기존 헤더명</div>
                                            </div>
                                            <div>
                                                <div type="text">데이터 타입</div>
                                            </div>
                                            <div>
                                                <div type="text">기존 헤더순서</div>
                                            </div>
                                            {props.headerDetail.uploadHeaderDetail.details?.map((data, uploadDetailIdx) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <DataInputEl type="text" name='headerName' value={data.headerName} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeUploadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <div>
                                                            <DataInputEl type="text" name='dataType' value={data.dataType} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeUploadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <div>
                                                            <DataInputEl type="number" name='cellNumber' value={data.cellNumber} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeUploadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </UploadDetailGroup>
                                        <ArrowSpan className="arrow-img"><ArrowForwardIosIcon /></ArrowSpan>
                                        <DownloadDetailGroup>
                                            <div>
                                                <div type="text">설정 헤더명</div>
                                            </div>
                                            <div>
                                                <div type="text">데이터 타입</div>
                                            </div>
                                            <div>
                                                <div type="text">기존 헤더순서</div>
                                            </div>
                                            <div>
                                                <div type="text">고정값</div>
                                            </div>
                                            <div></div>
                                            {props.headerDetail.downloadHeaderDetail.details?.map((data, downloadDetailIdx) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <DataInputEl type="text" name='headerName' value={data.headerName} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeDownloadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <div>
                                                            <DataInputEl type="text" name='dataType' value={data.dataType} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeDownloadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <div>
                                                            <DataInputEl type="number" name='targetCellNumber' value={data.targetCellNumber} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeDownloadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <div>
                                                            <DataInputEl type="text" name='fixedValue' value={data.fixedValue} onChange={(e) => props.__handleEventControl().customizedHeader().onChangeDownloadExcelInputValue(e, data.headerId)} required></DataInputEl>
                                                        </div>
                                                        <DeleteBtn><RemoveCircleOutlineIcon type="button" fontSize="large" onClick={(e) => props.__handleEventControl().customizedHeader().deleteCustomizedCell(e, data.headerId)} /></DeleteBtn>
                                                    </>
                                                    )
                                                })}
                                        </DownloadDetailGroup>
                                    </DataGroup>

                                    <DataGroup>
                                        <div className="add-cell-btn">
                                            <AddCircleOutlineIcon type="button" fontSize="large"
                                                onClick={(e) => props.__handleEventControl().customizedHeader().addCustomizedCell(e)}
                                            />
                                        </div>
                                    </DataGroup>
                                </DataWrapper>
                            </BodyContainer>
                        </ItemWrapper>
                    </ItemContainer>
                </form>
                
            </Container>
        </>
    )
}

export default CustomizedExcelUploadBody;