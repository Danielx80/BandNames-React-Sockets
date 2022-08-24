import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = ( serverPath ) => {

    const socket = useMemo( () =>  io.connect(serverPath, {
        transports: ['websocket']
    }), [ serverPath ]);

    const [online, setOnline] = useState(false);

      // para que conecte el servidor con la aplicacion de react 
  useEffect(() => {
    // console.log(socket)
    setOnline( socket.connected )
  }, [socket])
  

  // Estos use effect funcionan para que el status cambie 
  // al momento de detener el servidor o subirlo
  
  useEffect(() => {
   socket.on('connect', () => {
    setOnline( true )
   })
  }, [socket])
  // Si perdemos la conexion 
  useEffect(() => {
   socket.on('disconnect', () => {
    setOnline( false )
   })
  }, [socket])


    return { 
        socket,
        online
    }
}
