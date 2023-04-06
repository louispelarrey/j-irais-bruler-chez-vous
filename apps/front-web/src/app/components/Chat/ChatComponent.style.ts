import styled from 'styled-components';

export const StyledChat = styled.div`

  margin-top: 10px;

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

  .outlined-basic-email {
    width: 65%;
    display: inline-block;
  }

  .interact {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 1px;
  }

  @media screen and (min-width: 768px) {
    .outlined-basic-email {
      width: 85%;
    }
  }
`;
