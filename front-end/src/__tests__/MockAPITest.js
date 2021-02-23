import { fetchPosts, fetchComments } from '../Api/PostApi'
import axios from 'axios'
jest.mock('axios');

describe("Posts Api's", () => {
    test(`returns array of posts `, async () => {
        axios.get.mockResolvedValue({
            data: [
                {
                    id: "UWdcOFTc7DfzOhI6LpI4",
                    image: "https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg",
                    likes: 43,
                    link: "https://www.instagram.com/teddyosterblomphoto/",
                    owner: {
                        id: "uQrnqsqyh8FjSXAPc7oA", email: "emilie.lambert@example.com",
                        title: "mrs",
                        picture: "https://randomuser.me/api/portraits/women/93.jpg",
                        firstName: "Emilie",
                    },
                    publishDate: "2020-05-24T14:53:17.598Z",
                    tags: (3)["animal", "dog", "golden retriever"],
                    text: "adult Labrador retriever"
                },
                {
                    id: "gsMqbWehBe6UdwQz3h6U",
                    image: "https://img.dummyapi.io/photo-1515376721779-7db6951da88d.jpg",
                    likes: 16,
                    link: null,
                    owner: {
                        id: "ykiaIBj7SJTlE0ITXFV9",
                        lastName: "Legrand",
                        firstName: "Charlotte",
                        email: "charlotte.legrand@example.com",
                        title: "ms",
                    },
                    publishDate: "2020-05-24T05:44:55.297Z",
                    tags: (3)["dog", "pet", "canine"],
                    text: "@adventure.yuki frozen grass short-coated black do",
                }
            ]
        });
        const post = await fetchPosts()
        expect(post.data).toBeInstanceOf(Array);
    });


    test(`returns array of comments `, async () => {
        axios.get.mockResolvedValue({
            data: [
                {
                    id: "UEHfuU9iydkVRCm5uJRY",
                    message: "🤔 Beautiful post!!!",
                    owner: {
                        id: "TaA5kek00ZRHfUjciI0t",
                        title: "mrs",
                        firstName: "Els",
                        lastName: "Ijsseldijk",
                        email: "els.ijsseldijk@example.com",
                    },
                    publishDate: "2020-01-03T00:53:25.492Z"
                },
                {
                    id: "UEHfuU9iydkVRCm5uJRY",
                    message: "🤔 Beautiful post!!!",
                    owner: {
                        id: "TaA5kek00ZRHfUjciI0t",
                        title: "mrs",
                        firstName: "Els",
                        lastName: "Ijsseldijk",
                        email: "els.ijsseldijk@example.com",
                    },
                    publishDate: "2020-01-03T00:53:25.492Z"
                },
            ]
        });
        const comments = await fetchComments()
        expect(comments.data).toBeInstanceOf(Array);
    });


})


