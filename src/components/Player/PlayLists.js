import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlayLists.scss';

const cx = classNames.bind(styles);
/*
class PlayLists extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    Items = this.props.list.map(({id, title, artist, album}, index) => (
        <li onDoubleClick={() => this.props.onPlay(index)} className={cx({
            'on' : index === this.props.playIndex,
        })} key={index}>
            <img className={cx('img')} src={`//127.0.0.1:4000/music/cover/${id}`} alt={title} />
            <ul className={cx('info')}>
                <li>{title}</li>
                <li className={cx('artist')}>{artist}</li>
                <li className={cx('album')}>{album}</li>
                {index}, {this.props.playIndex}
            </ul>
        </li>
    ));

    render() {
        return(
            <div>
            <div className={cx('bg2')}></div>
            <div className={cx('bg')}></div>
            <div className={cx('lists')}>
                <div className={cx('content')}>
                    <h1><span className={cx('fa fa-music')}></span>재생목록</h1>
                    <ul className={cx('list')}>
                        { this.Items }
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}

export default PlayLists;
*/

const PlayLists = ({ list, onToggle, onPlay, playIndex }) => {
    
    const Item = ({id, title, artist, album, index}) => (
        <li onClick={() => onPlay(index)} className={cx({
            'on' : index === playIndex,
        })}>
            <img className={cx('img')} src={`//127.0.0.1:4000/music/cover/${id}`} alt={title} />
            <ul className={cx('info')}>
                <li>{title}</li>
                <li className={cx('artist')}>{artist}</li>
                <li className={cx('album')}>{album}</li>
            </ul>
        </li>
    );

    const Items = list.map(({id, title, artist, album}, index) => (
        <Item
            id={id}
            title={title}
            artist={artist}
            album={album}
            index={index}
            key={index}
        />
    ));

    return (
        <div>
            <div className={cx('bg2')}></div>
            <div className={cx('bg')}></div>
            <div className={cx('lists')}>
                <div className={cx('content')}>
                    <h1><span className={cx('fa fa-music')}></span>재생목록</h1>
                    <ul className={cx('list')}>
                        { Items }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PlayLists;
