import styled from "styled-components";

const Container = styled.div`

`;
const UpdateTestModalComponent = (props) =>{
    return (
        <>
            <Container>
                <form onSubmit={(e)=>props.onSubmit(e)}>
                    <input type='input' name='name' value={props.test?.name || ''} onChange={(e)=>props.onValueChange(e)}></input>
                </form>
            </Container>
        </>
    );
}

export default UpdateTestModalComponent;