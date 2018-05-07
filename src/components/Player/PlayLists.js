import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlayLists.scss';

const cx = classNames.bind(styles);

const PlayLists = ({ list, onToggle }) => {
    
    const Item = ({id, title, artist, album, index}) => (
        <li>
            <img className={cx('img')} src={`//127.0.0.1:4000/music/cover/${id}`} alt={title} />
            <ul className={cx('info')}>
                <li>{title}</li>
                <li>{artist}</li>
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
        <div className={cx('lists')}>
            <h1><span className={cx('fa fa-music')}></span>재생목록</h1>
            <ul className={cx('list')}>
                { Items }
            </ul>
        </div>
    );
}

export default PlayLists;