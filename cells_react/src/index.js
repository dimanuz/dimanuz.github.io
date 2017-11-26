import React from 'react';
import ReactDOM from 'react-dom';
import './font-awesome/css/font-awesome.min.css';
import './cells.css';
import Cells from './cells';
import registerServiceWorker from './registerServiceWorker';


let DOMCells = document.querySelectorAll(".cells");
ReactDOM.render(
    <Cells />,
    DOMCells[0]
);

ReactDOM.render(
    <Cells />,
    DOMCells[1]
);
registerServiceWorker();
