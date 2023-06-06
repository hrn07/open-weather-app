import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import axios from 'axios';
import { useLocation } from '../context/LocationContext';

const City = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {location, setLocation} = useLocation();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/city.list.json');
        const citiesData = response.data;

        const filteredCities = citiesData.reduce((uniqueCities, city) => {
          if (city.country === "TR" && !uniqueCities.some(c => c.name === city.name)) {
            uniqueCities.push(city);
          }
          return uniqueCities;
        }, []);

        const cityOptions = filteredCities.map(city => ({
          value: city.name,
          label: city.name
        }));

        setCities(cityOptions);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setLocation(selectedOption.value);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=da6c13119bb9b9423f3026c2da8e9f7f`)
            .then(response => {
              const city = response.data.name;
              setSelectedOption({ value: city, label: city });
              setLocation(city);
              
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
            });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} lg={6}>
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <InputGroup className="mb-3">
            <div style={{ width: '100%' }}>
              <Select
                options={cities}
                value={selectedOption}
                onChange={handleSelectChange}
                isSearchable
                placeholder="Ara..."
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '100%'
                  })
                }}
                isLoading={loading}
              />
              <br />
              <button onClick={getUserLocation}>Mevcut Konumumu Al</button>
              {/* {JSON.stringify(location)} */}
            </div>
          </InputGroup>
        </div>
      </Col>
    </Row>
  );
};

export default City;
