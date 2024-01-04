// import { useState, useEffect } from 'react'
// import { HubConnectionBuilder } from '@microsoft/signalr'

// const SignalRComponent = () => {
//   const [connection, setConnection] = useState(null)
//   const [userName, setUserName] = useState('')
//   const [content, setContent] = useState('')
//   const [lastEditTime, setLastEditTime] = useState('')
//   const [lastEditUser, setLastEditUser] = useState('')
//   const [onlineUsers, setOnlineUsers] = useState([])

// useEffect(() => {
//   if (!connection) {
//     // 只在尚未建立连接时请求用户名
//     const name = window.prompt('请输入用户名')
//     setUserName(name || 'Anonymous')

//     // 创建SignalR连接
//     const newConnection = new HubConnectionBuilder()
//       .withUrl('https://localhost:44339/signalR.aspx') // 更新为实际的SignalR服务端点
//       .configureLogging.withAutomaticReconnect()
//       .build()
//     console.log(newConnection)
//     setConnection(newConnection)
//   }
// }, [connection])

//   useEffect(() => {
//     if (connection) {
//       // 启动连接
//       connection
//         .start()
//         .then(() => {
//           console.log('Connected!')

//           // 监听事件
//           connection.on('getOnlineList', (userList) => {
//             setOnlineUsers(Object.values(userList))
//           })

//           connection.on('updateDocContent', (doc) => {
//             setLastEditTime(doc.lastEditTime)
//             setLastEditUser(doc.lastEditName)
//             setContent(doc.content)
//           })

//           // 加入房间
//           connection.invoke('onJoinRoom', { Name: userName })
//         })
//         .catch((err) => console.error('Connection failed: ', err))
//     }
//   }, [connection, userName])

//   const sendContent = () => {
//     connection.invoke('EditDoc', {
//       lastEditId: connection.connectionId,
//       lastEditName: userName,
//       content: content,
//     })
//   }

//   return (
//     <div className="p-6">
//       <h1>Hello {userName}</h1>
//       <ul>
//         {onlineUsers.map((user, index) => (
//           <li key={index}>{user.Name}</li>
//         ))}
//       </ul>
//       <span>{lastEditTime}</span>
//       <span>{lastEditUser}</span>
//       <div className="edit-area">
//         <label>{content}</label>
//         <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="pl-2 mt-4 border-2 border-black rounded-md w-[200px]" />
//         <button type="button" onClick={sendContent} className="border border-black px-2 py-1 ml-2 rounded-md hover:bg-black hover:text-white">
//           Send
//         </button>
//       </div>
//     </div>
//   )
// }

// export default SignalRComponent
import { useState, useEffect } from 'react'
//import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr'
//import {HubConnectionBuilder,HttpTransportType} from '@aspnet/signalr';

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null)
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [lastEditTime, setLastEditTime] = useState('')
  const [lastEditUser, setLastEditUser] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    //初始化 SignalR 連接
    const newConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(
        'https://localhost:44341/signalr', // 更新為實際的 SignalR 服務端點
        {
          accessTokenFactory: () => {
            if (typeof bearerToken !== 'undefined') {
              return bearerToken.getToken()
            }
            return null // 如果未提供存取權杖，返回 null 或不提供此選項
          },
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        }
      )
      .build()

    newConnection.on('getOnlineList', (userList) => {
      setOnlineUsers(Object.values(userList))
    })

    newConnection.on('updateDocContent', (doc) => {
      setLastEditTime(doc.lastEditTime)
      setLastEditUser(doc.lastEditName)
      setContent(doc.content)
    })

    //啟動連接
    newConnection
      .start()
      .then(() => {
        console.log('Connected!')
        //請求用戶名
        const name = window.prompt('請輸入用戶名')
        setUserName(name || 'Anonymous')

        //加入房間
        newConnection.invoke('onJoinRoom', { Name: userName })
      })
      .catch((error) => {
        console.error('Connection failed:', error)
      })

    //更新狀態
    setConnection(newConnection)
  }, []) // 注意：這裡的空 dependency array 確保只在組件掛載時初始化一次

  const sendContent = () => {
    //發送內容
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
