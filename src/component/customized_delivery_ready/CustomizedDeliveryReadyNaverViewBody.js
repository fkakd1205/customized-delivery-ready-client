import styled from 'styled-components';
import { withRouter } from 'react-router';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
    background-color: rgba(122, 123, 218, 0.125);
`;

const UploadBar = styled.div`
    color: white;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-radius: 5px;
    margin-bottom: 5px;
`;

const Form = styled.form`
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const DownloadForm = styled.form`
    margin: 10px;
    float: right;

    @media only screen and (max-width:576px){
        width: 100%;
    }
`;

const FormTitle = styled.span`
    color: black;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;

const FormInput = styled.div`
    color: black;
    display: flex;
    vertical-align: middle;
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
    margin: 5px;
    border: 1px solid transparent;
    padding: 10px;
    color: white;
    float: right;
    width: 240px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    vertical-align: middle;
    background-color: rgb(102 117 163 / 88%);
    transition: opacity 0.1s linear 0s;
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
    background: #fafaff;
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

const StorageControlBtn = styled.button`
    background: #a2a9c1;
    color:white;
    border:1px solid #a2a9c1;
    border-radius: 3px;
    margin-left: 5px;

    @media only screen and (max-width:576px ){
        padding: 0;
    }
`;

const CustomizedDeliveryReadyNaverViewBody = (props) => {
    return (
        <>
            <Container className="mt-3">
                <UploadBar>
                    <Form>
                        <FormTitle>발주서 유형 선택</FormTitle>
                        <FormInput>
                            <Box sx={{ minWidth: 200, maxWidth: 300 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="storage-select-id">Title</InputLabel>
                                    <Select
                                        labelId="storage-select-id"
                                        id="storage-select"
                                        value={props.selectedCustomTitle?.title || ''}
                                        label="storage-selector"
                                    >
                                        {props.customHeaderTitle?.map((data, idx) => {
                                            return(
                                                <MenuItem key={'custom_header_title_idx' + idx} value={data.title} onClick={(e) => props.__handleEventControl().customizedHeader().changeCustomTableHeader(e, data)}>{data.title}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                            <StorageControlBtn type="button" onClick={(e) => props.__handleEventControl().customizedHeader().moveAddPage(e)}><AddIcon /></StorageControlBtn>
                            <StorageControlBtn type="button" onClick={(e) => props.__handleEventControl().customizedHeader().moveEditPage(e)}><EditIcon /></StorageControlBtn>
                        </FormInput>
                    </Form>
                    <DownloadForm onSubmit={(e) => props.__handleEventControl().storeExcelData().submit(e)}>
                        <ControlBtn type="submit">발주서 다운로드</ControlBtn>
                    </DownloadForm>
                    {/* <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().customizedDeliveryReadyView()}>배송준비 업로드 <KeyboardArrowRightIcon /></PageControlBtn> */}
                </UploadBar>
                <TableContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed', width: '0px' }}>
                        <thead>
                            <tr>
                                {props.selectedCustomHeader?.map((data, index) => {
                                    return (
                                        <HeaderTh key={'custom_header' + index} className="fiexed-header large-cell" scope="col">{data.customColName}</HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {props.customizedDetails?.map((data, index1) => {     
                                return(
                                    <BodyTr key={`custom_data` + index1}>
                                        {data.details?.map((data2, index2) => {
                                            return(
                                                    <BodyTd key={'custom_data' + index1 + '_details' + index2} className="col large-cell">{data2.custom_col_data != null ? data2.custom_col_data : ""}</BodyTd>
                                            )
                                        })}
                                    </BodyTr>
                                )
                            })}  
                        </tbody>
                    </table>
                </TableContainer>
            </Container>
        </>
    )
}

export default withRouter(CustomizedDeliveryReadyNaverViewBody);