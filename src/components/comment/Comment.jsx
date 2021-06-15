import React from 'react'
import './_comment.scss'
// import Profile from "../../images/profile.jpg";
import moment from 'moment';


const Comment = ({comment,key}) => {

    const {authorDisplayName,authorProfileImageUrl,publishedAt,textDisplay} = comment;

    return (
        <div className='comment p-2 d-flex' >
            <img src={authorProfileImageUrl} alt="" className="rounded-circle mr-2" />
            <div className="comment_body p-1">
                <p className="comment_header mb-1">
                    {authorDisplayName} {moment(publishedAt).fromNow()}
                </p>
                <p className="mb-0">
                    {textDisplay}
                </p>
            </div>
        </div>
    )
}

export default Comment
