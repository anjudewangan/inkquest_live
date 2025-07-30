import { Tweet } from "react-tweet";

function Twitter({ link }) {
  return (
    <div className="flex items-center justify-center">
      <Tweet id={link} />
    </div>
  );
}

export default Twitter;
