interface props {
  isConnected: boolean;
}

const RealtimeEnabled = ({ isConnected }: props) => {
  return (
    <div
      className={`h-2 w-2 rounded-full ${
        isConnected ? "animate-pulse bg-green-500" : "bg-yellow-500"
      }`}
    />
  );
};

export default RealtimeEnabled;
