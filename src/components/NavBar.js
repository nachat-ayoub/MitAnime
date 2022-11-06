import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./css/NavBar.css";

import logo from "../assets/images/witLogo.png";

const NavBar = ({ Searched, setSearched }) => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [SearchKeywords, setSearchKeywords] = useState("");

  const navigate = useNavigate();

  return (
    <nav
      dir="rtl"
      className="navbar navbar-expand-md navbar-light bg-light text-dark"
    >
      <div className="container-fluid">
        <div className="w-100 content_wrapper">
          <div className="logo">
            <Link to="/" className="navbar-brand">
              <img
                style={{ height: "100%", width: "200px" }}
                src={logo}
                alt="logo"
              />
            </Link>
          </div>

          <button
            className="w-100 navbar-toggler mb-3 bg-dark text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
            <span>القائمة</span>
          </button>

          <div className="collapse navbar-collapse mb-3" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  {/*  */}
                  الرئيسية
                  {/*  */}
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/animeList" className="nav-link">
                  {/*  */}
                  قائمة الأنمي
                  {/*  */}
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  {/*  */}
                  أفلام الأنمي
                  {/*  */}
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  {/*  */}
                  أنميات الموسم
                  {/*  */}
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/" className="nav-link">
                  {/*  */}
                  مواعيد الحلقات
                  {/*  */}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  {/*  */}
                  إتصل بنا
                  {/*  */}
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-buttons">
            <Link
              to="/report"
              className="ms-3 d-flex justify-content-center align-items-center btn btn-danger rounded-pill"
            >
              <span
                style={{ whiteSpace: "nowrap", fontSize: ".8rem" }}
                className="font-ar ms-2"
              >
                التبليغ عن مشكلة
              </span>
              <div className="text-white">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
            </Link>
            <div className="btn btnIcone">
              <i className="fa-solid fa-user"></i>
            </div>
            <div
              onClick={() => setShowSearchBar(true)}
              className="btn btnIcone"
            >
              <i className="fa-solid fa-search"></i>
            </div>
            <div className="btn btnIcone">
              <i className="fa-solid fa-sun"></i>
            </div>
          </div>
        </div>
      </div>
      <div className={`searchContainer   ${!ShowSearchBar ? " d-none " : " "}`}>
        <div onClick={() => setShowSearchBar(false)} className="closeBtn">
          <i className="fa-solid fa-xmark"></i>
          <div className="">إغلاق</div>
        </div>
        <div className="searchBar">
          <input
            onChange={(e) => setSearchKeywords(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate("/search/?s=" + SearchKeywords);
                setShowSearchBar(false);
                setSearched(SearchKeywords);
              }
            }}
            value={SearchKeywords}
            className="searchInput"
            placeholder="البحث في الموقع"
          />
          <Link
            onClick={() => {
              setShowSearchBar(false);
              setSearched(SearchKeywords);
            }}
            to={"/search/?s=" + SearchKeywords}
            className="searchBtn"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
