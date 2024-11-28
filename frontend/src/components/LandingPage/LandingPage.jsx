import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import './LandingPage.css';
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".container .letter-z", {
      duration: 1000,
      delay: 500,
    });

    ScrollReveal().reveal(".nav__links.nav__left li, .nav__links.nav__right li", {
      duration: 2000,
      interval: 300,
      delay: 2000,
    });

    ScrollReveal().reveal(".text__left", {
      ...scrollRevealOption,
      origin: "left",
      delay: 1500,
    });

    ScrollReveal().reveal(".text__right", {
      ...scrollRevealOption,
      origin: "right",
      delay: 1500,
    });

    ScrollReveal().reveal(".explore", {
      duration: 3000,
      delay: 7000,
    });

    ScrollReveal().reveal(".feature-1, .feature-2, .feature-3, .feature-4", {
      duration: 1000,
      interval: 500,
      delay: 4000,
    });

    ScrollReveal().reveal(".footer p", {
      duration: 1000,
      delay: 4000,
    });

    ScrollReveal().reveal(".footer__links li", {
      duration: 1000,
      interval: 300,
      delay: 4500,
    });
  }, []);

  return (
    <div className="container">
      <nav>
        <ul className="nav__links nav__left">
          <li><a href="#" className="logo">ShoZtop</a></li>
          <li><a href="#">Store</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Collection</a></li>
        </ul>
        <ul className="nav__links nav__right">
          <li><a href="#">Cart</a></li>
          <li><button className="buttonlog" onClick={() => { navigate('/registrationform'); }}>Login/Register</button></li>
          <li><a href="#">Seller</a></li>
        </ul>
      </nav>
      <span className="letter-z">Z</span>
      <h4 className="text__left">SHO</h4>
      <h4 className="text__right">TOP</h4>
      <button className="btn explore">EXPLORE MORE</button>
      <h5 className="feature-1">Formals</h5>
      <h5 className="feature-2">Casuals</h5>
      <h5 className="feature-3">Classic</h5>
      <h5 className="feature-4">Modern</h5>
      <footer className="footer">
        <p>Copyright © 2024 SHOZTOP Ecommerce-App. All rights reserved.</p>
        <div className="footer__links">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Twitter</a></li>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
