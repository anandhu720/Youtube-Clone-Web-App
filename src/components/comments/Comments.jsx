import React, { useEffect,useState } from 'react'
import './_comments.scss';
import Profile from "../../images/profile.jpg";
import Comment from '../comment/Comment'
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action';
import numeral from 'numeral';

const Comments = ({videoId,totalComments}) => {   
    
    const dispatch = useDispatch();

    const [text,setText] = useState('');

    useEffect(()=>{
        dispatch(getCommentsOfVideoById(videoId))
    },[dispatch,videoId]);

    const comments = useSelector(state => state.commentsList.comments);
    const _comments = comments?.map(comment =>comment.snippet.topLevelComment.snippet)

    const handleComment = (e) => {
        e.preventDefault();
        if(text.length === 0)
            return;
        dispatch(addComment(videoId,text))
        setText('');
    }

    return (
        <div className="comments">
            <p>{numeral(totalComments).format('0.a')} comments</p>
            <div className="comments_form d-flex w-100 my-2">
                <img src={Profile} alt="" className="rounded-circle mr-3" />
                <form onSubmit={handleComment} className="d-flex flex-grow-1">
                    <input 
                        type="text" 
                        className="flex-grow-1" 
                        placeholder="write a comment"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                    />
                    <button className=" border-0 p-2">Send</button>
                </form>
            </div>
            <div className="comments_list">
                {
                    _comments?.map((comment,index) =>
                        <Comment comment={comment} key={index} />
                    )
                }
            </div>
        </div>
    )
}

export default Comments
