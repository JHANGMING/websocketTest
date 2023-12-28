import { useState, useEffect } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null)
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [lastEditTime, setLastEditTime] = useState('')
  const [lastEditUser, setLastEditUser] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])

useEffect(() => {
  if (!connection) {
    // 只在尚未建立连接时请求用户名
    const name = window.prompt('请输入用户名')
    setUserName(name || 'Anonymous')

    // 创建SignalR连接
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/signalr') // 更新为实际的SignalR服务端点
      .withAutomaticReconnect()
      .build()
    console.log(newConnection)
    setConnection(newConnection)
  }
}, [connection]) 

  useEffect(() => {
    if (connection) {
      // 启动连接
      connection
        .start()
        .then(() => {
          console.log('Connected!')

          // 监听事件
          connection.on('getOnlineList', (userList) => {
            setOnlineUsers(Object.values(userList))
          })

          connection.on('updateDocContent', (doc) => {
            setLastEditTime(doc.lastEditTime)
            setLastEditUser(doc.lastEditName)
            setContent(doc.content)
          })

          // 加入房间
          connection.invoke('onJoinRoom', { Name: userName })
        })
        .catch((err) => console.error('Connection failed: ', err))
    }
  }, [connection, userName])

  const sendContent = () => {
    connection.invoke('EditDoc', {
      lastEditId: connection.connectionId,
      lastEditName: userName,
      content: content,
    })
  }

  return (
    <div className="p-6">
      <h1>Hello {userName}</h1>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user.Name}</li>
        ))}
      </ul>
      <span>{lastEditTime}</span>
      <span>{lastEditUser}</span>
      <div className="edit-area">
        <label>{content}</label>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="pl-2 mt-4 border-2 border-black rounded-md w-[200px]" />
        <button type="button" onClick={sendContent} className="border border-black px-2 py-1 ml-2 rounded-md hover:bg-black hover:text-white">
          Send
        </button>
      </div>
    </div>
  )
}

export default SignalRComponent
