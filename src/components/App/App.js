import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import List from '../List';
import { colorsDark, colorsLight } from '../../styles/palette';
import { Wrapper, Title, SubTitle } from './styles';
import {connect} from 'react-redux'
import actions from '../../store/story/actions'
import { hasMoreStoriesSelector } from '../../store/story/selectors'

import Loader from '../Loader/index';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {
    
  state = {
    color: false
  }
    componentDidMount() {
        this.props.fetchStoriesFirstPage();
    }

    fetchStories = () => {
      const { storyIds, page, isFetching } = this.props;
      if(!isFetching) {
        this.props.fetchStories({ storyIds, page });
      }
    }

    toggleTheme = () => {
      this.setState({
        color: !this.state.color
      })
    }

  render() {
      const { stories, hasMoreStories } = this.props;
    return (
      <ThemeProvider theme={(!this.state.color) ? colorsDark : colorsLight}>
        <div>
            <Wrapper>
                <Title>Hacker News Clone (Y Combinator)</Title>
                <SubTitle>Now with Infinite Scroll!</SubTitle>
                <button onClick={this.toggleTheme}>Toggle Theme</button>
                <InfiniteScroll
                  dataLength={stories.length}
                  next={this.fetchStories}
                  hasMore={hasMoreStories}
                  loader={<Loader />}
                  style={{
                    height: '100%',
                    overflow: 'visible',
                  }}
                >
                  <List stories={stories} />
                </InfiniteScroll>
            </Wrapper>
          <SubTitle>Made With love by Dev-Potato</SubTitle>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
    hasMoreStories: hasMoreStoriesSelector(state),
    stories: state.story.stories,
    page: state.story.page,
    storyIds: state.story.storyIds,
    isFetching: state.story.isFetching,
  });
  
  
  const mapDispatchToProps = dispatch => ({
    fetchStories: ({ storyIds, page }) => dispatch(actions.fetchStories({storyIds, page})),
    fetchStoriesFirstPage: () => dispatch(actions.fetchStoryIds()),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App);

