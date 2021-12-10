import styled from 'styled-components';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { isCompositeComponent } from 'react-dom/test-utils';

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 100px;
    width: 10000px;
`;

const TableContainer = styled.div`
    height: 80vh;
	overflow: auto;
    font-size: 12px;
    
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

const CustomizedDeliveryReadyDataView = (props) => {
    const [customHeader, setCustomHeader] = useState(null);
    
    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().getAllCustomTableHeader();
        }

        fetchInit();
    }, []);
    
    const __handleDataConnect = () => {
        return {
            getAllCustomTableHeader : async function () {
                await axios.get("/api/v1/delivery-ready/customize/header/list")
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomHeader(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getAllCustomTableHeader');
                    })
            }
        }
    }

    return (
        <>
            <Container>
                <TableContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                {customHeader?.map((data, index) => {
                                    return (
                                        <HeaderTh key={'customHeaderIdx' + index} className="fiexed-header large-cell" scope="col">{data.customColName}</HeaderTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {props.customizedDeliveryReadyData?.map((data, index1) => {
                                return(
                                <BodyTr>
                                    {data.customizedDeliveryReadyItem.map((data2, index2) => {       
                                        return(
                                            <BodyTd key={'custom_data' + index1 + '_idx' + index2} className="col">{data2.custom_col_data}</BodyTd>
                                        )
                                    })}
                                </BodyTr>
                            )})}
                        </tbody>
                    </table>
                </TableContainer>
            </Container>
        </>
    )
}

export default CustomizedDeliveryReadyDataView;