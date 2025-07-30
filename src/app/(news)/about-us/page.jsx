import "./About-inquest.css";
import Image from "next/image";
import image from "@/../public/assets/img/about-us.jpeg";
function Page() {
  return (
    <section className="hero">
      <div className="heading">
        <h1>About Us</h1>
      </div>
      <div className="about-container">
        <div className="hero-container">
          <div className="hero-content">
            <h2>Welcome To Inkquest</h2>
            <p>
              Discover the latest trends and innovations and news in
              technology,sports,entertainment,national,international,politics,
              many more. Our team of experts brings you the best content and the
              real news to help you stay ahed of time!
            </p>
          </div>

          <div className="hero-image">
            <Image src={image} width={"1920"} height={"1080"} alt="about us" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
