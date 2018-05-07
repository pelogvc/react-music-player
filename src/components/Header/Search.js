import React from 'react';
import styles from './Search.scss';
import classNames from 'classnames/bind';
import Fa from 'react-fontawesome';

const cx = classNames.bind(styles);

const Search = ({ onSubmit, value, onChange, onCancel }) => {
    return (
        <form onSubmit={onSubmit} className={cx('form')}>
            <input value={value} onChange={onChange} className={cx('input')} placeholder="검색어를 입력해주세요." />
            <Fa onClick={onCancel} name="times-circle" className={cx('cancel')} />
        </form>
    )
}

export default Search;