interface props {
  title: string;
  description: string;
}

const AppPageHeader = ({ title, description }: props) => {
  return (
    <div>
      <h2 className="title-page">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default AppPageHeader;
