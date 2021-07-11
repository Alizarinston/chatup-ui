import styled, {keyframes} from "styled-components"
import {flipInX, slideInRight, pulse, fadeIn, merge, lightSpeedIn, lightSpeedOut} from "react-animations"

export const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`}`;
export const SlideInRight = styled.div`animation: 1s ${keyframes`${merge(slideInRight, fadeIn)}`}`;
export const FlipIn = styled.div`animation: 2s ${keyframes`${flipInX}`}`;

export const Slide = styled.div`
  //display: inline-block;
  //visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? keyframes`${pulse}` : keyframes`${slideInRight}`} 0.5s;
  //transition: visibility 1s linear;
`;

export const LightSpeed = styled.div`
  animation: ${props => props.out ? keyframes`${lightSpeedOut}` : keyframes`${lightSpeedIn}`} 0.5s;
`;