import './App.css';
import { useEffect, useState } from 'react'
import Cards from './Cards/Cards'
import { Loader } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import { filterPosts } from './util/filter'
import Header from './Header/Header'
import { fetchPosts } from './Api/PostApi'

function App() {

  const [posts, setPosts] = useState([])
  const [immutablePosts, setimmutablePosts] = useState([])
  const [clickedTag, setClickedTag] = useState('')
  const [immutableFavorites, setImmutableFavorites] = useState([])
  const [favorites, setFavorites] = useState([])
  const [postsFavToggle, setPostsFavToggle] = useState(false)
  const [delay, setDelay] = useState(0)
  const [loading, setLoading] = useState(true)

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
          loadFavorites()
          notifySuccess('Added to favorites!')
        }
        else {
          notifyError('Already in your favorites!')
        }
      }
    }, delay);
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
      const data = await fetchPosts()
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
        setPosts(filterPosts(immutablePosts, tag))
      }
      else {
        setPosts(filterPosts(immutableFavorites, tag))
      }

    }
  }

  const simulatedDelay = (delay) => {
    setDelay(delay)
  }


  return (
    <div className="App">
      <ToastContainer />
      <Header
        clickedTag={clickedTag}
        tagFuzzySearch={tagFuzzySearch}
        togglePosts={togglePosts}
        toggleFavorites={toggleFavorites}
        postsFavToggle={postsFavToggle}
        simulatedDelay={simulatedDelay}
      />
      {loading ? (
        <Loader active>Loading</Loader>
      ) : (
          <Cards
            notifySuccess={notifySuccess}
            delay={delay}
            removeFavorite={removeFavorite}
            postsFavToggle={postsFavToggle}
            loadFavorites={loadFavorites}
            addToFavorites={addToFavorites}
            tagFuzzySearch={tagFuzzySearch}
            handleChangeTag={handleChangeTag}
            notifyError={notifyError}
            posts={posts}
          />
        )

      }

    </div>

  );
}

export default App;
