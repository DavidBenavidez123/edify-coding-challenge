import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'

function PostFavoriteBreadCrumb(props) {
    return (
        <Breadcrumb>
            <Breadcrumb.Section style={{color:'black'}} onClick={props.togglePosts} active={!props.postsFavToggle} >Popular</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section  style={{color:'black'}} onClick={props.toggleFavorites} active={props.postsFavToggle}>Favorites</Breadcrumb.Section>
        </Breadcrumb>
    );
}

export default PostFavoriteBreadCrumb;