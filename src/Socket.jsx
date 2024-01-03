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
import { HubConnectionBuilder } from '@aspnet/signalr'

const SignalRComponent = () => {
  const [connection, setConnection] = useState(null)
  const [userName, setUserName] = useState('')
  const [content, setContent] = useState('')
  const [lastEditTime, setLastEditTime] = useState('')
  const [lastEditUser, setLastEditUser] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    const configureSignalR = async () => {
      try {
        // 请求用户名
        setUserName(name || 'Anonymous')

        // 创建 SignalR 连接
        // const newConnection = new HubConnectionBuilderHubConnectionBuilder()
        // .withUrl('https://localhost:44341/signalr')
        // .build();

        const newConnection = new HubConnectionBuilder().withUrl('https://localhost:44341/signalr').build()

        console.log(newConnection)

        // 设置连接状态监听
        newConnection.onclose((error) => {
          console.error('Connection closed:', error)
        })

        // 启动连接
        await newConnection.start()
        console.log('Connected!')

        // 监听事件
        newConnection.on('getOnlineList', (userList) => {
          setOnlineUsers(Object.values(userList))
        })

        newConnection.on('updateDocContent', (doc) => {
          setLastEditTime(doc.lastEditTime)
          setLastEditUser(doc.lastEditName)
          setContent(doc.content)
        })

        // 加入房间
        await newConnection.invoke('onJoinRoom', { Name: userName })

        // 更新组件状态
        setConnection(newConnection)
      } catch (error) {
        console.error('Connection failed:', error)
      }
    }

    // 只在尚未建立连接时配置 SignalR
    if (!connection) {
      configureSignalR()
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
