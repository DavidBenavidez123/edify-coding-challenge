import React from 'react';
import CardsList from './CardsList';
const Cards = (props) => {
    const handleClick = (tag) => {
        props.tagFuzzySearch(tag)
        props.handleChangeTag(tag)
    }
    const { posts, removeFavorite, notifySuccess, postsFavToggle, delay, addToFavorites, notifyError, tagFuzzySearch, loadFavorites, handleChangeTag } = props
 
    return (
        <div className='Posts'>
            {posts.map(post =>
                <CardsList
                    notifySuccess={notifySuccess}
                    delay={delay}
                    removeFavorite={removeFavorite}
                    postsFavToggle={postsFavToggle}
                    loadFavorites={loadFavorites}
                    addToFavorites={addToFavorites}
                    tagFuzzySearch={tagFuzzySearch}
                    handleChangeTag={handleChangeTag}
                    key={post.id}
                    post={post}
                    handleClick={handleClick}
                    notifyError={notifyError}
                />
            )}
        </div>
    );
}

export default Cards;