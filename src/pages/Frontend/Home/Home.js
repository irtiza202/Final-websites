import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import images from '../../../Assets/images.jpeg'; // Ensure this path is correct
import image from '../../../Assets/images.jpeg'; // Ensure this path is correct

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 60); // Countdown set to 1 hour initially
  const navigate = useNavigate();

  const { ref: featuredRef, inView: featuredInView } = useInView({
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: whyChooseRef, inView: whyChooseInView } = useInView({
    triggerOnce: true,
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(displaySeconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <main>
      <section className="hero container my-3">
        <div className="hero-content d-flex justify-content-between align-items-center">
          <div className="text-content">
            <h1>Welcome to Events Management</h1>
            <button
              className="my-3 btn"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Add event
            </button>
          </div>
          <div className="image-container">
            <img src={images} alt="Deal of the Month" className="hero-image" />
            <img src={image} alt="Event Image" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        className={`featured ${featuredInView ? "slide-in" : "slide-hidden"} px-5`}
        ref={featuredRef}
      >
        <div className="featured-content">
          <div className="featured-text">
            <h2>Celebrate every tiny victory.</h2>
            <h2>The best way to pay for a lovely moment is to enjoy it</h2>
          </div>
        </div>
      </section>

      <section
        className={`featured-products ${featuredInView ? "slide-in" : "slide-hidden"} container`}
        ref={featuredRef}
      >
        <div className="deal-container container" style={{ background: '#ff6347' }}>
          <div className="timer">
            <h1>Deal of the Month!</h1>
            <div className="countdown">
              <div className="time-box">
                <div className="time">
                  {hours}
                  <div className="label">Hours</div>
                </div>
                <div className="time">
                  {minutes}
                  <div className="label">Minutes</div>
                </div>
                <div className="time">
                  {seconds}
                  <div className="label">Seconds</div>
                </div>
              </div>
            </div>
            <button id="f-btn">See the discounted products ---&gt;</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`testimonials ${testimonialsInView ? "slide-in" : "slide-hidden"} my-4 container`}
        ref={testimonialsRef}
        style={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          padding: "50px 20px",
          borderRadius: "10px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 className="text-center my-5">Customer Testimonials</h2>
        <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  size={100}
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">"Great products and amazing service!"</p>
                <span>∼ Customer 1</span>
              </div>
            </div>
            <div className="carousel-item text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  size={100}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">"Fast delivery and top-notch quality!"</p>
                <span>∼ Customer 2</span>
              </div>
            </div>
            <div className="carousel-item text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  size={100}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">"Excellent customer support and great prices."</p>
                <span>∼ Customer 3</span>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </main>
  );
}
