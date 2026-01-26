import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../../../helpers";

const Circulars: FC = () => {
  const [active, setActive] = useState<number>(0);
  const intl = useIntl();
  const navigate = useNavigate();

  const images = [
    toAbsoluteUrl("/media/img/cur1.webp"),
    toAbsoluteUrl("/media/img/cur2.webp"),
    toAbsoluteUrl("/media/img/cur1.webp"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="card card-shadow2 mb-5 mb-xl-10">
      <div className="card-body pt-5">
        <div
          id="kt_security_guidelines"
          className="carousel carousel-custom carousel-stretch slide myCarousel"
          data-bs-ride="carousel"
          data-bs-interval="8000"
        >
          <h3 className="d-flex card-title align-items-start flex-column mb-5">
            <div className="d-flex w-100 flex-stack align-items-center flex-wrap mt-4">
              <span className="card-label fw-bolder fs-2 mb-1">
                {intl.formatMessage({ id: "Circulars" })}
              </span>
              <button
                onClick={() => {
                  navigate("/circulars-view");
                }}
                className="p-2 bg-light fs-5 rounded-1 border-0"
              >
                {intl.formatMessage({ id: "ViewAll" })}
              </button>
            </div>
            <span className="text-muted mt-2 fw-bold fs-6">
              {intl.formatMessage({ id: "DisplayEntityCirculars" })}
            </span>
          </h3>

          <div className="d-flex justify-content-end align-items-center flex-wrap">
            <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
              {images.map((_, index) => (
                <li
                  key={index}
                  data-bs-target="#kt_security_guidelines"
                  data-bs-slide-to={index}
                  className={`ms-1 ${active === index ? "active" : ""}`}
                  aria-current={active === index ? "true" : "false"}
                  onClick={() => setActive(index)}
                ></li>
              ))}
            </ol>
          </div>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div key={index} className={`carousel-item ${active === index ? "active" : ""}`}>
                <div className="carousel-wrapper">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h2 className="text-muted mt-2 fw-bolder fs-4 mb-4">
                        {intl.formatMessage({ id: `Circular${index + 1}` })}
                      </h2>
                      <p>
                        استعراض تفاصيل المنشور المدخلة من قبل مدير الخدمة استعراض
                        تفاصيل المنشور المدخلة من قبل مدير الخدمة استعراض
                        تفاصيلالمنشور المدخلة من قبل مدير الخدمة استعراض تفاصيل
                        المنشور المدخلة من قبل مدير الخدمة استعراض تفاصيل المنشور
                        المدخلة . النقاط الخاصة بالمنشور النقاط الخاصة بالمنشور
                        النقاط الخاصة بالمنشور
                      </p>
                      <button
                        className="btn btn-primary py-2 fs-7 mt-2"
                        onClick={() => navigate(`/circulars-view/circular-details/${index + 1}`)}
                      >
                        {intl.formatMessage({ id: "Details" })}
                      </button>
                    </div>
                    <div className="col-12 col-md-6">
                      <img
                        src={image}
                        alt={`img${index + 1}`}
                        className="circulars-homeimg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circulars;
