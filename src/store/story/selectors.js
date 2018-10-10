import { createSelector } from 'reselect';

const storyIdsSeletor = state => state.story.storyIds;
const storiesSelector = state => state.story.stories;

export const hasMoreStoriesSelector = createSelector(
    storyIdsSeletor,
    storiesSelector,
    (storyIds, stories) => storyIds.length > stories.length,
);