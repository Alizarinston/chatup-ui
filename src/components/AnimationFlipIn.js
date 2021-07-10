import styled, {keyframes} from "styled-components"
import {flipInX} from "react-animations"

export const FlipIn = styled.div`animation: 2s ${keyframes`${flipInX}`}`;