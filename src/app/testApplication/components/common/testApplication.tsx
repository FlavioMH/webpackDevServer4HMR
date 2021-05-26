require('./testApplication.scss');
import * as React from 'react';

const TestApplication = (): JSX.Element => {
    return (
        <div className="appSection">
            Try to change this label and everything will refresh...
            <br />
            <br />
            <br />
            <label>If you fill this field, then you will see it disappear on code file change</label>
            <br />
            <input type="text"></input>
            <br />
            <label>If you check this, then you will see it disappear on code file change</label>
            <br />
            <input type="checkbox"></input>
            <br />
        </div>
    );
};

export default TestApplication;
