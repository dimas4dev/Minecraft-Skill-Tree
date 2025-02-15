import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { skillTreeStore } from './Redux/skillTreeStore.ts';

import App from './App.tsx';

import '@xyflow/react/dist/style.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={skillTreeStore}>
        <App />
    </Provider>
);
