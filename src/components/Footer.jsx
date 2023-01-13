import React from "react-dom"

function Footer(){
  return (
    <div className="container-fluid container-inline">
  <footer
          className="text-center text-lg-start text-dark"
          style={{backgroundColor: "#ECEFF1"}}
          >
    <section
             className="d-flex justify-content-between text-black"
             style={{backgroundColor: "#8DD7CF",padding:"1rem"}}
             >

      <div className="me-5">
        <span>Get connected with us on social networks:</span>
      </div>
      <div>
        <a href="#" className="text-black me-4">
          <i className="fa fa-facebook-f"></i>
        </a>
        <a href="#" className="text-black me-4">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="#" className="text-black me-4">
          <i className="fa fa-google"></i>
        </a>
        <a href="#" className="text-black me-4">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="#" className="text-black me-4">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="#" className="text-black me-4">
          <i className="fa fa-github"></i>
        </a>
      </div>

    </section>

    <section className="">
      <div className="container text-center text-md-start mt-5">

        <div className="row mt-3">
    
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
    
            <h6 className="text-uppercase fw-bold">Educate Pakistan</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto hr-inline"
                />
            <p>
              We are here for the nation. The institute's goal is to provide students with quality skills, which are both inexpensive and accessible to everyone.
            </p>
          </div>
    

    
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
    
            <h6 className="text-uppercase fw-bold">Courses</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto hr-inline"
                />
            <p>
              <a href="#" className="text-dark">Maths</a>
            </p>
            <p>
              <a href="#" className="text-dark">English</a>
            </p>
            <p>
              <a href="#" className="text-dark">Physics</a>
            </p>
            <p>
              <a href="#" className="text-dark">Urdu</a>
            </p>
          </div>
    

    
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
    
            <h6 className="text-uppercase fw-bold">Useful links</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto hr-inline"
                />
            <p>
              <a href="#!" className="text-dark">About Us</a>
            </p>
            <p>
              <a href="#!" className="text-dark">Contact Us</a>
            </p>
            <p>
              <a href="#!" className="text-dark">Register Now</a>
            </p>
            <p>
              <a href="#!" className="text-dark">Help</a>
            </p>
          </div>
    

    
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
    
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto hr-inline"
                />
            <p><i className="fa fa-home mr-3"></i> New York, NY 10012, US</p>
            <p><i className="fa fa-envelope mr-3"></i> info@example.com</p>
            <p><i className="fa fa-phone mr-3"></i> + 01 234 567 88</p>
            <p><i className="fa fa-print mr-3"></i> + 01 234 567 89</p>
          </div>
    
        </div>

      </div>
    </section>

    <div
         className="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
      © 2022 Copyright:
      <a className="text-dark" href="#"
         >educatepakistan.org</a
        >
    </div>
  </footer>
</div>
  );
}

export default Footer;