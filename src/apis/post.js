import axios from 'apis/index';

const api = {
  getPost: (category, pid) => {
    if (category === 'clubNotice') {
      return axios.get(`/api/club/board/clubNotice/2/${pid}`);
    }
    return axios.get(`/api/board/${category}/${pid}`);
  },
  deletePost: (category, pid) => {
    if (category === 'clubNotice') {
      return axios.get(`/api/club/board/clubNotice/2/${pid}`);
    }
    return axios.delete(`/api/board/${category}/${pid}`);
  },
  postComment: ({ category, pid, id, description, parentCommentID }) => {
    if (category === 'clubNotice') {
      return axios.post(`/api/club/board/clubNotice/2/${pid}`, { id, description });
    }
    if (parentCommentID) {
      return axios.post(`/api/board/${category}/${pid}/${parentCommentID}`, { id, description });
    } else {
      return axios.post(`/api/board/${category}/${pid}`, { id, description });
    }
  },
  putComment: ({ category, pid, commentID, description, parentCommentID }) => {
    if (category === 'clubNotice') {
      return axios.put(`/api/club/board/clubNotice/2/${pid}/${commentID}`, { description });
    }
    if (parentCommentID) {
      return axios.put(`/api/board/${category}/${pid}/${parentCommentID}/${commentID}`, { description });
    } else {
      return axios.put(`/api/board/${category}/${pid}/${commentID}`, { description });
    }
  },
  deleteComment: ({ category, pid, commentID, parentCommentID }) => {
    if (category === 'clubNotice') {
      return axios.delete(`/api/club/board/clubNotice/2/${pid}/${commentID}`);
    }
    if (parentCommentID) {
      return axios.delete(`/api/board/${category}/${pid}/${parentCommentID}/${commentID}`);
    } else {
      return axios.delete(`/api/board/${category}/${pid}/${commentID}`);
    }
  }
}

export default api;
