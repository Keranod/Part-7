import styled from 'styled-components'

export const StyledLoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
` 

export const StyledLoginInput = styled.input`
    padding: 5px;
    margin: 3px;
`

export const StyledLoginButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledLoginButton = styled.button`
    background-color: white;
    border: none;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    &:hover {
        background-color: grey;
        color: white
    }
`