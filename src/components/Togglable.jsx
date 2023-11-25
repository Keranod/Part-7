import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import {
    StyledButton
} from '../styles/BlogListStyles'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <StyledButton id={props.buttonId} onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable