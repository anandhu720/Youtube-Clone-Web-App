import React, { useEffect } from 'react'
import './_videoMetaData.scss';
import Profile from "../../images/profile.jpg";

import moment from 'moment';
import numeral from 'numeral';

import {MdThumbUp,MdThumbDown} from 'react-icons/md'
import ShowMoreText from 'react-show-more-text';
import { getChannelById,checkChannelSubscription } from '../../redux/actions/channel.action';
import {useDispatch,useSelector} from 'react-redux'

const VideoMetaData = ({video,videoId}) => {

    // console.log(video);
    const {snippet,statistics} = video
    const dispatch = useDispatch();

    // console.log(snippet);

    const {title,channelId,description,channelTitle,publishedAt} = snippet;
    const {viewCount,likeCount,dislikeCount} = statistics;

    useEffect(()=>{
        dispatch(getChannelById(channelId));
        dispatch(checkChannelSubscription(channelId));
    },[channelId,dispatch])

    const {channel,loading} = useSelector(state => state.selectedChannel)

    const subscriptionStatus= useSelector(state => state.selectedChannel.subscriptions)
    // console.log(channel.snippet.thumbnails.default.url);

    return (
        <div className="videoMetaData py-2">
            <div className="videoMetaData_top">
                <h5>{title}</h5>
                <div className="d-flex justify-content-between algin-center py-1">
                    <span>
                        {numeral(viewCount).format('0.a')} Views |&nbsp;&nbsp;
                        {moment(publishedAt).fromNow()}
                    </span>
                
                    <div>
                        <span className="m-1">
                            <MdThumbUp size={26} /> 
                            {numeral(likeCount).format('0.a')}
                        </span>
                        <span className="m-1">
                            <MdThumbDown size={26} />
                            {numeral(dislikeCount).format('0.a')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="videoMetaData_channel d-flex justify-content-between algin-items-center my-2 py-3">
                <div className="d-flex">
                    <img src={!loading?channel.snippet.thumbnails.default.url:Profile} alt="" className="rounder-circle mr-3" />
                    <div className="d-flex flex-column channel-details">
                        <span>{channelTitle}</span>
                        <span>{numeral(!loading?channel.statistics.subscriberCount:0).format('0.a')} Subscribers </span>
                    </div>
                </div>
                <button className={`btn border-0 p-2 m-2 ${subscriptionStatus?'btn-gray':'btn-danger'}`}>
                    {subscriptionStatus?'Subscribed':'Subscribe'}
                </button>
            </div>
            <div className="videoMetaData_description">
                <ShowMoreText
                    lines={3}
                    more="SHOW MORE"
                    less="SHOW LESS"
                    anchorClass='showMoreText'
                    expanded={false}
                >
                {description}
                </ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData
