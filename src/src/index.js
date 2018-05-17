import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShowResultsFromAPI from './ShowResultsFromAPI';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ShowResultsFromAPI apiQueryDelay={23} />, document.getElementById('root'));
registerServiceWorker();
