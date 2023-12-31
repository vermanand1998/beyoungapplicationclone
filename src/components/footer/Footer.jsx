import React from "react";
import "../../styles/footer.css";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import paymentsicon from "../../assets/payments-icon.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useError } from "../../context/ErrorContext";

const Footer = () => {
  const [open, setOpen] = React.useState(1);


  const {updateErrorStatus} = useError()
  
  const showError = ()=>{
    updateErrorStatus(true)
  }

  return (
    <div className="footer-container">
      <div className="footer-menu-section">
        <section className="footer-menu">
          <h4>Need Help</h4>
          <Link onClick={showError}>Contact Us</Link>
          <Link onClick={showError}>Track Order</Link>
          <Link onClick={showError}>Returns & Refunds</Link>
          <Link onClick={showError}>FAQ's</Link>
          <Link onClick={showError}>Career</Link>
        </section>
        <section className="footer-menu">
          <h4>COMPANY</h4>
          <Link onClick={showError}>About Us</Link>
          <Link onClick={showError}>Beyoung Blog</Link>
          <Link onClick={showError}>Beyoungistan</Link>
          <Link onClick={showError}>Collaboration</Link>
          <Link onClick={showError}>Media</Link>
        </section>
        <section className="footer-menu">
          <h4>MORE INFO</h4>
          <Link onClick={showError}>Term and Conditions</Link>
          <Link onClick={showError}>Privacy Policy</Link>
          <Link onClick={showError}>Shipping Policy</Link>
          <Link onClick={showError}>Sitemap</Link>
        </section>
        <section className="footer-menu">
          <h4>location</h4>
          <p>support@beyoung.in</p>
          <p>Eklingpura Chouraha, Ahmedabad Main Road</p>
          <p>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>
        </section>
      </div>
      <div className="footer-about">
        <Divider style={{ backgroundColor: "white" }} />
        <Accordion style={{ backgroundColor: "transparent", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#F8EA49" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: 0, padding: 0 }}
          >
            <h4>WHY CHOOSE US?</h4>
          </AccordionSummary>
          <AccordionDetails style={{ margin: 0, padding: 0 }}>
            <p>
              Online Shopping Site <br />
              India's Best Online Shopping Site for Fashion and Lifestyle <br />
              Started in 2018, Beyoung is the Best Site for online shopping in
              India when it comes to a vast collection of men's and women's
              fashion. The latest trends and styles are showcased here, yes at
              your favorite online fashion store. Well, if fashion is medicine,
              then Be Young is the chemist shop where you can do your online
              shopping for fashion with ease. Nothing to brag about, but we are
              the classic blend of 'Creativity' and 'Style'. Get The Young Out
              with Beyoung, our slogan says a lot about us. Our website is
              filled with the cool outfits that you always crave. Indeed, online
              shopping for women and men at Beyoung is hassle-free that in just
              a few clicks, one can purchase whatever he/she wants. A one-stop
              destination for all your shopping needs, Beyoung caters to each
              taste and need of every personality. The premium quality,
              affordable style, and trending graphics go into the making of our
              vast collection of men's and Women's Clothing. So, go ahead and
              indulge with India's best online shopping website for fashion. To
              know more about us, scroll below!
            </p>
          </AccordionDetails>
        </Accordion>
        <Divider style={{ backgroundColor: "white" }} />

        <Accordion style={{ backgroundColor: "transparent", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#F8EA49" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: 0, padding: 0 }}
          >
            <h4>POPULAR CATEGORIES</h4>
          </AccordionSummary>
          <AccordionDetails style={{ margin: 0, padding: 0 }}>
            <p>
              Topwear: Half Sleeve T-Shirts | Full Sleeve T-Shirts | Men's
              Shirts | Printed T-Shirts | Plain T-Shirts | Polo T-Shirts | Plus
              Size T-Shirts | Combos <br />
              Theme Based T Shirts: Ipl T Shirts | Men's Travel T-shirts | Gym T
              Shirts | Quotes T Shirt | Cartoon T Shirt | Entrepreneur T-Shirts
              | Student T Shirts | Funky T Shirts <br />
              Winter Collection: Hoodies for Men | Sweatshirts for Men | Jackets
              for Men
            </p>
          </AccordionDetails>
        </Accordion>
        <Divider style={{ backgroundColor: "white" }} />
      </div>
      <div className="footer-icons-section">
        <section className="payments-icon-section">
          <h4>100% SECURE PAYMENT</h4>
          <img
            style={{ width: "100%" }}
            src={paymentsicon}
            alt="secured payment methods"
          />
        </section>
        
        <section className="social-icon-section">
          <h4>LET'S BE FRIENDS</h4>
          <div className="social-icons">
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </div>
        </section>
      </div>
      <div className="footer-copyright">
        <p>Copyright	&#169; 2023 Beyoung Folks Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
