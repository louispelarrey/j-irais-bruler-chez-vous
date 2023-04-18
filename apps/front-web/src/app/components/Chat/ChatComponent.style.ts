import styled from 'styled-components';

interface StyledChatProps {
  widthPercentage: number;
  heightPercentage: number;
}

export const StyledChat = styled.div<StyledChatProps>`

  margin-top: 10px;

  width: ${props => props.widthPercentage}%;
  height: ${props => props.heightPercentage}%;

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
    height: 70vh;
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
