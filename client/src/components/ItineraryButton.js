import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ItineraryCarousel from './ItineraryCarousel';

const ItineraryButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Toggle</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
              <ItineraryCarousel />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ItineraryButton;