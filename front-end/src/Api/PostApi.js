import axios from 'axios'
import { waitFor } from '../util/delayPromise'

export const fetchPosts = async (delay) => {
    await waitFor(delay)
    try {
        const data = await axios.get('https://dummyapi.io/data/api/post?limit=20', { headers: { 'app-id': '60349f3e46ff8b701cd18353' } })
        return (data)
    }
    catch (err) {
        return (err)
    }
};

export const fetchComments = async (id, delay) => {
    await waitFor(delay)
    try {
        const comments = await axios.get(`https://dummyapi.io/data/api/post/${id}/comment?limit=10`, { headers: { 'app-id': '60349f3e46ff8b701cd18353' } })
        return (comments)
    }
    catch (err) {
        return (err)
    }
}