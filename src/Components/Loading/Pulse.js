// src/Components/PulseAnimation.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { usePulse } from '../../context/LoadContext'; // Use o contexto correto
import assets from '../../assets/assets';

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

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100%;
  // background: #0a3643;
  background: linear-gradient(-60deg, #000000, #000000, #111112, #2b2d2e, #000000, #000000, #000000);
  position: fixed;
  top: 0;
  z-index: 999999;
  left: 0;
`;

const Pulse = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  box-shadow: inset 0 0 40px #FFFFFF, 0 0 50px #FFFFFF;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
  background: url();
`;

const PulseSpan = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: 1px solid #E6AA3A;
  animation: ${animate} 6s linear infinite;
  border-radius: 50%;
  animation-delay: ${({ delay }) => `calc(${delay} * -1s)`};
`;

const CenterImage = styled.img`
  position: absolute;
  top: 52%;
  left: 52%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: auto;
  opacity: 0.5;
  z-index: 1;
`;


const PulseAnimation = () => {
  const { isPulseVisible } = usePulse();

  if (!isPulseVisible) return null;

  const spans = Array.from({ length: 6 }, (_, i) => (
    <PulseSpan key={i} delay={i + 1} />
  ));

  return (
    <Body>
      <Pulse>
        <CenterImage src='logo-golden.png' alt="Center Image" />
        {spans}
      </Pulse>
    </Body>
  );
};

export default PulseAnimation;
