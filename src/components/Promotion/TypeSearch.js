import React, { useState } from 'react';
import styles from '../../styles/Board/Promotion/typeSearch.module.scss';
import { FaSearch } from 'react-icons/fa';

const TypeSearch = ({
  setSearchItem,
  setSearchKeyword,
  type,
  searchKeyword,
  setType,
  onSearch
}) => {
  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className={styles.container}>
      <ul
        className={styles.tagList}
        onClick={(event) => setSearchItem(event.target.getAttribute('name'))}
      >
        <li name="">#전체</li>
        <li name="IT">#IT</li>
        <li name="음악">#음악</li>
        <li name="친목">#친목</li>
        <li name="게임">#게임</li>
        <li name="운동">#운동</li>
      </ul>
      <select value={type} onChange={onTypeChange}>
        <option value="title">제목</option>
        <option value="clubname">동아리명</option>
      </select>
      <div className={styles.searchContainer}>
        <form className={styles.searchElement} onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="search"
            value={searchKeyword}
            onChange={onChange}
          />
          <FaSearch />
        </form>
      </div>
    </div>
  );
};

export default TypeSearch;
