import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import CommonModal from "./CommonModal";
import UpdateTestModalComponent from "./UpdateTestModalComponent";

const Container = styled.div`

`;

const initialUpdateTest = null;

const updateTestReducer = (state, action) =>{
    switch(action.type){
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }
        case 'CLEAR':
            return null;
        default : return {...state}
    }
}

const TestBody = (props) =>{
    const [updateTest, dispatchUpdateTest] = useReducer(updateTestReducer, initialUpdateTest);

    const [testModalOpen, setTestModalOpen] = useState(false);

    useEffect(()=>{
        async function fetchUpdateTest(){
            if(!props.test){
                return;
            }

            dispatchUpdateTest({
                type:'INIT_DATA',
                payload:props.test
            })
        }
        fetchUpdateTest();
    },[props.test])

    const onTestModalOpen = () =>{
        setTestModalOpen(true);
    }

    const onTestModalClose = () =>{
        setTestModalOpen(false);
        dispatchUpdateTest({
            type:'CLEAR'
        })
    }

    const onTestValueChange = (e) =>{
        dispatchUpdateTest({
            type:'SET_DATA',
            payload:{
                name:e.target.name,
                value:e.target.value
            }
        })
    }

    const onSubmitUpdateTest = (e) =>{
        e.preventDefault();
        props.onSubmitUpdateTest(updateTest);
        onTestModalClose();
    }

    return (
        <>
            <Container>
                <button type='button' onClick={()=>onTestModalOpen()}>testModalOpen</button>
            </Container>
            {/* Modal */}
            <CommonModal
                open={testModalOpen}
                onClose={()=>onTestModalClose()}
                // maxWidth={'xs'}
                // fullWidth={true}
            >
                <UpdateTestModalComponent
                    test={updateTest}
                    onValueChange={(e)=>onTestValueChange(e)}
                    onSubmit={(e)=>onSubmitUpdateTest(e)}
                ></UpdateTestModalComponent>
            </CommonModal>
            {/* <CommonModal
                open={test2ModalOpen}
                onClose={()=>onTest2ModalClose()}
                // maxWidth={'xs'}
                // fullWidth={true}
            >
                <UpdateTest2ModalComponent
                    test={updateTest2}
                    onValueChange={(e)=>onTest2ValueChange(e)}
                    onSubmit={(e)=>onSubmitUpdateTest2(e)}
                ></UpdateTest2ModalComponent>
            </CommonModal> */}
        </>
    );
}

export default TestBody;