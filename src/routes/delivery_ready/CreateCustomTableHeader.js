import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { withRouter } from 'react-router';

import RefFormModal from "./modal/RefFormModal"; 

const Container = styled.div`
    padding: 10px;
`;

const DataContainer = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(2, 15%);
    row-gap: 10px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const CustomColDiv = styled.div`
    
`;

const RefFormColButton = styled.button`

`;

const Header = styled.div`
    background-color: #efefef;
`;

const CreateCustomTableHeader = (props) => {
    const [customHeader, setCustomHeader] = useState(null);
    const [refFormModalOpen, setRefFormModalOpen] = useState(false);
    const [clickedHeaderId, setClickedHeaderId] = useState(null);

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
            },
            updateCustomTableHeader: async function (data) {
                await axios.post("/api/v1/delivery-ready/customize/header/update/list", data)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            // props.history.replace('/delivery-ready');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : updateCustomTableHeader');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            refForm: function () {
                return {
                    refFormModalOpen: async function (e, headerId) {
                        e.preventDefault();
                        setRefFormModalOpen(true);
                        setClickedHeaderId(headerId);
                    },
                    refFormModalClose: function () {
                        setRefFormModalOpen(false);
                    },
                    changeRefForm: async function (refFormData) {
                        let changedHeader = customHeader.map(r =>
                            (r.id === clickedHeaderId) ?
                                ({
                                    ...r,
                                    refFormId: refFormData.id,
                                    refFormName: refFormData.originColName
                                }) : r
                        );

                        setCustomHeader(changedHeader);
                    }
                }
            },
            customizeHeader: function () {
                return {
                    updateCustomTableHeader: async function (e, customizedHeader) {
                        e.preventDefault();
                        await __handleDataConnect().updateCustomTableHeader(customizedHeader);
                        props.history.replace('/delivery-ready');
                    }
                }
            }
        }
    }
    
    return (
        <>
            <Container>
                <Title>3PL 선택</Title>
                <DataContainer className="container">
                        {/* <CustomColDiv>{customHeader[0].title}</CustomColDiv>
                        <CustomColDiv>네이버 컬럼 선택</CustomColDiv> */}
                {customHeader && customHeader.map((data, headerIdx) => {
                    return (
                        <>
                            <CustomColDiv key={headerIdx}>
                                <span>{data.customColName}</span>
                            </CustomColDiv>
                            <RefFormColButton type="button" onClick={(e) => __handleEventControl().refForm().refFormModalOpen(e, data.id)}>
                                <span>{data.refFormName}</span>
                            </RefFormColButton>
                        </>
                    )
                })}
                </DataContainer>
                <button type="button" onClick={(e) => __handleEventControl().customizeHeader().updateCustomTableHeader(e, customHeader)}>생성</button>
            </Container>
            
            <RefFormModal
                open={refFormModalOpen}

                __handleEventControl={__handleEventControl}
            ></RefFormModal>
        </>
    )
}

export default withRouter(CreateCustomTableHeader);