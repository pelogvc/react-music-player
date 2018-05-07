import React from 'react';
import classNames from 'classnames/bind';
import styles from './MusicTable.scss';
import Fa from 'react-fontawesome';
/*
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../../store/PlayLists';
*/

const cx = classNames.bind(styles);

const MusicTable = ({ data, onLoading, title, onAddPlaylist }) => {

    const Item = ({id, title, artist, album, index}) => (
        <tr>
            <td className={cx('index')}>
                <img src={`//127.0.0.1:4000/music/cover/${id}`} alt={title} />
                <span className={cx('rank')}>
                    {index+1}
                </span>
            </td>
            <td className={cx('title')}>
                {title}
                <Fa name="play" className={cx('play')} onClick={() => onAddPlaylist(id)} />
            </td>
            <td className={cx('artist')}>{artist}</td>
            <td className={cx('album')}>{album}</td>
        </tr>
    );
    
    const Items = Array.isArray(data) && data.map(({id, title, artist, album}, index) => (
        <Item 
            id={id}
            title={title}
            artist={artist}
            album={album}
            index={index}
            key={id}
        />
    ));

    return (
        <div className={cx('chart')}>
            <h1 className={cx('title')}>{title}</h1>
            { 
                //onLoading && <div className={cx('loading')}> loading </div> 
            }
            <table className={cx('list')}>
                <thead>
                    <tr>
                        <th className={cx('index')}></th>
                        <th className={cx('title')}>곡명</th>
                        <th className={cx('artist')}>아티스트</th>
                        <th className={cx('album')}>앨범</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(data) && Items }
                </tbody>
            </table>
        </div>
    );
}

export default MusicTable;
/*
export default connect(
    (dispatch) => ({
        playlistActions: bindActionCreators(playlistActions, dispatch),
    })
)(MusicTable); */