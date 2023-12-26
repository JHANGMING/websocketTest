import { useRef } from 'react'
import Peer from 'simple-peer'

const LiveStream = () => {
  const videoRef = useRef(null) // 用于存放视频元素的引用

  // 当用户点击按钮时调用此函数
  const startBroadcasting = () => {
    // 请求用户的媒体设备
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream // 将视频流设置为视频元素的源

        const peer = new Peer({
          initiator: true, // 作为发起者启动peer
          trickle: false,
          stream: stream, // 将用户的视频流传递给peer
        })

        peer.on('signal', (data) => {
          // 此处可以将信号数据发送到服务器或另一端peer
          console.log('Signal data:', JSON.stringify(data))
        })

        // 这里可以添加更多的WebRTC逻辑，如接受远程peer的信号等
      })
      .catch((err) => {
        console.error('Failed to get media device:', err)
      })
  }

  return (
    <div>
      <button onClick={startBroadcasting}>Start Live Stream</button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  )
}

export default LiveStream
