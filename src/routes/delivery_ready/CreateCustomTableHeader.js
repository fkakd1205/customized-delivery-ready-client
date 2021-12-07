import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
    padding: 10px;
`;

const DataContainer = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(2, 10%);
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const CustomColDiv = styled.div`
    
`;

const CreateCustomTableHeader = (props) => {
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

    const __handleEventControl = () => {
        return {
        }
    }
    
    return (
        <>
            <Container>
                <Title>3PL 선택</Title>
                <DataContainer className="container">
                {customHeader && customHeader.map((data, headerIdx) => {
                    return (
                        <>
                            <CustomColDiv key={headerIdx}>
                                <span>{data.customColName}</span>
                            </CustomColDiv>
                        </>
                    )
                })}
                </DataContainer>
            </Container>
        </>
    )
}

export default CreateCustomTableHeader;