import React,{useEffect} from 'react';
import { Col, Container } from 'react-bootstrap';
import Categories from '../../components/categories/Categories';
import Videos from '../../components/videos/Videos';

import {useDispatch,useSelector} from 'react-redux'

import {getPopularVideos,getVideosByCategory} from '../../redux/actions/videos.action'

import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../skeletons/SkeletonVideo';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const {videos,activeCategory,loading} = useSelector(state => state.homeVideos);

    useEffect(() => {
        dispatch(getPopularVideos())

    },[dispatch])


    const fetchData = () =>{
        if(activeCategory === 'All')
            dispatch(getPopularVideos())
        else
            dispatch(getVideosByCategory(activeCategory));
    }



    return (
        <Container>
            
            <Categories />
            
                <InfiniteScroll
                    dataLength = {videos.length}
                    next={fetchData}
                    hasMore={true}
                    Loader={<div className="spinner-border text-danger d-block mx-auto"></div>}
                    className="row"
                >
                {!loading ?
                    videos.map((video) => (
                        <Col lg={3} md={4} >
                            <Videos video={video} key={video.id}/>
                        </Col>
                    ))
                    :[...Array(20)].map(()=>(
                        <Col lg={3} md={4}>
                            <SkeletonVideo />
                        </Col>
                    ))

                }
                
                </InfiniteScroll>
           


        </Container>
    )
}

export default HomeScreen
