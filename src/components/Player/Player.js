import React from 'react';
import classNames from 'classnames/bind';
import styles from './Player.scss';

const cx = classNames.bind(styles);

/*
const Player = ({ 
    onPlay, 
    onRepeat, 
    onRandom, 
    onProgress, 
    onPrevious,
    onNext,
    player, 
    playingId, 
    currentTime, 
    duration, 
    onPlaylist
}) => {
*/

class Player extends React.Component {
    render() {
        const { 
            onPlay, 
            onRepeat, 
            onRandom, 
            onProgress, 
            onPrevious,
            onNext,
            player, 
            playingId, 
            currentTime, 
            duration, 
            onPlaylist
        } = this.props;

        return (
            <div className={cx('player')}>
                <div className={cx('progressbar')} onClick={ e => onProgress(e) }>
                    <span className={cx('bar')} style={{width: player.progress + '%'}}></span>
                </div>
                <div className={cx('controls')}>
                    <span className={cx({
                        'fa': 'true',
                        'fa-random': 'true',
                        'random': 'true',
                        'on': player.random,
                    })} onClick={onRandom} />
                    <span className={cx({
                        'fa': 'true',
                        'fa-repeat': 'true',
                        'repeat': 'true',
                        'on': player.repeat,
                    })} onClick={onRepeat} />
                    <span className={cx(['fa','fa-volume-up','volume'])} />
                </div>
                <span className={cx({
                    'fa': 'true',
                    'fa-align-justify': 'true',
                    'playlister': 'true',
                    'on': player.playlist,
                })} onClick={onPlaylist} />
                <div className={cx('control')}>
                    <span
                        className={cx(['fa','fa-step-backward','backward'])}
                        onClick={onPrevious}
                    />
                    <span className={cx({
                        'fa' : true,
                        'play' : true,
                        'fa-play' : !player.playing,
                        'fa-pause' : player.playing,
                    })} onClick={onPlay} />
                    <span
                        className={cx(['fa','fa-step-forward','forward'])}
                        onClick={onNext}
                    />
                    <div className={cx('info')}>
                        <div className={cx('picture')}>
                            { player.progress > 0 ? <img src={`//127.0.0.1:4000/music/cover/${playingId}`} alt='asdf' /> : '' }
                        </div>
                        <ul className={cx('lyrics')} ref={(node) => { this.lyrics = node; }}>
                            <li className={cx({
                                'nothing' : !player.progress,
                            })}>재생중인 노래가 없습니다.</li>
                            <li></li>
                        </ul>
                        <div className={cx('times')}>
                            <span className={cx('start')}>
                                { currentTime > 60 ? String(Math.floor(currentTime/60)).padStart(2, '0') : `00` }
                                :
                                { Math.floor(currentTime)%60 > 0 ? String(Math.floor(currentTime)%60).padStart(2, '0') : `00` }
                            </span>
                            <span className={cx('end')}>
                                { duration > 60 ? String(Math.floor(duration/60)).padStart(2, '0') : `00` }
                                :
                                { Math.floor(duration)%60 > 0 ? String(Math.floor(duration)%60).padStart(2, '0') : `00` }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;