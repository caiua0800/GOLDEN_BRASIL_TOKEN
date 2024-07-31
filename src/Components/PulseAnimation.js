import React from 'react';
import styled, { keyframes } from 'styled-components';
import assets from '../assets/assets';
// Keyframes for animation
const animate = keyframes`
  0% {
    width: 200px;
    height: 200px;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 600px;
    height: 600px;
    opacity: 0;
  }
`;

// Styled components
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background: #0a3643;
  position: absolute;
  top: 0;
  z-index: 9999;
  left: 0;
`;

const Pulse = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow: inset 0 0 40px #12b9ff, 0 0 50px #12b9ff;
  border-radius: 50%;
  border: 1px solid #12b9ff;
  background: url();
`;

const PulseSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: 1px solid #12b9ff;
  animation: ${animate} 6s linear infinite;
  border-radius: 50%;
  animation-delay: ${({ delay }) => `calc(${delay} * -1s)`};
`;

const CenterImage = styled.img`
  position: absolute;
  top: 52%;
  left: 52%;
  transform: translate(-50%, -50%);
  width: 130px; /* Adjust the size of the image */
  height: auto;
  opacity: 0.5;
  z-index: 1;
`;

const imageSrc = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/logoGoldenToken-removebg-preview.png?alt=media&token=5109abf4-41b8-4c9a-8803-4b4adbab0cb2'; 

const PulseAnimation = ({ aparecer }) => {
    if (!aparecer) return null;

    const spans = Array.from({ length: 6 }, (_, i) => (
        <PulseSpan key={i} delay={i + 1} />
    ));

    return (
        <Body>
            <Pulse>
                <CenterImage src={assets.imageBrandPlatform} alt="Center Image" />
                {spans}
            </Pulse>
        </Body>
    );
};

export default PulseAnimation;
