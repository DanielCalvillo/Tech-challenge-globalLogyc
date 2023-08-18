const { css } = emotion;

const listStyles = css`
  border-top: solid;
  border-color: #EEEEEE;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }

`;

const listElement = css`
  display: flex;
  &:hover {
    background-color: #F4F4F4;
  }
`

const listElementExpanded = css`
  display: flex;
  flex-direction: column;
  &:hover {
    background-color: #F4F4F4;
  }
  padding: 0.5rem;
`
const movieStyles = css`
  text-decoration: underline;
  color: #5E0990;
  &:visited {
    color: #5E0990
  }
`

const scoreStyles = css`
  margin: 0 0.5rem 0 0
`

const yearStyles = css`
  margin: 0 0 0 0.5rem;

`

const movieDataExpanded = css`
  display: flex;
`

const evansReviewContainer = css`
 padding: 0.5rem;
  display: flex;
`

const evansReview = css`
  margin: 0
`

const coverPhoto = css`
  height: 10rem;
  margin-right: 1rem;
`

export default {
  listStyles,
  listElement,
  listElementExpanded,
  movieStyles,
  scoreStyles,
  yearStyles,
  movieDataExpanded,
  evansReviewContainer,
  evansReview,
  coverPhoto
}
