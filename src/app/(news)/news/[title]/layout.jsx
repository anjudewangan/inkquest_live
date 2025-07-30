import OtherNews from "./components/OtherNews";

function layout({ children }) {
  return (
    <div>
      <h1></h1>
      <div>{children}</div>
      <OtherNews />
    </div>
  );
}

export default layout;
