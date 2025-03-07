import React from "react";
import styles from "../../../styles/Club/Home/Apply/Additional.module.scss";
import { HiPencil } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";

const Additional = ({
  questions,
  onRemove,
  onUpdate,
  isUpdate,
  onAnswerInputChange,
  updateQuestionInput,
  onUpdateInputChange,
  leader,
  userInfo,
}) => {
  return (
    <div className={styles.additional}>
      <ul>
        {questions.map((el, i) => {
          return (
            <li id={i} key={i}>
              {isUpdate[i] ? (
                <input
                  ref={updateQuestionInput}
                  type="text"
                  defaultValue={el.question}
                  onChange={onUpdateInputChange}
                />
              ) : (
                <span>{el.description}</span>
              )}
              {leader === userInfo.id && (
                <>
                  <HiPencil onClick={() => onUpdate(i, el.no)} />
                  <FaTrashAlt
                    id={styles.remove}
                    onClick={() => onRemove(el.no)}
                  />
                </>
              )}

              <textarea onChange={onAnswerInputChange} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Additional;
