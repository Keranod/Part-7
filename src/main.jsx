import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import store from './services/store'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <GlobalStyles />
            <App />
        </Router>
    </Provider>
)