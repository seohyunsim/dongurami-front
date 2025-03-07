import { combineReducers } from '@reduxjs/toolkit';
import board from 'redux/slices/board';
import post from 'redux/slices/post';
import clubhome from './slices/clubhome';
import user from 'redux/slices/user';

const reducer = combineReducers({ board, post, clubhome, user });

export default reducer;
