import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ItineraryCarousel from './ItineraryCarousel';

const ItineraryButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
              <ItineraryCarousel />
          </CardBody>
        </Card>
      </Collapse>
      <Button color="primary" onClick={toggle}>Toggle</Button>
    </div>
  );
}

export default ItineraryButton;