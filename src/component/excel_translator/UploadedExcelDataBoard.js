import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router';
import { propTypes } from "react-bootstrap/esm/Image";
import ExcelTranslatorCommonModal from "./modal/ExcelTranslatorCommonModal";
import moment from "moment";

const Container = styled.div`
    padding: 0 2%;
    background-color: #f2f5ff;
`;

const BoardTitle = styled.div`
    font-size: large;
    color: rgba(000, 102, 153, 0.9);
    display: grid;
    grid-template-columns: 90% 10%;
    align-items: center;
    padding: 10px;

    @media only screen and (max-width:576px){
        font-size: 16px;
    }

    @media only screen and (max-width:320px){
        font-size: 14px;
    }
`;

const DataOptionBox = styled.span`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 10px;
`;

const BoardContainer = styled.div`
    min-height: 40vh;
    max-height: 40px;
    background-color: white;
    overflow: auto;
    border-radius: 5px;

    & .fixed-header {
        position: sticky;
        top: -1px;
        background: #f1f1f1;
        z-index:10;
        padding: 2px;
    }

    & .large-cell {
        width: 300px;
    }

    & .xlarge-cell {
        width: 500px;
    }
`;

const HeaderTh = styled.th`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
`;

const BodyTr = styled.tr`
    border-bottom: 1px solid #a7a7a740;
`;

const BodyTd = styled.td`
    vertical-align: middle !important;
    text-align: center;
    width: 150px;
    border-right: 1px solid #a7a7a720;
`;

const StoreBtn = styled.button`
    padding:2px 4px;
    background: rgb(179 199 219);
    color:white;
    border:1px solid rgb(179 199 219);
    border-radius: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const UploadedExcelDataBoard = (props) => {
    // 헤더 데이터
    let uploadedExcelHeaderData = props.uploadedExcelData !== null ? props.uploadedExcelData[0].uploadedData.details : null;

    // 선택된 헤더의 업로드 headerDetails가 설정되어있다면 colData 지정.
    if(props.selectedHeaderTitle?.uploadHeaderDetail.details.length) {
        uploadedExcelHeaderData = props.selectedHeaderTitle.uploadHeaderDetail.details;
        uploadedExcelHeaderData = uploadedExcelHeaderData.map(r => {
            return {
                ...r,
                colData: r.headerName
            }
        });
    }

    // 헤더 데이터를 제외한 데이터
    let uploadedExcelData = props.uploadedExcelData?.filter((r, idx) => idx !== 0);

    return (
        <>
            <Container>
                <BoardTitle>
                    <span>업로드 엑셀 헤더 및 데이터</span>
                    <DataOptionBox>
                        <StoreBtn type="button" onClick={(e) => props.excelFormControl().open(e)}>양식 저장</StoreBtn>
                    </DataOptionBox>
                </BoardTitle>
                <BoardContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                {uploadedExcelHeaderData?.map((data, idx) => {
                                    return (
                                        <HeaderTh key={'upload_header_idx' + idx} className="fixed-header xlarge-cell" scope="col">
                                            <span>{data.colData}</span>
                                        </HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {uploadedExcelData?.map((data, idx) => {
                                return (
                                    <BodyTr
                                        key={'upload_exel_data_idx' + idx}
                                    >
                                        {data.uploadedData.details.map((detailData, detailIdx) => {
                                            return (
                                            <BodyTd key={'upload_excel_data_detail_idx' + detailIdx} className="col">
                                                <span>{detailData.cellType === 'Date' ? moment(detailData.colData).format("YY/MM/DD HH:mm:ss") : detailData.colData}</span>
                                            </BodyTd>
                                            )
                                        })}
                                    </BodyTr>
                                )
                            })}
                        </tbody>
                    </table>
                </BoardContainer>
            </Container>
        </>
    )
}

export default withRouter(UploadedExcelDataBoard);