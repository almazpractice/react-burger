import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './services/store';


const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
);