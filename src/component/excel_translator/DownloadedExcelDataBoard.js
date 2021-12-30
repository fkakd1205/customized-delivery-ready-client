import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router';
import { propTypes } from "react-bootstrap/esm/Image";

const Container = styled.div`
    padding: 0 2%;
    background-color: #f2f5ff;
    padding-bottom: 20px;
`;

const BoardTitle = styled.div`
    margin: 10px;
    font-size: large;
    color: rgba(000, 102, 153, 0.9);
    display: inline-block;
    width: 100%;
    padding: 10px;


    @media only screen and (max-width:576px){
        font-size: 16px;
    }

    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const DataOptionBox = styled.span`
    @media only screen and (max-width:576px){
        display: block;
    }

    & .unitReflectBtn {
        background-color: #99cccc;
    }

    & .unitReflectCancelBtn {
        background-color: #99b5cc;
    };
`;

const BoardContainer = styled.div`
    background-color: white;
    overflow: auto;
    border-radius: 5px;
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;


const DownloadedExcelDataBoard = (props) => {
    return (
        <>
            <Container>
                <BoardTitle>
                    <span>다운로드 엑셀 헤더</span>
                    <DataOptionBox>
                        {/* <ChangeListBtn type="button" onClick={(e) => props.__handleEventControl().releaseCheckedOrderList().changeListToUnreleaseData(e)}>일괄 출고 취소</ChangeListBtn>
                        <ChangeListBtn type="button" className="unitReflectBtn" onClick={(e) => props.__handleEventControl().deliveryReadyReleaseMemo().open(e)}>재고반영</ChangeListBtn> */}
                    </DataOptionBox>
                </BoardTitle>
                <BoardContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                {props.selectedHeaderTitle?.downloadHeaderDetail.details.map((data, idx) => {
                                    return (
                                        <HeaderTh key={'download_header_idx' + idx} className="fixed-header medium-cell" scope="col">
                                            <span>{data.headerName}</span>
                                        </HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                    </table>
                </BoardContainer>
            </Container>
        </>
    )
}

export default withRouter(DownloadedExcelDataBoard);