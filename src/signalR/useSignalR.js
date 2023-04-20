import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const useSignalR = (hubUrl) => {
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectionBuilder = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(connectionBuilder);

    const startConnection = async () => {
      try {
        await connectionBuilder.start();
        console.log("SignalR Connected");
        setIsConnected(true);
      } catch (err) {
        console.log("SignalR Connection Error: ", err);
        setTimeout(() => startConnection(), 5000);
      }
    };

    startConnection();

    return () => {
      if (connectionBuilder) {
        connectionBuilder.stop();
        setIsConnected(false);
      }
    };
  }, [hubUrl]);

  return { connection, isConnected };
};

export default useSignalR;
