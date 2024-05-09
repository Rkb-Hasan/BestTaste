const Footer = () => {
  return (
    <div className="bg-green-500 bg-opacity-70">
      {" "}
      <footer className="footer p-10  text-black lg:min-h-60   text-base max-w-7xl mx-auto px-4 ">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Crafting</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Property</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn bg-green-200 join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
