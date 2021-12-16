import React from 'react';
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
    padding: 0 10%;
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
    width: 30%;
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

const DataTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const DataGroup = styled.div`
    padding: 10px;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, 40% 5% 40% 5%);
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

const ModifyCustomizedHeaderBody = (props) => {
    return (
        <>
            <BackBtn type='button'
                onClick={() => props.history.goBack()}
            >
                <ArrowBackIcon />
            </BackBtn>
            <Container className='container'>
                <form onSubmit={(e) => props.__handleEventControl().customizedHeader().submit(e)} >
                    <CreateBtn type='submit' disabled={props.isSubmit}>
                        <NoteAddIcon />
                    </CreateBtn>
                    <ItemContainer>
                        <ItemWrapper>
                            <ItemHeaderWrapper>
                                <GroupTitle>발주서 유형 수정</GroupTitle>
                            </ItemHeaderWrapper>
                            <BodyContainer>

                                <BodyWrapper>
                                    <div className="input-group mb-3">
                                        <DataTitle>발주서 이름</DataTitle>
                                        <CommonInputEl type="text" name='storageTitle'
                                            value={props.storageTitleName} onChange={(e) => props.__handleEventControl().storageTitle().onChangeInputValue(e)} 
                                        />
                                    </div>
                                    
                                    <DataWrapper>
                                        {props.customizedHeaderList?.map((data) => {
                                            return (
                                                <React.Fragment key={data.id}>
                                                    <DataGroup>
                                                        <DataSelectBtn type="button" onClick={(e) => props.__handleEventControl().refForm().refFormModalOpen(e, data.id)}>{data.refFormName != null ? data.refFormName : "항목 선택하기"}</DataSelectBtn>
                                                        <ArrowSpan className="arrow-img"><ArrowForwardIosIcon /></ArrowSpan>
                                                        <DataInputEl type="text" name='customized-header' placeholder='지정 항목명' onChange={(e) => props.__handleEventControl().customizedHeader().onChangeInputValue(e, data.id)} required></DataInputEl>
                                                        <DeleteBtn><RemoveCircleOutlineIcon type="button" fontSize="large" onClick={(e) => props.__handleEventControl().customizedHeader().deleteCell(e, data.id)} /></DeleteBtn>
                                                    </DataGroup>
                                                </React.Fragment>
                                            )
                                        })}

                                        <CustomDataGroup>
                                            <AddCircleOutlineIcon type="button" fontSize="large"
                                                onClick={(e) => props.__handleEventControl().customizedHeader().addCell(e)}
                                            />
                                        </CustomDataGroup>
                                    </DataWrapper>
                                </BodyWrapper>
                            </BodyContainer>
                        </ItemWrapper>
                    </ItemContainer>
                </form>
            </Container>
        </>
    )

}

export default withRouter(ModifyCustomizedHeaderBody);