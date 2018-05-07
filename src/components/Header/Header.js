import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = ({ onSubmit, value, onChange, onCancel }) => {
    return (
        <div className={cx('header')}>
            <div className={cx('logo')}>
                <Link to='/'>
                music
                </Link>
            </div>
            <Search
            onSubmit={onSubmit} onChange={onChange} value={value} onCancel={onCancel} />
        </div>
    )
}

export default Header;