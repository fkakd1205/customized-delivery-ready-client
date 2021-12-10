import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import axios from 'axios';

const Container = styled.div`
`;

const BodyWrapper = styled.div`
    padding:0 10px;

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

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const DataContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
`;

const RefFormModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    const [refFormData, setRefFormData] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchRefForm();
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchRefForm: async function () {
                await axios.get("/api/v1/delivery-ready/ref-form/list")
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setRefFormData(res.data.data);
                            console.log(res.data.data);
                        }
                    })
            }
        }
    }

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().refForm().refFormModalClose()}
            >
                <Container>
                    <form 
                    // onSubmit={(e) => props.__handleEventControl().release().submitAddData(e)}
                    >
                        <BodyWrapper>
                            <GroupTitle>
                                커스터마이징 항목 선택
                            </GroupTitle>
                        </BodyWrapper>
                        <BodyWrapper>
                            <DataContainer>
                                {refFormData && refFormData.map((data, idx) => {
                                    return(
                                        <div key={'ref_form_data' + idx}>
                                            <button type="button" onClick={(e) => props.__handleEventControl().refForm().changeRefForm(data)}>{data.originColName}</button>
                                        </div>
                                    )
                                })}
                            </DataContainer>
                        </BodyWrapper>
                    </form>
                </Container>
            </Dialog>
        </>
    )
}

export default RefFormModal;
