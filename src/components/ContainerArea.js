import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import City from './City';
import WeatherGraphs from './WeatherGraphs';

const ContainerArea = () => (
    <Container className="p-5 mb-4 bg-light rounded-3 mt-3">
        <h1 className="header">Welcome To React The Weather App</h1>
        <City />
        <hr />
        <WeatherGraphs />
    </Container>
);

export default ContainerArea;