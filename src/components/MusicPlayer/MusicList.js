import React, { Component } from 'react';
import { selectTrack } from './MusicApp';
const imgmusicpath = '/lib/imgs/music/';

function GetIconPlayer(track) {
    switch (track.player) {
        case 'playing':
            return (<i className="fas fa-play"></i>);
        case 'paused':
            return (<i className="fas fa-pause"></i>);
        case 'stopped':
            return (<i className="fas fa-stop"></i>);
        default:
            return (<></>);
    }
}

class MusicListItem extends Component {
    constructor(props) {
        super(props);
        this.selectTrackId = this.selectTrackId.bind(this);
    }
    selectTrackId(e) {
        selectTrack(this.props.songid);
        e.preventDefault();
    }
    render() {
        return (
            <li className="musicplayer__listlink">
                <a href="/link" onClick={(e) => this.selectTrackId(e)}>
                    <div className="musicplayer__listthumb">
                        <img src={this.props.thumb} alt="Thumbnail" />
                    </div>
                    <div className="musicplayer__listinfo">
                        <h6 className="musicplayer__infotitle"><span><GetIconPlayer player={this.props.player} />{this.props.song}</span></h6>
                        <p className="musicplayer__infoartist">{this.props.artist}</p>
                        <p className="musicplayer__infocount"><span>Listent: {this.props.listent}</span><span>Download: {this.props.download}</span></p>
                    </div>
                </a>
            </li>
        )
    }
}

class MusicList extends Component {
    render() {
        const musicdata = this.props.musicdata;
        return (
            <ul className="musicplayer__listitembody">
                {
                    (!musicdata || !musicdata.length) ? (<></>) : (
                        musicdata.map((item, index) => {
                            return (
                                <MusicListItem key={index} songid={item.id} song={item.song} artist={item.artist} player={this.props.seletedtrack === item.id ? this.props.player : ""} clickevent={this.props.clickevent} thumb={imgmusicpath + item.thumb} listent={item.listent} download={item.download} />
                            )
                        })
                    )
                }
            </ul>
        )
    }
}

export default MusicList;