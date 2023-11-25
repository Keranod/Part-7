import Notification from './Notification'

import {
    StyledLoginDiv,
    StyledLoginInput,
    StyledLoginButton,
    StyledLoginButtonDiv
}
from '../styles/LoginFormStyled'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <StyledLoginDiv className='loginForm'>
            <h2>Log in to application</h2>
            <Notification
            />
            <form onSubmit={handleLogin}>
                <div>
                    <StyledLoginInput
                        id='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={handleUsernameChange}
                        placeholder='username'
                    />
                </div>
                <div>
                    <StyledLoginInput
                        id='password'
                        type='password'
                        value={password}
                        name='Password'
                        onChange={handlePasswordChange}
                        placeholder='password'
                    />
                </div>
                <StyledLoginButtonDiv>
                    <StyledLoginButton
                        id='login-button'
                        type='submit'
                    >login</StyledLoginButton>
                </StyledLoginButtonDiv>
            </form>
        </StyledLoginDiv>
    )
}
export default LoginForm