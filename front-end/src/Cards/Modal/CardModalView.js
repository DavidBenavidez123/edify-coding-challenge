import React from 'react';
import { Button, Header, Image, Comment, Modal, Placeholder, Feed } from 'semantic-ui-react'
import Moment from 'react-moment';

function CardModalComments(props) {
    const { post, comments, loadingComments } = props
    return (
        <Modal
            open={props.open}
        >
            <Modal.Header>
                <Feed>
                    <Feed.Event image={post.owner.picture} summary={post.owner.firstName + ' ' + post.owner.lastName} />
                </Feed>
            </Modal.Header>
            <Modal.Content image>

                <Image size='medium' src={post.image} wrapped />
                <Modal.Description>
                    <Header>Comments</Header>
                    {
                        loadingComments ? (
                            <Placeholder >
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                        ) : (
                                <Comment.Group>
                                    {comments.map(comment =>
                                        <Comment>
                                            <Comment.Avatar src={comment.owner.picture} />
                                            <Comment.Content>
                                                <Comment.Author as='a'>{comment.owner.firstName} {comment.owner.lastName}</Comment.Author>
                                                <Comment.Metadata>
                                                    <Moment fromNow ago>{comment.publishDate}</Moment>
                                                </Comment.Metadata>
                                                <Comment.Text>{comment.message}</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action>Reply</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>

                                    )}
                                </Comment.Group>
                            )
                    }
                </Modal.Description>
            </Modal.Content>
            <Modal.Description className='Modal-Post-Tags' >
                {post.tags.map(tag =>
                    <p key={tag} className='tag'>
                        {tag}
                    </p>
                )}
            </Modal.Description>
            <Modal.Description className='Modal-Post-Text'>
                {post.text}
            </Modal.Description>

            <Modal.Actions>
                <Button
                    content="Close"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => props.setModal(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default CardModalComments;