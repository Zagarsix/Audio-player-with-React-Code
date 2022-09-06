import React from "react";

const AudioControls = ({
    isPlaying,
    PrevTrack,
    playOrPause,
    NextTrack,
}) => {
    return (
        <>
            <div className="footer-btns d-flex justify-content-center text-light sticky-bottom">
                <button
                    type="button"
                    className="btn btn-outline-info"
                    aria-label="Previous"
                    onClick={() => {
                        PrevTrack();
                    }}
                >
                    <i className="mx-2 fa-solid fa-backward-step"></i>
                </button>

                {/* Depending if song is being played, change the buttons */}
                {isPlaying ? (
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        aria-label="Pause"
                        onClick={playOrPause}
                    >
                        <i className="mx-2 fa-solid fa-pause"></i>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        aria-label="Play"
                        onClick={playOrPause}
                    >
                        <i className="mx-2 fa-solid fa-play"></i>
                    </button>
                )}

                <button
                    type="button"
                    className="btn btn-outline-info"
                    aria-label="Next"
                    onClick={() => {
                        NextTrack();
                    }}
                >
                    <i className="mx-2 fa-solid fa-forward-step"></i>
                </button>
            </div>
            <div className="footer fixed-bottom text-center">
                Made with ❤️ by
                <a href="https://github.com/Zagarsix"> Zagarsix</a>
            </div>
        </>
    );
};

export default AudioControls;