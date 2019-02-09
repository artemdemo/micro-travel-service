import React from 'react';
import Container from '@app/components/Container/Container';

const AppView = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
};

export default AppView;
