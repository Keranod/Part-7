import Notification from './Notification'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    // notificationMessage,
    // notificationType
}) => {
    return (
        <div className='loginForm'>
            <h2>Log in to application</h2>
            <Notification
                // message={notificationMessage}
                // type={notificationType}
            />
            <form onSubmit={handleLogin}>
                <div>
          username
                    <input
                        id='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
          password
                    <input
                        id='password'
                        type='text'
                        value={password}
                        name='Password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    id='login-button'
                    type='submit'
                >login</button>
            </form>
        </div>
    )
}
export default LoginForm