const Header = ({ title = "Task Tracker!" }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

// Default prop value if none is passed
Header.defaultProps = {
  title: "Task Tracker!",
};

export default Header;
