import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
    return (
        <>
            <div className='app-spinner'>
                <div className='loading-main'>
                    <div className='loading-secundary'>
                        <Spinner color='dark' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;