import Amenities from "../Amenities"
import { amenities, translatedData } from "./data"

const BookingRoom = ({isModalOpen,setModalOpen}) => {
  return (
    <section className=" h-screen w-screen absolute top-0 backdrop-blur-[20px] bg-opacity-50 flex justify-center items-center z-10">
      <div className=" w-[1110px] flex gap-[30px] bg-white  pr-[94px]">
        <form className=" w-[40%] text-white text-sm bg-room-primaryGreen pt-[51px] px-[65px]  pb-[26px]">
          <label htmlFor="userName" className="block mb-[7px]">
            姓名
          </label>
          <input type="text" id="userName" className="block text-room-secondaryGray w-full h-[38px] mb-4 pl-2" placeholder="王小明" />
          <label htmlFor="phoneNumber" className="block mb-[7px]">
            手機號碼
          </label>
          <input type="text" id="phoneNumber" className="block text-room-secondaryGray w-full h-[38px] mb-4 pl-2" placeholder="0912345678" />
          <label htmlFor="checkIn" className="block mb-[7px]">
            入住日期
          </label>
          <select name="" id="checkIn" className=" text-room-secondaryGray w-full h-[38px] pl-2 mb-4">
            <option value="">2019-08-19</option>
          </select>
          <label htmlFor="checkOut" className="block mb-[7px]">
            退房日期
          </label>
          <select name="" id="checkOut" className=" text-room-secondaryGray w-full h-[38px] pl-2">
            <option value="">2019-08-20</option>
          </select>
          <p className=" text-room-secondaryGreen pb-3.5 pt-4 border-b border-room-secondaryGreen">2天，1晚平日</p>
          <div className=" text-right mt-2.5 mb-5">
            <h3>總計</h3>
            <p className=" text-[26px] leading-[36px]">
              $<span>1,380</span>
            </p>
          </div>
          <button type="submit" className=" w-full font-bold py-2 border border-white text-lg mb-[18px] hover:bg-room-secondaryGreen hover:border-room-secondaryGreen">
            確認送出
          </button>
          <p className="text-xs w-full text-center">此預約系統僅預約功能，並不會對您進行收費</p>
        </form>
        <div className=" w-[60%] pt-[51px] text-room-primaryGreen mb-2 relative pb-[26px]">
          <img src="./src/assets/cancel.svg" alt="" className=" absolute top-[39px] right-[-42px] cursor-pointer hover:scale-110" onClick={() => setModalOpen(!isModalOpen)} />
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mb-2">Single Room</h2>
            <div className="flex-grow h-[1px] bg-room-secondaryGreen ml-[6.5px] opacity-20"></div>
          </div>
          <div className="mb-7">
            <p>1人・ 單人床・附早餐・ 衛浴1間・18平方公尺</p>
            <p>平日（一～四）價格：1380 / 假日（五〜日）價格：1500</p>
          </div>
          <ul className="flex items-center flex-wrap gap-x-1 gap-y-4  mb-[26px]">
            {Object.entries(amenities).map(([amenityName, isAvailable]) => {
              if (isAvailable) {
                return <Amenities key={amenityName} amenitiesImg={amenityName} amenitiesName={translatedData[amenityName]} />
              }
              return null
            })}
          </ul>
          <div className="flex items-center mb-3">
            <h2 className="text-base font-bold">訂房資訊</h2>
            <div className="flex-grow h-[1px] bg-room-secondaryGreen ml-[6.5px] opacity-20"></div>
          </div>
          <ul className="list-disc text-xs leading-[26px] mb-3 ml-4">
            <li>入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。</li>
            <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
            <li>好室旅店全面禁止吸菸。</li>
            <li>若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。</li>
          </ul>
          <div className="flex items-center mb-[19px]">
            <h2 className="text-base font-bold">預約流程</h2>
            <div className="flex-grow h-[1px] bg-room-secondaryGreen ml-[6.5px] opacity-20"></div>
          </div>
          <ul className="flex w-full justify-between">
            <li className="w-[160px] ">
              <div className=" bg-room-secondaryGreen h-[50px] flex justify-center items-center">
                <img src="./src/assets/BookingProcess-1.svg" alt="BookingProcess-1" />
              </div>
              <div className="pt-3 pb-[18px] text-center border border-room-secondaryGreen rounded-b-[10px] min-h-[86px]">
                <p className="text-xs leading-[30px]">送出線上預約單</p>
              </div>
            </li>
            <li className="mt-[14px]">
              <img src="./src/assets/arrowRight.svg" alt="" />
            </li>
            <li className="w-[160px]">
              <div className=" bg-room-secondaryGreen h-[50px] flex justify-center items-center">
                <img src="./src/assets/BookingProcess-2.svg" alt="BookingProcess-2" />
              </div>
              <div className="pt-3 pb-[18px] text-center border border-room-secondaryGreen rounded-b-[10px] min-h-[86px]">
                <p className="text-xs leading-[18px]">
                  系統立即回覆是否預訂成功 並以簡訊發送訂房通知
                  <br />
                  (若未收到簡訊請來電確認)
                </p>
              </div>
            </li>
            <li className="mt-[14px]">
              <img src="./src/assets/arrowRight.svg" alt="" />
            </li>
            <li className="w-[160px]">
              <div className=" bg-room-secondaryGreen h-[50px] flex justify-center items-center">
                <img src="./src/assets/BookingProcess-3.svg" alt="BookingProcess-3" />
              </div>
              <div className="pt-3 pb-[18px] text-center border border-room-secondaryGreen rounded-b-[10px] min-h-[86px]">
                <p className="text-xs leading-[18px]">
                  入住當日憑訂房通知 以現金或刷卡付款即可
                  <br />
                  (僅接受VISA.JCB.銀聯卡)
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BookingRoom
