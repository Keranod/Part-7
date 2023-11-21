import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nullNotificationType } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    //console.log(notification.message)

    const timeout = 5000

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(nullNotificationType())
        }, timeout)
        return () => clearTimeout(timeoutId)
    }, [notification.message])

    if (notification.message === null) {
        return null
    }

    if (notification.type === null) {
        return null
    }

    if (notification.type === 'error'){
        return <div className={notification.type}>{notification.message}</div>
    }

    return <div className={notification.type}>{notification.message}</div>
}

export default Notification
