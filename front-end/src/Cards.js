import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { useState } from 'react'
import CommentsModal from './CommentsModal'
import Moment from 'react-moment';

const Cards = (props) => {
    const [open, setOpen] = useState(false)
    const handleClick = (tag) => {
        props.tagFuzzySearch(tag)
        props.handleChangeTag(tag)
    }

    const setModal = (e) => {
        setOpen(e)
    }

    const { post, removeFavorite, notifySuccess, postsFavToggle, delay, addToFavorites, notifyError } = props

    return (
        <>
            <Card className='Card' fluid>
                <Card.Content extra>
                    <Image floated='left'
                        size='mini'
                        src={post.owner.picture} />
                    <Card.Header>{post.owner.firstName} {post.owner.lastName}</Card.Header>
                    <Card.Meta>{post.owner.email}</Card.Meta>

                </Card.Content>
                <Image src={post.image} wrapped ui={false} />
                <Card.Content>
                    {post.tags.map(tag =>
                        <p key={tag} onClick={(e) => handleClick(tag)} className='tag'>
                            {tag}
                        </p>
                    )}
                </Card.Content>
                <Card.Content>
                    {post.text}
                </Card.Content>
                <Card.Content extra>
                    <p className='clickables' >
                        <Icon name='heart' />
                        {post.likes} Likes
                    </p>
                    <p onClick={() => setModal(true)} className='clickables' >
                        View Comments
                    </p>

                    {postsFavToggle ?
                        (
                            <p onClick={() => { removeFavorite(post.id); notifySuccess('Removed from favorites!') }} className='clickables' >
                                <Icon name='star' />
                              Remove Favorite
                            </p>
                        ) :
                        (

                            <p onClick={() => addToFavorites(post)} className='clickables' >
                                <Icon name='star' />
                            Favorite
                            </p>
                        )
                    }
                    <p className='clickables'>
                        <Moment fromNow ago>{post.publishDate}</Moment>
                    </p>
                </Card.Content>
            </Card>
            {
                open && (
                    <CommentsModal notifyError={notifyError} post={post} delay={delay} image={post.image} setModal={setModal} open={open} />
                )

            }
        </>
    )
}

export default Cards