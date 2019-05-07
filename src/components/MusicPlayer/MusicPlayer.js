import React, { Component } from 'react';
import MusicList from './MusicList';
import MusicApp from './MusicApp';
import './style/MusicPlayer.scss';
const axios = require('axios');


class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicdata: []
        };
        this.setLyric = this.setLyric.bind(this);
    }

    componentDidMount() {
        axios.get('/lib/data/musicdata.json')
            .then(response => {
                if (response) {
                    this.setState({
                        musicdata: response.data
                    });
                }
            });
    }

    setLyric(lyricdata) {
        this.lyricarea.innerText = lyricdata;
    }

    render() {
        const musicdata = this.state.musicdata;
        return (
            <div className="row musicplayer__container">
                <div className="col-md-8 col-sm-12 musicplayer__app">
                    <MusicApp musicdata={musicdata} setLyric={this.setLyric} />
                    <div className="musicplayer__lyric">
                        <div className="musicplayer__lyricbody" ref={ref => (this.lyricarea = ref)}>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 musicplayer__list">
                    <div className="musicplayer__listbody">
                        <div className="musicplayer__listheader">
                            <h5>Music Playlist</h5>
                        </div>
                        {
                            (!musicdata || !musicdata.length) ? <></> : <MusicList musicdata={musicdata} seletedtrack={this.state.selectedTrack} clickevent={this.selectTrack} player={this.state.player} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MusicPlayer;