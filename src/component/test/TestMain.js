import { useEffect } from "react";
import TestBody from "./TestBody";

const test = {
    name:'그레이스',
    phoneNumber:'01012341234'
}

const TestMain = () =>{
    useEffect(()=>{

    },[])

    const __handleDataConnect = () =>{
        return {
            updateTestData: function(updateTestState){
                // 업데이트 데이터 커넥터
                console.log(updateTestState);
            }
        }
    }

    const __handleEventControl = () =>{
        return {
            test: function() {
                return {
                    onSubmitUpdate: function(updateTestState){
                        // 업데이트 데이터 커넥터 불러오기
                        __handleDataConnect().updateTestData(updateTestState);
                    }
                }
            }
        }
    }
    return (
        <>
            <TestBody
                test={test}
                onSubmitUpdateTest = {(updateTestState)=>__handleEventControl().test().onSubmitUpdate(updateTestState)}
            ></TestBody>
        </>
    );
}

export default TestMain;