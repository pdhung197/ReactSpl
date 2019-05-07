import React, { Component } from 'react';

const axios = require('axios');
const musicpath = '/lib/audio/';
const lyricpath = '/lib/data/lyrics/';
const imgmusicpath = '/lib/imgs/music/';

function getTime(time) {
    if (!isNaN(time)) {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
}

function getModeIcon(mode) {
    switch (mode) {
        case 2:
        case 1:
            return 'undo';
        case 3:
            return 'random';
        default:
            return 'grip-lines'
    }
}

export function selectTrack(trackid) {
    this.setState({
        selectedTrack: trackid,
        change: true
    });
}

class MusicApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrack: null,
            player: "stopped",
            change: true,
            playmode: 0,
            muted: false,
            vol: 1
        };
        this.currenttimetext = React.createRef();
        this.durationtimetext = React.createRef();
        // eslint-disable-next-line
        selectTrack = selectTrack.bind(this);
        this.setVolumnPlayer = this.setVolumnPlayer.bind(this);
        this.setPlayerMode = this.setPlayerMode.bind(this);
    }

    setPlayerMode(control, playmode) {
        playmode = playmode === 3 ? 0 : playmode + 1;
        const playerstate = {};
        if (control) {
            if (control === 'next' || control === 'back') {
                const musicdata = this.props.musicdata;
                let indexofselectedtrack = musicdata.findIndex((track) => { return track.id === this.state.selectedTrack });
                let indexnexttrack = control === 'next' ? (indexofselectedtrack + 1 === musicdata.length ? 0 : indexofselectedtrack + 1) : (indexofselectedtrack > 0 ? indexofselectedtrack - 1 : musicdata.length - 1);
                playerstate['selectedTrack'] = musicdata[indexnexttrack].id;
                playerstate['change'] = true;
            }
            else playerstate['player'] = control;
        }
        if (!(playmode === null || playmode === undefined || isNaN(playmode))) {
            this.player.loop = false;
            if (playmode === 1) this.player.loop = true;
            playerstate['playmode'] = playmode;
        }
        if (!Object.keys(playerstate).length) return;
        this.setState(playerstate);
    }

    setVolumnPlayer(vol, mode) {
        if (mode === 'change') {
            this.player.volume = vol;
            this.setState({
                muted: false,
                vol
            });
        }
        else {
            this.player.muted = !this.player.muted;
            this.setState({
                muted: this.player.muted
            });
        }
    }
    componentDidMount() {
        this.player.addEventListener("timeupdate", e => {
            if (this.inputrange) this.inputrange.value = e.target.currentTime;
            if (!this.currenttimetext) return;
            this.currenttimetext.value = e.target.currentTime;
            this.durationtimetext.value = e.target.duration;
            this.currenttimetext.innerText = (e.target.currentTime) ? getTime(e.target.currentTime) : "0:00";
            this.durationtimetext.innerText = (e.target.duration) ? getTime(e.target.duration) : "0:00";

            this.inputrangeback.style.width = (isNaN(parseFloat(e.target.currentTime)) || isNaN(parseFloat(e.target.duration))) ? '0' : parseFloat(e.target.currentTime) * 100 / parseFloat(e.target.duration) + 0.5 + '%';
            this.inputrange.max = isNaN(parseInt(e.target.duration)) ? 0 : parseInt(e.target.duration);
            this.inputrange.defaultValue = isNaN(parseFloat(e.target.currentTime)) ? 0 : parseFloat(e.target.currentTime);
            if (this.player.ended) {
                const musicdata = this.props.musicdata;
                switch (this.state.playmode) {
                    case 2:
                        let indexofselectedtrack = musicdata.findIndex((track) => { return track.id === this.state.selectedTrack });
                        let indexnexttrack = indexofselectedtrack + 1 === musicdata.length ? 0 : indexofselectedtrack + 1;
                        selectTrack(musicdata[indexnexttrack].id);
                        break;
                    case 3:
                        let nexttrack = musicdata[Math.floor(Math.random() * musicdata.length)].id;
                        selectTrack(nexttrack);
                        break;
                    default:
                        this.setPlayerMode("stopped");
                        break;
                }
            }
        });

        this.inputrange.addEventListener("change", e => {
            this.player.pause();
            this.player.currentTime = e.target.value;
            this.player.play();
            this.setState({
                player: "playing",
                currentTime: e.target.value
            });
        });
    }

    componentWillUnmount() {
        this.player.removeEventListener("timeupdate", () => { });
        this.inputrange.removeEventListener("change", () => { });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTrack !== null && this.state.change && !(!this.props.musicdata || !this.props.musicdata.length)) {
            const musicdata = this.props.musicdata;
            let trackindex = musicdata.findIndex((track) => { return track.id === this.state.selectedTrack });
            if (trackindex > -1) {
                let track = musicpath + musicdata[trackindex].filename;
                this.playerthumb.src = (musicdata[trackindex].thumb) ? imgmusicpath + musicdata[trackindex].thumb : "";
                this.songtitle.innerText = musicdata[trackindex].song;
                this.songartist.innerText = musicdata[trackindex].artist ? musicdata[trackindex].artist : 'Unknown';
                this.songauthor.innerText = musicdata[trackindex].author ? musicdata[trackindex].author : 'Unknown';
                if (musicdata[trackindex].lyric) axios.get(lyricpath + musicdata[trackindex].lyric)
                    .then(response => {
                        if (response) {
                            this.props.setLyric(response.data);
                        }
                    });
                this.player.src = track;
                this.player.play();
                this.setState({ player: "playing", duration: this.player.duration, change: false });
            }
        }
        if (this.state.player !== prevState.player) {
            if (this.state.player === "paused") {
                this.player.pause();
            } else if (this.state.player === "updatetimming") {
                this.player.pause();
                this.player.currentTime = this.inputrange.value;
                this.player.play();
                this.setState({
                    player: "playing",
                    currentTime: this.inputrange.value
                });
            } else if (this.state.player === "stopped") {
                this.player.pause();
                this.player.currentTime = 0;
                this.inputrange.value = 0;
            } else if (this.state.player === "playing") {
                this.player.play();
            }
        }
    }

    render() {
        return (
            <div className="musicplayer__player">
                <div className="musicplayer__thumbnail">
                    <img ref={ref => (this.playerthumb = ref)} src="/lib/imgs/unnamed.jpg" alt="" />
                </div>
                <div className="musicplayer__control">
                    <div className="musicplayer__songinfo text-center">
                        <h4 className="musicplayer__songtitle" ref={ref => (this.songtitle = ref)}>_</h4>
                        <h6 className="musicplayer__songartist">Artist: <span ref={ref => (this.songartist = ref)}>_</span></h6>
                        <p className="musicplayer__songauthor">Author: <span ref={ref => (this.songauthor = ref)}>_</span></p>
                    </div>
                    <audio ref={ref => (this.player = ref)} />
                    <div className="musicplayer__timeline">
                        <span ref={(ref) => this.currenttimetext = ref}>0:00</span>
                        <div className="musicplayer__slidercontainer">
                            <div ref={ref => (this.inputrangeback = ref)} className="musicplayer__sliderback"></div>
                            <input type="range" name="" ref={ref => (this.inputrange = ref)} min="0" step="0.001" defaultValue="0" className="musicplayer__slider" />
                        </div>
                        <span ref={(ref) => this.durationtimetext = ref}>0:00</span>
                    </div>
                    <div className="musicplayer__btngroup">
                        <div className="musicplayer__groupsound">
                            <button ref={ref => (this.volumebtn = ref)} onClick={(e) => this.setVolumnPlayer(0)} className="musicplayer__btn"><i className={"fas fa-volume-" + (this.state.muted ? 'mute' : (parseFloat(this.state.vol) === 0 ? 'off' : (parseFloat(this.state.vol) > 0.5 ? 'up' : 'down')))}></i></button>
                            <div className="musicplayer__volumecontainer">
                                <div ref={ref => (this.inputvolumerangeback = ref)} className="musicplayer__volumesliderback"></div>
                                <input type="range" name="" ref={ref => (this.inputvolumerange = ref)} min="0" step="0.001" defaultValue="1" max="1" onChange={(e) => this.setVolumnPlayer(e.target.value, "change")} className="musicplayer__volumeslider" />
                            </div>
                        </div>
                        <div className="musicplayer__groupcontrol">
                            <button className="musicplayer__btn" onClick={() => this.setPlayerMode("back")}><i className="fas fa-step-backward"></i></button>
                            {
                                (
                                    (this.state.player === "paused" || this.state.player === "stopped") ?
                                        (<button className="musicplayer__btn musicplayer__playpause" onClick={() => this.setPlayerMode("playing")}><i className="fas fa-play"></i></button>)
                                        :
                                        (<button className="musicplayer__btn musicplayer__playpause" onClick={() => this.setPlayerMode("paused")}><i className="fas fa-pause"></i></button>)
                                )
                            }
                            <button className="musicplayer__btn" onClick={() => this.setPlayerMode("stopped")}><i className="fas fa-stop"></i></button>
                            <button className="musicplayer__btn" onClick={() => this.setPlayerMode("next")}><i className="fas fa-step-forward"></i></button>
                        </div>
                        <div className="musicplayer__groupmode">
                            <button className="musicplayer__btn" value={this.state.playmode} onClick={(e) => this.setPlayerMode(null, this.state.playmode)}><i className={"fas fa-" + getModeIcon(this.state.playmode)}><small className={this.state.playmode === 2 ? 'visible' : 'invisible'}>all</small></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicApp;