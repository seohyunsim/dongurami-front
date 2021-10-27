import styles from '../../../styles/Club/Home/Schedule/DailyControl.module.scss';
import { HiPencil } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { getInfo, deleteSchedule, importantSchedule } from 'apis/calendar';
import { useEffect } from 'react';

const DailyControl = ({
  setTitle,
  setPeriod,
  setNo,
  schedule,
  date,
  setPop,
  pop,
  setColor,
  today,
  setSchedule,
  Qdata
}) => {
  const onClickModify = (el) => {
    setTitle(el.title);
    setPeriod([el.startDate, el.endDate]);
    setNo(el.no);
    setColor(el.colorCode);
    setPop('ScheduleModify');
  };

  const onDeleteSchedule = async (el) => {
    await deleteSchedule(Qdata.id, el)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data.msg));
    await getInfo(Qdata.id, today.format('YYYY-MM'))
      .then((res) => setSchedule(res.data.result))
      .catch((err) => {
        alert(err);
      });
  };

  const axiosPATCH = (el, e) => {
    importantSchedule(Qdata.id, el, { important: e }).then((res) =>
      getInfo(Qdata.id, today.format('YYYY-MM')).then((res) =>
        setSchedule(res.data.result)
      )
    );
  };

  if (pop === 'DailyControl')
    return (
      <div className={styles.wrap} onClick={() => setPop('Calendar')}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h3>{date} 일정</h3>
          </div>
          <MdClose
            className={styles.closeBtn}
            onClick={() => setPop('Calendar')}
          />
          <div className={styles.body}>
            <div className={styles.schedule}>
              {schedule.map((el, index) => {
                return Date.parse(el.startDate) <= Date.parse(date) &&
                  Date.parse(date) <= Date.parse(el.endDate) ? (
                  <div key={index} className={styles.des}>
                    {el.important ? (
                      <AiFillStar
                        className={styles.fillStar}
                        onClick={() => {
                          axiosPATCH(el, 0);
                        }}
                      />
                    ) : (
                      <AiOutlineStar
                        className={styles.outLineStar}
                        onClick={() => {
                          axiosPATCH(el, 1);
                        }}
                      />
                    )}
                    <span style={{ color: 'black' }} key={el.no}>
                      {el.title}
                    </span>
                    <div className={styles.edit}>
                      <HiPencil
                        onClick={() => onClickModify(el)}
                        className={styles.pencil}
                      />
                      <FaTrashAlt
                        onClick={() => {
                          if (el.important === 0) {
                            onDeleteSchedule(el);
                          } else alert('주요 일정은 삭제 할 수 없습니다.');
                        }}
                        className={styles.delete}
                      />
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default DailyControl;
