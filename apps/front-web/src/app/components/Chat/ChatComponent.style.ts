import styled from 'styled-components';

interface StyledChatProps {
  widthPercentage: number;
  heightVh: number;
}

export const StyledChat = styled.div<StyledChatProps>`

  width: ${props => props.widthPercentage}%;

  .table {
    min-width: 650px;
  }

  .headBG {
    background-color: #e0e0e0;
  }

  .borderRight500 {
    border-right: 1px solid gray;
  }

  .messageArea {
    height: ${props => props.heightVh}vh;
    overflow-y: auto;
  }

  .messageInput {
    width: 85%;
  }

  .interact {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1px;
    margin: 0 auto;
    gap: 3%;
  }

  @media screen and (min-width: 768px) {
    .outlined-basic-email {
      width: 85%;
    }
  }
`;
