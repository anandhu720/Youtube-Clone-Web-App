import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getVideosBySearch } from '../../redux/actions/videos.action';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'

const SearchScreen = () => {

    const {query} = useParams();
    // console.log(query)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getVideosBySearch(query))
    },[dispatch,query])

    const {loadingSearchedVideo,searchedVideo} = useSelector(state => state.searchedVideos)

    return (
        <Container>
            {
                !loadingSearchedVideo ? (
                    searchedVideo?.map(video=><VideoHorizontal video={video} key={video.id.videoId} searchScreen />)
                ) : 
                <h1>Loading...</h1>
            }
        </Container>
    )
}

export default SearchScreen
