import React, { useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import { createImageUrl } from '../../services/movieServices';
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useProfile } from '../Hooks/ourHooks'; // costom Hooks

function Profile() {
  const [movies, setMovies] = useProfile();
  const { user } = UserAuth();

  useEffect(() => {
    try {
      if (user) {
        onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
          if (doc.data()) setMovies(doc.data().favShows);
        })
      }
    } catch (error) {
      console.log(`error is here in profile.jsx`);
      console.log(error)
    }
  }, [user?.email]);

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    })
  }

  const slide = (offset) => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + offset;
  }

  if (!user) {
    return (
      <>
        <p>Fetching shows...</p>
      </>
    )
  }


  return (
    <>
      <div>
        <div>
          <img
            className='block w-full h-[400px] object-cover'
            src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="//" />
          <div className='bg-black/30 fixed top-0 left-0 w-full h-full' />
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>My Shows</h1>
            <p className='font-nsans-light text-gray-400 text-lg'>
              {user.email}
            </p>
          </div>
        </div>
        {/* movie row */}

        <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>FavShows</h2>
        <div className='relative flex items-center group'>
          <MdChevronLeft
            onClick={() => slide(-500)}
            className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40} />
          <div id={`slider`}
            className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {movies.map((movie) => (
              // <MovieItem key={movie.id} movie={movie} />
              // movieItem

              <div key={movie.id} className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]
     inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                <img
                  className='w-full h-40 block object-cover object-top'
                  src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} alt={movie.title} />

                <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
                  <p className='whitespace-normal text-xs md:text-sm flex justify-center
                 items-center  h-full font-nsans-bold'>
                    {movie.title}</p>

                  <p>
                    <AiOutlineClose size={30}
                      onClick={() => handleUnlikeShow(movie)}
                      className='absolute top-2 right-2' />
                  </p>


                </div>
              </div>

            ))}
          </div>
          <MdChevronRight
            onClick={() => slide(500)}
            className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer' size={40} />
        </div>
      </div>
    </>
  )
}

export default Profile
