import React from 'react';
import { useState, useEffect } from 'react'
import CardModalView from './CardModalView';
import { fetchComments } from '../../Api/PostApi'
function CommentsModal(props) {

    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)

    const { post, notifyError, open, delay, setModal } = props

    useEffect(() => {
        setLoadingComments(true)
        loadComments()
    }, [delay])

    const loadComments = async () => {
        try {
            const comments = await fetchComments(post.id, delay)
            setComments(comments.data.data)
            setLoadingComments(false)
        }
        catch (err) {
            notifyError('Error loading comments')
        }
    }
    return (

        <CardModalView open={open} setModal={setModal} comments={comments} loadingComments={loadingComments} post={post} notifyError={notifyError} />

    );
}

export default CommentsModal;