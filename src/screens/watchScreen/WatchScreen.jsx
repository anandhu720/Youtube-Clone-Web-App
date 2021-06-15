import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getRelatedVideoById, getVideoById} from '../../redux/actions/videos.action';
import './_watchScreen.scss';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import Comments from '../../components/comments/Comments'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'



const WatchScreen = () => {

    

    const {id} = useParams()
    // console.log(id)

    const dispatch = useDispatch()

    // dispatch(getVideoById(id))

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRelatedVideoById(id))

    },[dispatch,id])

    const {video,loading} = useSelector(state => state.selectedVideo)
    const {relatedVideo,loadingRelatedVideo} = useSelector(state => state.relatedVideos)

    // console.log(!loadingRelatedVideo && relatedVideo)

    return (
        <Row>
            <Col lg={8}>
                <div className="watchScreen_player">
                    <iframe src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>
                {!loading ? <VideoMetaData video={video} videoId={id} />:<h1>loading..</h1>}
                <Comments videoId={id} totalComments={video?.statistics?.commentCount} />
            </Col>
            <Col lg={4}>
            {
                !loadingRelatedVideo&&
                    relatedVideo?.filter(video=>video.snippet)?.map((video)=>
                    (<VideoHorizontal video={video}  />
                ))
            }    
            </Col>
        </Row>
    )
}

export default WatchScreen
