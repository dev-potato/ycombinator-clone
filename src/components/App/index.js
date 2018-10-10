import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import List from '../List';
import { colorsDark } from '../../styles/palette';

import { Wrapper, Title } from './styles';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
            <Wrapper>
                <Title>Hacker news Reader</Title>
                <List />
            </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

