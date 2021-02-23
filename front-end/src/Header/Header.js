import React from 'react';
import SearchFilter from './SearchFilter'
import PostFavoriteBreadCrumb from './PostFavoriteBreadCrumb'
import DelayInput from './DelayInput'

function Header(props) {
    const { clickedTag, tagFuzzySearch, togglePosts, toggleFavorites, postsFavToggle, simulatedDelay } = props
    return (
        <div className='Nav-Bar'>
            <div className='Nav-Bar-Flex'>
                <SearchFilter clickedTag={clickedTag} tagFuzzySearch={tagFuzzySearch} />
                <DelayInput simulatedDelay={simulatedDelay} />
                <PostFavoriteBreadCrumb togglePosts={togglePosts} toggleFavorites={toggleFavorites} postsFavToggle={postsFavToggle} />
            </div>
        </div>
    );
}

export default Header;