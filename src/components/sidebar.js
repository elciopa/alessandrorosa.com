import { Link } from 'gatsby'
import React from 'react'

import Logo from './facepic.jpg'

const Sidebar = ({ siteMetadata }) => (
  <>
    <aside className="sidebar">
      <header>
        <div className="about">
          <div className="cover-author-image">
            <Link to="/">
              <img src={Logo} alt={siteMetadata.author} />
            </Link>
          </div>
          <div className="author-name">{siteMetadata.author}</div>
          <p className="author-description"> {siteMetadata.description}</p>
          <div className="link-sidebar">
            <Link to="/about" style={{ color: `#727F85`, textShadow: `none`, backgroundImage: `none`, textDecoration: `none`}}>
              <div className="item">
              <i className="caption fa fa-user-circle-o fa-3x" aria-hidden="true" />
                <span className="caption">ABOUT ME</span>
              </div>
            </Link>
          </div>
          <div className="link-sidebar">
            <Link to="/resume" style={{ color: `#727F85`, textShadow: `none`, backgroundImage: `none`, textDecoration: `none`}}>
              <div className="item">
                <i className="caption fa fa-list-alt fa-3x" aria-hidden="true" />
                <span className="caption">RESUME</span>
              </div>
            </Link>
          </div>
          <div className="link-sidebar">
            <Link to="/contact" style={{ color: `#727F85`, textShadow: `none`, backgroundImage: `none`, textDecoration: `none`}}>
            <div className="item">
              <i className="caption fa fa-user-circle-o fa-3x" aria-hidden="true" />
              <span className="caption">CONTACT</span>
            </div>
            </Link>
          </div>
        </div>
      </header>
      <footer>
        <section className="contact">
          <h3 className="contact-title">Contact me</h3>
          <ul>
            {siteMetadata.social.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${siteMetadata.social.twitter}`}
                  target="_blank"
                >
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.facebook && (
              <li>
                <a
                  href={`https://facebook.com/${siteMetadata.social.facebook}`}
                  target="_blank"
                >
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.github && (
              <li>
                <a
                  href={`https://github.com/${siteMetadata.social.github}`}
                  target="_blank"
                >
                  <i className="fa fa-github" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.linkedin && (
              <li>
                <a
                  href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}
                  target="_blank"
                >
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.email && (
              <li>
                <a href={`mailto:${siteMetadata.social.email}`} target="_blank">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </section>
        <div className="copyright">
          <p>
            {new Date().getFullYear()} &copy; {siteMetadata.author}
          </p>
        </div>
      </footer>
    </aside>
  </>
)

export default Sidebar
