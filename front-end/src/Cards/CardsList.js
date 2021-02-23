import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Moment from 'react-moment';
import CardModal from './Modal/CardModal'
import { useState } from 'react'

function CardsList(props) {
    const [open, setOpen] = useState(false)
    const setModal = (e) => {
        setOpen(e)
    }
    const { post, removeFavorite, notifySuccess, postsFavToggle, addToFavorites, handleClick, delay, notifyError } = props
    return (
        <Card id='Post-Card' fluid>
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
            {
                open && (
                    <CardModal notifyError={notifyError} post={post} delay={delay} setModal={setModal} open={open} />
                )
            }
        </Card>
    );
}

export default CardsList;