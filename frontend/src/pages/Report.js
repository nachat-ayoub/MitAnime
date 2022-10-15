import React from "react";

const Report = () => {
  return (
    <div
      dir="rtl"
      style={{ flex: 1 }}
      className="px-5 d-flex justify-content-center align-items-center flex-column"
    >
      <h5 className="font-ar text-center">
        يمكنك التبليغ عن أي مشكلة قد واجهتها أثناء تصفحك موقعنا عبر مراسلتنا على
        صفحتنا بالفايسبوك.
      </h5>
      <a
        rel="noreferrer"
        target="_blank"
        href="https://www.facebook.com/MitAnime1x1/"
        className="mt-3 rounded-pill px-3 font-ar btn btn-primary"
      >
        راسلنا الآن!
        <span className="me-2 text-white">
          <i className="fa-regular fa-comments"></i>
        </span>
      </a>
    </div>
  );
};

export default Report;
