import React from 'react'
import Layout from '../components/layout'

import SwEngineerPic from '../../static/about/coding-300x300.png'
import ServerPic from '../../static/about/server-300x300.png'
import DevOpsPic from '../../static/about/devops-300x300.png'
import MountainPic from '../../static/about/road-300x300.png'


const AboutPage = ({ data }) => {

  return (
    <Layout>
      <div className="about-me">
        <h1>About me</h1>
        <section className="container">
        <div className="left-half">
          <content-block>
          <p>Hi everybody I’m Alessandro Rosa’, an Italian guy graduated in Computer Engineering at the University of Padova. I was born in nineteen eighty-something in the city of Rovereto, somewhere in the north of Italy. After finishing a High School diploma in Computer Science, I settled down in Padova to continue my studies. At the end of 2011 I finished a Master’s Degree in Computer Engineering. Since then I’m a full time IT specialist. </p>
          </content-block>
        </div>
        <div className="right-half">
          <content-block>
          <p>My main tasks consist of software development, IT infrastructure monitoring/improvement, take care of customer’s bugs/issues and last but not least, learning new technologies, frameworks and systems. This website is my portfolio for showing what I’m doing and a place to remember cool stuff I’ve done during these years. Hopefully it will be another useful website for people dealing with my topics and issues.</p>
          </content-block>
        </div>

          <section id="services" className="bounce-inInverse">
            <div className="containerContent">
              <div className="set_size_section1">
                <h1>Tech & Stack</h1>
                <div className="article_center2">
                  <article className="section1_article">
                    <img alt="SWEngineer"
                         src={SwEngineerPic}
                         width="78" height="77"/>
                      <h3>SOFTWARE ENGINEER</h3>
                      <p>I design cool web apps: backend and frontend skills. Preferred languages are C#, Java, Javascript.  The websites and CMSs (mostly WordPress) I develop are just for fun and not as full time employee.</p>
                  </article>
                  <article className="section1_article">
                    <img alt="SysEngineer"
                         src={ServerPic}
                         width="78" height="77"/>
                      <h3>SYSTEMS ENGINEER</h3>
                      <p>TCP/IP protocols, networks, subnets, subnet masks, routing, firewalls, switches, CAT 5e, 6, 7, SNMP monitoring, VLANs. I feel comfortable designing and troubleshooting ICT architectures.</p>
                  </article>
                  <article className="section1_article">
                    <img alt="DevOps"
                         src={DevOpsPic}
                         width="78" height="77"/>
                      <h3>DEVOPS</h3>
                      <p>I’m able to automated software deployment using continuous integrations tools, create Docker containers and connect them to create reliable and redundant systems.</p>
                  </article>
                  <article className="section1_article">
                    <img alt="DevOps"
                         src={MountainPic}
                         width="78" height="77"/>
                    <h3>SKIALPER</h3>
                    <content-block>
                    <p>In love with mountains and peaks, it has been really easy to be captured by this amazing sport.  Free-heels ascents and free ride descents it’s the way I’d like to spend my spare time.</p>
                    </content-block>
                  </article>
                </div>
              </div>
            </div>
          </section>

        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
