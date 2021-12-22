import React from 'react'
import styles from "./styles.module.css";
function WorkTime() {
    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <h5>Giờ Mở Cửa</h5>
                <p>Thứ 2 đến thứ 6 từ 08:30 sáng đến 06:00 tối</p>
            </div>
        </div>
    )
}

export default WorkTime
