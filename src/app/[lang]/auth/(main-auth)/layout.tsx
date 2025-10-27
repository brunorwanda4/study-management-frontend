
interface props {
  children: React.ReactNode;
}
const MainAuthLayout = ({ children }: props) => {
  return (
    <main className="">
      <div>{children}</div>
    </main>
  );
};

export default MainAuthLayout;
