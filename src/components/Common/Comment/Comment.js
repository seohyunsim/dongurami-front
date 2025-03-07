import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import api from 'apis/post';
import styles from '../../../styles/Common/Comment/Comment.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from 'redux/slices/post';

// https://newbedev.com/how-to-move-cursor-to-end-of-contenteditable-entity
function setEndOfContenteditable(contentEditableElement) {
  let range, selection;
  range = document.createRange(); //Create a range (a range is a like the selection but invisible)
  range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
  range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
  selection = window.getSelection(); //get the selection object (allows you to change selection)
  selection.removeAllRanges(); //remove any selections already made
  selection.addRange(range); //make the range you have just created the visible selection
}

function Comment({ comment, parentCommentID, setParentCommentID }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const descriptionDiv = useRef();

  useEffect(() => {
    if (!isContentEditable) return;
    descriptionDiv.current.focus();
  }, [isContentEditable]);

  const onEdit = async () => {
    if (isContentEditable) {
      await api.putComment({ category: post.category, pid: post.no, commentID: comment.no, description: descriptionDiv.current.textContent, parentCommentID });
      dispatch(getPost());
    }
    setIsContentEditable(!isContentEditable);
    setEndOfContenteditable(descriptionDiv.current);
  }
  const onDelete = async () => {
    await api.deleteComment({ category: post.category, pid: post.no, commentID: comment.no, parentCommentID });
    dispatch(getPost());
  }

  return (
    <div className={styles.comment}>
      <img src={`https://picsum.photos/500?random=${Math.floor(Math.random() * 9) + 1}`} alt="profile" />
      <div>
        <div>
          <p>{comment.studentName}</p>
          {(post.studentId === comment.studentId) && <p>작성자</p>}
          <div>
            <button onClick={onEdit} className={styles['action-button']}>{(isContentEditable) ? <AiOutlineCheck /> : <AiOutlineEdit />}</button>
            <button onClick={onDelete} className={styles['action-button']}><AiOutlineDelete /></button>
          </div>
        </div>
        <div ref={descriptionDiv} contentEditable={isContentEditable} suppressContentEditableWarning={true}>{comment.description}</div>
        <div>
          <p>{comment.inDate}</p>
          {(comment.no === comment.groupNo) && (
            <p onClick={() => { setParentCommentID(comment.no); }}>답글 쓰기</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
