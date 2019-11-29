import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <img src={require('../assets/images/logo.png')} alt='logo' id='logo' />
      </header>
    );
  }
}

class MainLanding extends React.Component {
  render() {
    return (
      <main className='MainLanding'>
        <p>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </p>
        <Link to='/Cities'>
          <img
            src={require('../assets/images/arrow.png')}
            alt='arrow'
            id='arrow'
          />
        </Link>
      </main>
    );
  }
}

const items = [
  {
    src1: require('../assets/images/amsterdam.jpg'),
    altText1: 'Amsterdam',
    caption1: 'Amsterdam',
    src2: require('../assets/images/barcelona.jpg'),
    altText2: 'Barcelona',
    caption2: 'Barcelona',
    src3: require('../assets/images/beijing.jpg'),
    altText3: 'Beijing',
    caption3: 'Beijing',
    src4: require('../assets/images/buenosaires.jpg'),
    caption4: 'Buenos Aires',
    altText4: 'Buenos Aires'
  },
  {
    src1: require('../assets/images/cairo.jpg'),
    altText1: 'Cairo',
    caption1: 'Cairo',
    src2: require('../assets/images/dubai.jpg'),
    altText2: 'Dubai',
    caption2: 'Dubai',
    src3: require('../assets/images/hanoi.jpg'),
    altText3: 'Hanoi',
    caption3: 'Hanoi',
    src4: require('../assets/images/newyork.jpg'),
    caption4: 'New York',
    altText4: 'New York'
  },
  {
    src1: require('../assets/images/paris.webp'),
    altText1: 'Paris',
    caption1: 'Paris',
    src2: require('../assets/images/rio.jpg'),
    altText2: 'Rio de Janeiro',
    caption2: 'Rio de Janeiro',
    src3: require('../assets/images/stpetersburg.jpg'),
    altText3: 'St. Petersburg',
    caption3: 'St. Petersburg',
    src4: require('../assets/images/sydney.jpg'),
    caption4: 'Sydney',
    altText4: 'Sydney'
  }
];

const MainCarousel = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src1}
      >
        <div id='contCarousel'>
          <div id='imgs'>
            <div id='img1'>
              <img src={item.src1} alt={item.altText1} />
              <CarouselCaption captionHeader={item.caption1} captionText='' />
            </div>
            <div id='img2'>
              <img src={item.src2} alt={item.altText2} />
              <CarouselCaption captionHeader={item.caption2} captionText='' />
            </div>
            <div id='img3'>
              <img src={item.src3} alt={item.altText3} />
              <CarouselCaption captionHeader={item.caption3} captionText='' />
            </div>
            <div id='img4'>
              <img src={item.src4} alt={item.altText4} />
              <CarouselCaption captionHeader={item.caption4} captionText='' />
            </div>
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
};

class Landing extends React.Component {
  render() {
    return (
      <div className='mainLanding'>
        <Header />
        <MainLanding />
        <p id='txtCarousel'>Popular MYtineraries</p>
        <div className='mainCarousel'>
          <MainCarousel />
        </div>
      </div>
    );
  }
}

export default Landing;
