import CommentContainer from 'components/Common/Comment/CommentContainer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Board/Post/PostContent.module.scss';
import api from 'apis/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPost, setCategory } from 'redux/slices/post';
import moment from 'moment';
import { AiFillHeart } from 'react-icons/ai';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false
});

function Post({ category, post, optionalOnDelete, optionalEditHref }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setCategory(category));
  }, [category, router, dispatch]);

  const title = {
    notice: '공지 게시판',
    free: '자유 게시판',
    clubNotice: '동아리 공지 게시판',
    questionAndAnswer: 'Q&A 게시판',
    personal: '활동내용'
  };

  const onDelete = async () => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    if (optionalOnDelete) {
      optionalOnDelete();
      return;
    }
    await api.deletePost(category, post.no, router.query.id);
    router.back();
  };
  const onClickLike = async () => {
    if (post.likedFlag) {
      await api.unLikePost(post.no);
    } else {
      await api.likePost(post.no);
    }
    dispatch(getPost());
  }

  const editHref = optionalEditHref || {
    pathname: `${router.pathname}/edit`,
    query: router.query
  };

  const boardURL =
    category === 'clubNotice' ? `/clubhome/${router.query.id}` : `/${category}`;

  const clubNum = Number(router.query.id);

  return (
    <div className={styles.container}>
      <div>
        {category !== 'clubActivity' && (
          <div className={styles.boardLinkContainer}>
            <Link href={boardURL} passHref>
              <a>{title[category]}</a>
            </Link>
            <Link href={boardURL} passHref>
              <button>목록</button>
            </Link>
          </div>
        )}
        <h1>{post.title}</h1>
        <div className={styles.postHeader}>
          <div className={styles.profileContainer}>
            <Link href={`/profile/${post.studentId}`} passHref>
              <img
                className={styles.profileImage}
                src={`${
                  post.profileImageUrl ??
                  'https://d19lmxaqvbojzg.cloudfront.net/c1f0ad3f1f_test.jpeg'
                }?w=30`}
                alt="profileImage"
              />
            </Link>
            <Link href={`/profile/${post.studentId}`} passHref>
              <div className={styles.profileLink}>{post.name}</div>
            </Link>
          </div>
          <div>
            {Boolean === 'clubActivity' &&
              user &&
              user.club.some(({ no }) => no === clubNum) && (
                <Link
                  href={{
                    pathname: `/profile/${user.id}/${clubNum}/writescraps`,
                    query: { scrapNum: post.no }
                  }}
                  passHref
                >
                  <button>스크랩하기</button>
                </Link>
              )}
            {(Boolean(post.isWriter)) && (
              <>
                <Link href={editHref} passHref>
                  <button>수정하기</button>
                </Link>
                <button onClick={onDelete}>삭제하기</button>
              </>
            )}
            <div>{moment(post.inDate).format('YYYY-MM-DD')}</div>
            <div>조회 {post.hit}</div>
          </div>
        </div>
      </div>
      <hr />
      <ReactQuill value={post.description} theme="bubble" readOnly />
      <button className={`${styles.likeButton} ${(post.likedFlag) && styles.like}`} onClick={onClickLike}>
        <AiFillHeart />
        <span>&nbsp;{post.emotionCount}</span>
      </button>
      {post.comments && <CommentContainer comments={post.comments} />}
    </div>
  );
}

export default Post;
