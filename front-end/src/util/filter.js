export const filterPosts = (posts, tag) => {
    const filter = posts.filter(post => {
        for (let i = 0; i < post.tags.length; i++) {
            if (post.tags[i].slice(0, tag.length) === tag) {
                return true
            }
        }
    })
    return filter
}