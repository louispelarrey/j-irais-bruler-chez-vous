import { CircularProgress } from "@mui/material"
import { Suspense } from "react"
import styled from "styled-components"

interface StyledSuspenseLoaderProps {
  children: JSX.Element
}

const StyledSuspenseLoader = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border-radius: 50%;
    zoom: 2;
  }
`

export const SuspenseLoader = ({ children }: StyledSuspenseLoaderProps) => {
  return (
    <StyledSuspenseLoader>
      <Suspense fallback={<CircularProgress className="loader" />}>
        {children}
      </Suspense>
    </StyledSuspenseLoader>
  )
}
