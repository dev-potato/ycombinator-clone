import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import List from '../List';
import { colorsDark } from '../../styles/palette';
import { Wrapper, Title } from './styles';
import {connect} from 'react-redux'
import actions from '../../store/story/actions'

class App extends Component {
    
    componentDidMount() {
        this.props.fetchStoriesFirstPage();
    }

  render() {
      const { stories } = this.props;
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
            <Wrapper>
                <Title>Hacker news Reader</Title>
                <List stories={stories} />
            </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
    stories: state.story.stories,
    page: state.story.page,
    storyIds: state.story.storyIds,
    isFetching: state.story.isFetching,
  });
  
  
  const mapDispatchToProps = dispatch => ({
    fetchStoriesFirstPage: () => dispatch(actions.fetchStoryIds()),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App);

