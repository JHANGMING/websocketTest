
import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"

const Socket=()=>{
  const [text, setText] = useState([])
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [userName, setUserName] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  useEffect(() => {
    const socketInstance = io('http://localhost:3000')
    socketInstance.on('connect', () => {
      // setText(socketInstance.id)
    })
    setSocket(socketInstance)
    socketInstance.on('receive-message', (message) => {
      const { id } = message
      if (!text.some((msg) => msg.id === id)) {
        setText((prev) => [...prev, message])
      }
    })

    return () => {
      socketInstance.disconnect()
      socketInstance.off('receive-message')
      socketInstance.off('connect')
    }
  }, [])
  const sendMessage = useCallback(() => {
    if (socket && userName && message.trim()) {
      const newMessage = {
        userName,
        message,
        id: Date.now(),
      }
      socket.emit('send-message', newMessage)
      setMessage('')
    }
  }, [socket, message, userName])
  const handleSetUserName = () => {
    const trimmedName = userNameInput.trim()
    if (trimmedName) {
      setUserName(trimmedName)
      if (socket) {
        socket.emit('send-message', {
          userName: 'System',
          message: `${trimmedName}進入聊天室`,
          id: Date.now(),
          system: true, 
        })
      }
    }
  }
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [text]) 
  return (
    <div className="p-8">
      <ul className="messages-container flex flex-col w-[500px] h-[300px] border border-black p-4 overflow-auto">
        {text.map((item) => {
          const { id, userName: messageUser, message, system } = item
          if (system) {
            return (
              <li key={id} className="text-sm text-gray-500">
                {message}
              </li>
            )
          } else {
            const isOwnMessage = messageUser === userName
            const messageClass = isOwnMessage ? 'bg-blue-300' : 'bg-green-300'
            const messageDisplay = isOwnMessage ? 'self-end' : ''
            return (
              <li key={id} className={`${messageDisplay} mb-2`}>
                <span className={`border rounded-md px-2 ${messageClass}`}>
                  {messageUser}：{message}
                </span>
              </li>
            )
          }
        })}
      </ul>
      <p>your name:{userName}</p>
      <div className="">
        <input type="text" placeholder="Name" className="border rounded-sm m-2 pl-2 " value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
        <button type="button" onClick={handleSetUserName} className="border rounded-lg px-2 py-1 hover:bg-black hover:text-white">
          Enter
        </button>
      </div>
      <input type="text" className="border rounded-sm m-2 pl-2" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={sendMessage} className="border rounded-lg px-2 py-1 hover:bg-black hover:text-white">
        send
      </button>
    </div>
  )
}

export default Socket