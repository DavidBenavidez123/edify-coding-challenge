import { filterPosts } from '../util/filter'

let post = [
  {
    title: 'post 1',
    tags: ['dog', 'pet', 'canine']
  },
  {
    title: 'post 2',
    tags: ['cat', 'pet', 'canine']
  },
  {
    title: 'post 3',
    tags: ['dog', 'pet', 'canine']
  }
]

let resultPost = [
  {
    title: 'post 1',
    tags: ['dog', 'pet', 'canine']
  },
  {
    title: 'post 3',
    tags: ['dog', 'pet', 'canine']
  }
]

test(`filtering posts with the tag "dog" should return only 2 posts with tags containing 'dog' `, () => {
  expect(filterPosts(post, 'dog')).toEqual(resultPost);
});