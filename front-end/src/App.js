import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cards from './Cards'
import SearchFilter from './SearchFilter'
import PostFavoriteBreadCrumb from './PostFavoriteBreadCrumb'
import { Loader } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [posts, setPosts] = useState([])
  const [immutablePosts, setimmutablePosts] = useState([])
  const [clickedTag, setClickedTag] = useState('')
  const [immutableFavorites, setImmutableFavorites] = useState([])
  const [favorites, setFavorites] = useState([])
  const [postsFavToggle, setPostsFavToggle] = useState(false)
  const [delay, setDelay] = useState(0)
  const [loading, setLoading] = useState(true)
  const [delayFlag, setDelayFlag] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      loadData()
      loadFavorites()
    }, delay);
  }, [delay])

  const addToFavorites = (favorite) => {
    setTimeout(() => {
      let favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites'))
      if (favoriteLocalStorage === null) {
        let favortiteObj = {}
        favortiteObj[favorite.id] = favorite
        localStorage.setItem('favorites', JSON.stringify(favortiteObj))
      }
      else {
        if (!favoriteLocalStorage.hasOwnProperty(favorite.id)) {
          favoriteLocalStorage[favorite.id] = favorite
          localStorage.setItem('favorites', JSON.stringify(favoriteLocalStorage))
          console.log('added')
          notifySuccess('Added to favorites!')
        }
        else {
          notifyError('Already in your favorites!')
        }
      }
    }, delay);
    loadFavorites()
  }


  const notifySuccess = (message) =>
    toast.success(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = (message) =>
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });




  const loadFavorites = () => {
    let favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites'))
    if (favoriteLocalStorage !== null) {

      let favoriteArray = Object.values(favoriteLocalStorage)
      setImmutableFavorites(favoriteArray)
      setFavorites(favoriteArray)
    }

  }

  const removeFavorite = (id) => {

    setTimeout(() => {
      let favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites'))
      if (favoriteLocalStorage !== null) {

        delete favoriteLocalStorage[id]
        localStorage.setItem('favorites', JSON.stringify(favoriteLocalStorage))

        let favoriteArray = Object.values(favoriteLocalStorage)
        setPosts(favoriteArray)
      }
    }, delay);

  }

  const loadData = async () => {
    try {
      const data = await axios.get('https://dummyapi.io/data/api/post?limit=20', { headers: { 'app-id': '603056a05a55834b443b1b15' } })
      setPosts(data.data.data)
      setimmutablePosts(data.data.data)
      setLoading(false)
    }
    catch (err) {
    }
  }

  const handleChangeTag = (tag) => {
    setClickedTag(tag)
  }

  const togglePosts = () => {
    setLoading(true)
    setClickedTag('')
    setPostsFavToggle(false)
    setTimeout(() => {
      setLoading(false)
      setPosts(immutablePosts)
    }, delay);



  }

  const toggleFavorites = () => {
    setLoading(true)
    setClickedTag('')
    setPostsFavToggle(true)
    setTimeout(() => {
      setPosts(favorites)
      setLoading(false)
    }, delay);

  }

  const tagFuzzySearch = (tag) => {
    if (tag.length === 0) {
      if (postsFavToggle === false) {
        setPosts(immutablePosts)
      }
      else {
        setPosts(immutableFavorites)
      }
    }
    else {
      if (postsFavToggle === false) {
        setPosts(immutablePosts.filter(post => {
          for (let i = 0; i < post.tags.length; i++) {
            if (post.tags[i].slice(0, tag.length) === tag) {
              return true
            }
          }
        })
        )
      }
      else {
        setPosts(immutableFavorites.filter(post => {
          for (let i = 0; i < post.tags.length; i++) {
            if (post.tags[i].slice(0, tag.length) === tag) {
              return true
            }
          }
        })
        )
      }

    }
  }
  

  return (
    <div className="App">
      <ToastContainer />
      <div className='Nav-Bar'>
        <SearchFilter clickedTag={clickedTag} tagFuzzySearch={tagFuzzySearch} />

        Enter delay in ms<input name='delay' value={delay} onChange={(e) => setDelay(e.target.value)} />
        
        <PostFavoriteBreadCrumb togglePosts={togglePosts} toggleFavorites={toggleFavorites} postsFavToggle={postsFavToggle} />
      </div>
      {loading ? (
        <Loader active>Loading</Loader>

      ) : (
          <div className='Posts'>
            {posts.map(post =>
              <Cards
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
              />

            )}
          </div>

        )

      }

    </div>

  );
}

export default App;
