import Styles from '../styles/moviesListStyles.js'

const url = 'http://localhost:1234'

export const MoviesList = (props) => {

  const { reviews, handleRowClick, filteredMoviesByDecade} = props;

  return html`
      <ul className=${Styles.listStyles}>
        ${
          filteredMoviesByDecade && filteredMoviesByDecade.map((element) => {
            const selectedReview = reviews.filter((review) => review['movie-id'] === element.id)[0].review

            return html`
            <li>
              ${element.isExpanded ?
                  html`
                    <div className=${Styles.listElementExpanded} onClick=${() => handleRowClick(element.id)}>
                      <div className=${Styles.movieDataExpanded}>
                          <p className=${Styles.scoreStyles}>${element.score * 100}%</p>
                          <a className=${Styles.movieStyles} href=${element.url} onClick=${(e) => e.stopPropagation()}>
                            ${element.title}
                          </a>
                          <p className=${Styles.yearStyles}>(${element.year})</p>
                      </div>
                      <div className=${Styles.evansReviewContainer}>
                        <img src=${`${url}${element['cover-url']}`} alt=${`${element.title}'s cover image`} className=${Styles.coverPhoto}/>
                        <p className=${Styles.evansReview}>
                          ${selectedReview}
                        </p>
                      </div>
                    </div>
                  `
                :
                  html`
                    <div className=${Styles.listElement} onClick=${() => handleRowClick(element.id)}>
                      <p className=${Styles.scoreStyles}>${element.score * 100}%</p>
                      <a className=${Styles.movieStyles} href=${element.url} onClick=${(e) => e.stopPropagation()}>
                        ${element.title}
                      </a>
                      <p className=${Styles.yearStyles}>(${element.year})</p>
                    </div>
                  `
              }
            </li>
          `;
          })
        }
      </ul>
  `;
};
