import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Player from 'components/Player/Player';
import PlayLists from 'components/Player/PlayLists';
import * as playerActions from '../store/Player';

class PlayerContainer extends React.Component {

    constructor(props) {
        super(props);

        this.audio = new Audio();
        this.audio.autoplay = false;

        this.handleRepeat = this.handleRepeat.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.setProgress = this.setProgress.bind(this);
        this.handlePlaylist = this.handlePlaylist.bind(this);
        this._play = this._play.bind(this);
        this.playByIndex = this.playByIndex.bind(this);
        
        this.audio.addEventListener('timeupdate', e => {
            this.updateProgress();
            if ( (this.audio.duration - 1) <= this.audio.currentTime ) { // 임시방편
                this.handleNext();
            }
        });
        this.audio.addEventListener('ended', e => {
            console.log('ended');
            this.handleNext();
        });

        props.PlayerActions.play_function(this._play);
    }

    _play = (id) => {
        let mp3 = 'http://127.0.0.1:4000/music/mp3/' + id + '/320';
        
        if ( this.audio.src !== mp3 ) {
            this.audio.src = mp3;
            this.audio.load();
        }

        this.audio.play();
        this.props.PlayerActions.play(true);   
    }

    playByIndex = (index) => {
        const id = this.props.playlist[index].id;
        this.audio.currentTime = 0; // 재시작
        this._play(id);
        this.props.PlayerActions.set_playindex(index); // index설정
    }

    handlePrevious = () => {
        const total = this.props.playlist.length;
        const { playIndex } = this.props.player;

        const newSongIndex = playIndex > 0 ? playIndex - 1 : total - 1;

        this.playByIndex(newSongIndex);
    }

    handleNext = () => {
        const { playIndex, random, repeat } = this.props.player;
        const total = this.props.playlist.length;

        const newSongIndex = random ? Math.floor(Math.random() * (total)) : 
                                repeat ? playIndex : 
                                playIndex < total - 1 ? playIndex + 1 : 0;

        this.playByIndex(newSongIndex);
    }
    
    handlePlay = () => {
        // 플레이 리스트 비어있는경우
        if ( !this.props.playlist.length ) {
            alert('재생목록이 비어있습니다.');
            return false;
        }

        if ( this.props.player.playing ) {
            this.audio.pause();
            this.props.PlayerActions.play(false);
        }else{
            this._play(this.props.playlist[this.props.player.playIndex].id);
        }
    };

    updateProgress = () => {
        const { duration, currentTime } = this.audio;
        const progress = (currentTime * 100) / duration;

        this.props.PlayerActions.set_progress(progress);
    }

    setProgress = (e) => {
        const target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        const width = target.clientWidth;
        const rect = target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const duration = this.audio.duration;
        const currentTime = (duration * offsetX) / width;
        const progress = (currentTime * 100) / duration;

        this.audio.currentTime = currentTime;
        this.props.PlayerActions.set_progress(progress);
    }

    handleRepeat = () => {
        this.props.PlayerActions.repeat(!this.props.player.repeat);
    }

    handleRandom = () => {
        this.props.PlayerActions.random(!this.props.player.random);
    }

    handlePlaylist = () => {
        this.props.PlayerActions.toggle_playlist(!this.props.player.playlist);
    }

    render() {
        //console.log(this.props.player);
        return ( 
            //<div onClick={this.props.player.play_function(1)}>aa</div>
            <div>
                <Player 
                    onPlay={this.handlePlay}
                    onRepeat={this.handleRepeat} 
                    onRandom={this.handleRandom}
                    onProgress={this.setProgress}
                    onPlaylist={this.handlePlaylist}
                    onPrevious={this.handlePrevious}
                    onNext={this.handleNext}
                    player={this.props.player}
                    playingId={ this.props.player.progress ? this.props.playlist[this.props.player.playIndex].id : 0}
                    currentTime={ this.audio.currentTime }
                    duration={ this.audio.duration ? this.audio.duration : 0 }
                />
                { this.props.player.playlist ? <PlayLists list={this.props.playlist} onPlay={this.playByIndex} playIndex={this.props.player.playIndex} /> : '' }
            </div>
        );
    }

}

export default connect(
    (state) => ({
        playlist: state.PlayLists.toJS(),
        player: state.Player.toJS()
    }),
    (dispatch) => ({
        PlayerActions: bindActionCreators(playerActions, dispatch),
    })
)(PlayerContainer)