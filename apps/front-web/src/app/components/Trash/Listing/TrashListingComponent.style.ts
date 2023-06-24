import styled from "styled-components";

export const StyledTrashListingComponent = styled.div`
  //on pc screen
  @media (min-width: 765px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    //center
    justify-items: center;

  }

  display: flex;
  align-items: center;
  flex-direction: column;
`
