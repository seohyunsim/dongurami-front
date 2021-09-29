import React, { useCallback } from "react";
import styles from "../../styles/Board/Promotion/Post.module.scss";
import PromotionCommentContainer from "./Comment/PromotionCommentContainer";
import { useRouter } from "next/router";
import getToken from "utils/getToken";
import axios from "axios";

const Post = ({ postData, postId, setPostData, comments }) => {
  const { name, hit, title, inDate, description } = postData;
  const token = getToken();
  const router = useRouter();

  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div>
          <div>홍보게시판</div>
          <div>{title}</div>
          <div>
            <div>{name}</div>
            <div>
              <div>{inDate}</div>
              <div>조회 {hit}</div>
            </div>
          </div>
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <PromotionCommentContainer comments={comments} />
      </div>
    </div>
  );
};

export default Post;
