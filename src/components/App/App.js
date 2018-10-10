import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import List from '../List';
import { colorsDark } from '../../styles/palette';
import { Wrapper, Title } from './styles';
import {connect} from 'react-redux'
import actions from '../../store/story/actions'
import { hasMoreStoriesSelector } from '../../store/story/selectors'

import Loader from '../Loader/index';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {
    
    componentDidMount() {
        this.props.fetchStoriesFirstPage();
    }

    fetchStories = () => {
      const { storyIds, page, fetchStories, isFetching } = this.props;
      if(!isFetching) {
        fetchStories({ storyIds, page });
      }
    }

  render() {
      const { stories, hasMoreStories } = this.props;
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
            <Wrapper>
                <Title>Hacker news Reader</Title>
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

