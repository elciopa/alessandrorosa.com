import React from 'react'
import Layout from '../components/layout'

const AboutPage = ({ data }) => {

  return (
    <Layout>
      <div className="about-me">
        <h1>about me</h1>
        <section className="container">
        <div className="left-half">
          <content-block>
          <p>Hi everybody I’m Alessandro Rosa’, an Italian guy graduated in Computer Engineering at the University of Padova. I was born in nineteen eighty-something in the city of Rovereto, somewhere in the north of Italy. After finishing a High School diploma in Computer Science, I settled down in Padova to continue my studies. At the end of 2011 I finished a Master’s Degree in Computer Engineering. Since then I’m a full time IT specialist. </p>
          </content-block>
        </div>
        <div className="right-half">
          <content-block>
          <p>My main tasks consist of software development, IT infrastructure monitoring/improvement, take care of customer’s bugs/issues and last but not least, learning new technologies, frameworks and systems. This website is my portfolio for showing what I’m doing and a place to remember cool stuff I’ve done during these years. Hopefully it will be another useful website for people dealing with my topics and issues</p>
          </content-block>
        </div>
        </section>

      <section className="container">
        <div className="box__grid">
          <article className="box"><a className="box__content" href="#"><i className="fa fa-lightbulb-o fa-3x"></i>
            <h3 className="box__title">Creative Idea</h3>
            <p>Duis neque leo cursus ac libero ac imperdiet bibendum nisl mauris neque diam vulputate nem.</p><span
              className="box__more">Read more <i className="fa fa-arrow-right"></i></span></a></article>
          <article className="box"><a className="box__content" href="#"><i className="fa fa-code fa-3x"></i>
            <h3 className="box__title">Clean Code</h3>
            <p>Duis neque leo cursus ac libero ac imperdiet bibendum nisl mauris neque diam vulputate nem.</p><span
              className="box__more">Read more <i className="fa fa-arrow-right"></i></span></a></article>
          <article className="box"><a className="box__content" href="#"><i className="fa fa-mobile fa-3x"></i>
            <h3 className="box__title">Mobile First</h3>
            <p>Duis neque leo cursus ac libero ac imperdiet bibendum nisl mauris neque diam vulputate nem.</p><span
              className="box__more">Read more <i className="fa fa-arrow-right"></i></span></a></article>
        </div>
    </section>
      </div>
    </Layout>
  )
}

export default AboutPage