import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));