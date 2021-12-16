import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import axios from 'axios';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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

const RefFormSelectModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().refForm().refFormModalClose()}
            >
                <Container>
                    <form>
                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                            <GroupTitle>
                                커스터마이징 항목 선택
                            </GroupTitle>
                        </BodyWrapper>
                        <BodyWrapper>
                            <DataContainer>
                                {props.refFormData?.map((data, idx) => {
                                    return (
                                        <ListItem key={'ref_form_data1_' + idx} component="div" disablePadding>
                                            <ListItemButton key={'ref_form_data2_' + idx} style={{hover: 'red'}}>
                                                <ListItemText key={'ref_form_data3_' + idx} primary={data.originColName} onClick={(e) => props.__handleEventControl().refForm().selectRefForm(data)}/>
                                            </ListItemButton>
                                        </ListItem>
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

export default RefFormSelectModal;