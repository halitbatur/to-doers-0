import React from 'react'
import BoardContainer from './Containers/BoardContainer';
import db from './FireBaseConfig';

export default function App() {
    return (
        <div>
            <BoardContainer db={db} />
        </div>
    )
}
