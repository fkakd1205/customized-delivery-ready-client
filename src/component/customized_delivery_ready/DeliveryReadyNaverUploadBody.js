import styled from 'styled-components';
import { withRouter } from 'react-router';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
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
    float: right;
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

const TableContainer = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 14px;
    
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

const DeliveryReadyNaverUploadBody = (props) => {
    return (
        <>
            <Container className="mt-3">
                <UploadBar>
                    <Form>
                        <ControlLabel htmlFor="upload-file-input"><b>네이버</b> 배송준비 엑셀 파일 업로드</ControlLabel>
                        <Input id="upload-file-input" type="file" accept=".xls,.xlsx" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().uploadExcelData().submit(e)} />
                    </Form>
                    <Form onSubmit={(e) => props.__handleEventControl().storeExcelData().submit(e)}>
                        <ControlBtn type="submit"><b>네이버</b> 배송준비 엑셀 파일 저장</ControlBtn>
                    </Form>
                    <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().customizedDeliveryReadyView()}>발주서 다운로드 <KeyboardArrowRightIcon /></PageControlBtn>
                </UploadBar>
                <TableContainer>
                    <table className="table table-sm" style={{tableLayout: 'fixed', width: '0px'}}>
                        <thead>
                            <tr>
                                {props.refFormHeader?.map((data, index) => {
                                    return(
                                        <HeaderTh key={'refFormIdx' + index} className="fiexed-header large-cell" scope="col">{data.originColName}</HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {props.originColData?.map((data, index1) => {
                                return(
                                <BodyTr key={'subitem' + index1}>
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
        </>
    );
}

export default withRouter(DeliveryReadyNaverUploadBody);