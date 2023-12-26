import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // 确保导入样式
import { addMonths,format } from 'date-fns'



function DoubleMonthView() {
  const [startDate, setStartDate] = useState(new Date()) // 设置初始日期
  const [endDate, setEndDate] = useState(null)
  const onChange = (dates) => {
    const [start, end] = dates
    // setStartDate(start) // 更新开始日期状态
    // setEndDate(end) // 更新结束日期状态
    // console.log(start, end) 
    if (start) {
      console.log(format(start, 'yyyy-MM-dd'))
      // setStartDate(format(start, 'yyyy-MM-dd')) // 格式化选中的开始日期
    }
    if (end) {
      // setEndDate(format(end, 'yyyy-MM-dd')) // 格式化选中的结束日期
      console.log(format(end, 'yyyy-MM-dd'))
    }
  }
  return (
    <div>
      <DatePicker
        inline // 设置为内联模式，始终显示
        selected={startDate} // 当前选中的日期
        onChange={onChange} // 选择日期时更新状态
        monthsShown={2} // 同时显示两个月份
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
          <div>
            <button aria-label="Previous Month" className={'react-datepicker__navigation react-datepicker__navigation--previous'} style={customHeaderCount === 1 ? { visibility: 'hidden' } : null} onClick={decreaseMonth}>
              <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'}>{'<'}</span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button aria-label="Next Month" className={'react-datepicker__navigation react-datepicker__navigation--next'} style={customHeaderCount === 0 ? { visibility: 'hidden' } : null} onClick={increaseMonth}>
              <span className={'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'}>{'>'}</span>
            </button>
          </div>
        )}
      />
    </div>
  )
}

export default DoubleMonthView
