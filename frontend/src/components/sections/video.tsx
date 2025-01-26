import React from 'react';

const Video = () => {
    return (
        <div className="videoContainer">
            <div className="videoWrapper">
                <iframe
                    className="youtubeVideo"
                    src="https://www.youtube.com/embed/3IJAy1LFRrU" // Remplacez VIDEO_ID par l'ID de votre vidéo
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Video;