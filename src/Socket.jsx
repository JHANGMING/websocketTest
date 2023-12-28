
import { useState, useEffect } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'

const Socket=()=>{
  const [connection, setConnection] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName] = useState("Anonymous");  // 添加用户名状态

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44339/syscomHub1') // 替换为实际的Hub URL
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to the hub');

          // 加入房间，传入用户名
          connection.invoke('onJoinRoom', { Sid: connection.connectionId, Name: userName, ConnectedTime: new Date().toISOString() });

          // 监听服务器发送的消息
          connection.on('getOnlineList', (userList) => {
            // 处理在线用户列表
            console.log("Online Users:", userList);
          });

          connection.on('updateDocContent', (doc) => {
            // 处理文档内容更新
            console.log("Document Data:", doc);
            setMessages(messages => [...messages, doc.content]);
          });
        })
        .catch(err => console.error('SignalR Connection Error: ', err));
    }
  }, [connection, userName]);  // 依赖项中添加 userName

  const sendMessage = async () => {
    if (currentMessage.trim() !== '' && connection) {
      try {
        // 发送编辑文档的请求
        await connection.invoke('EditDoc', { content: currentMessage, lastEditName: userName });
        setCurrentMessage('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1>Message App</h1>
      <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type your message here" className="pl-2 mt-4 border-2 border-black rounded-md w-[200px]" />
      <button onClick={sendMessage} className="border border-black px-2 py-1 ml-2 rounded-md hover:bg-black hover:text-white">
        Send
      </button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  )
};


export default Socket