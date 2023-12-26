const Amenities = ({ amenitiesImg,amenitiesName }) => {
  return (
    <li className="flex flex-col justify-between items-center h-full w-[71px]">
      <img src={`./src/assets/${amenitiesImg}.svg`} alt={amenitiesImg} className="w-[30px] h-[30px] mb-2" />
      <p className="text-[10px] leading-[15px] text-room-secondaryGreen">{amenitiesName}</p>
    </li>
  )
}
export default Amenities;