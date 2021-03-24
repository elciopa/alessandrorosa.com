import React from 'react'
import { Link, graphql } from 'gatsby'

import { kebabCase } from 'lodash'

import Layout from '../components/layout'
const ResumePage = ({ data }) => {
  const allTags = data.allMarkdownRemark.group

  return (
    <Layout>
      <div className="resume-tags">
        <h1>Tags</h1>
        <ul className="tags">
          {allTags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="tag">
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default ResumePage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
