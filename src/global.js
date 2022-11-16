import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    background-image: url('${({ theme }) => theme.bgMobile}');
  }
  
  .todo-adder, .todo-item, .bottom-panel, .filter-panel-small {
    background-color: ${({theme}) => theme.card};
  }

  .todo-item, .bottom-panel {
    border-top: 1.2px solid ${({theme}) => theme.borderTop};
  }

  @media screen and (min-width: 768px) {

    body {
        background-image: url('${({ theme }) => theme.bgDesktop}');
    }
  }

  `