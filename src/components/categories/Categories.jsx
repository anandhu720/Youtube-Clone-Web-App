import React,{useState} from 'react';
import "./_categories.scss";

import {getPopularVideos ,getVideosByCategory} from '../../redux/actions/videos.action';
import {useDispatch} from 'react-redux';

const Categories = () => {

    const dispatch = useDispatch();

    const [activeElement,setActiveElement] = useState("All")

    const keywords = [
        "All",
        "React js",
        "Angular js",
        "React native",
        "use of API",
        "Redux",
        "Music",
        "Algorithm Art",
        "Guitar",
        "Coding",
        "Malayalam Songs",
        "Football",
        "English",
        "Malayalam Film",
        "Audi",
        "Rolls Royce",
        "Dubai",
        "Space X",
        "Gym",
        "Bikes"
    ]

    const handleClick = (value) => {
        setActiveElement(value);
        if(value === 'All')
            dispatch(getPopularVideos());
        else
            dispatch(getVideosByCategory(value))
    }


    return (
        <div className="categories">
            {
                keywords.map((keyword,i) =>
                    <span
                        key={i} 
                        onClick={() => handleClick(keyword)}
                        className={activeElement === keyword && "active" }
                    >
                    {keyword}
                    </span>
                )
            }
        </div>
    )
}

export default Categories
