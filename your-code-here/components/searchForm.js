import Styles from '../styles/searchFormStyles.js'

function calculateDecadeOptions(movies) {
  const decadesSet = new Set();
  movies.forEach(movie => {
    const decade = Math.floor(movie.year / 10) * 10;
    decadesSet.add(decade);
  });
  return Array.from(decadesSet);
}

export const SearchForm = (props) => {

  const {
    movies,
    handleSearchChange,
    handleDecadeChange,
    searchTerm,
    selectedDecade
  } = props;

  const decadeOptions = calculateDecadeOptions(movies);

  return html`
      <div>
        <div className=${Styles.inputStyle}>
          <label htmlFor="titleSearch">Title Contains:  </label>
          <input
            id="titleSearch"
            type="text"
            value=${searchTerm}
            onChange=${handleSearchChange}
            placeholder="Search movies..."
            className=${Styles.titleSearchInput}
          />
        </div>

        <div className=${Styles.inputStyle}>
          <label htmlFor="decadeSelect">Decade: </label>
          <select id="decadeSelect" value=${selectedDecade} onChange=${handleDecadeChange} className=${Styles.decadeSelector}>
            <option value="">All Decades</option>
            ${decadeOptions.map(decade => html`
              <option key=${decade} value=${decade}>${decade}</option>
            `)}
          </select>
        </div>

      </div>
  `;
};
