// movies resut
const elMoviesReult = document.querySelector(".js-movies-result");
const elTemplate = document.querySelector(".js-template").content;
const moviesShorten = movies.slice(0, 20);

const runtimeToMin = (runtime) => {
  const hour = Math.floor(Number(runtime / 60));
  const minuts = Number(runtime % 60);
  return `${hour} hur ${minuts} min`;
};
const moviesRender = (array, node) => {
  const docFrag = document.createDocumentFragment();
  node.innerHTML = "";

  array.forEach((movie) => {
    const moviesClone = elTemplate.cloneNode(true);

    moviesClone.querySelector(".js-movies-img").src = movie.img_url;
    moviesClone.querySelector(".js-movies-img").alt = movie.img_alt;
    moviesClone.querySelector(".js-movies-title").textContent = movie.title
      .toString()
      .slice(0, 16);
    moviesClone.querySelector(".js-movies-rating").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-year").textContent = movie.movie_year;
    moviesClone.querySelector(".js-movies-runtime").textContent = runtimeToMin(
      movie.runtime
    );
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.categories.join(", ");
    moviesClone.querySelector(".js-modal-btn").dataset.imdbId = movie.imdb_id;

    docFrag.appendChild(moviesClone);
  });
  node.appendChild(docFrag);
};

moviesRender(moviesShorten, elMoviesReult);

const elFunctionalfn = document.querySelector(".js-movies-functional-form");
const elInput = elFunctionalfn.querySelector(".js-movies-input");
const elMoviesCategorie = elFunctionalfn.querySelector(".js-movies-categorie");
const elMoviesSort = elFunctionalfn.querySelector(".js-movies-sort");
const elMinYear = document.querySelector(".js-min-year");
const elMaxYear = document.querySelector(".js-max-year");
const elNotFoundMovies = document.querySelector(".js-movies-not-found");

elFunctionalfn.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputSearchValue = elInput.value.trim();
  const moviesCateValue = elMoviesCategorie.value;
  const moviesSortValue = elMoviesSort.value;
  const regexpValue = new RegExp(inputSearchValue, "gi");

  const moviesSearch = movies.filter((movie) => {
    return (
      String(movie.title).match(regexpValue) &&
      (moviesCateValue === "all" || movie.categories.includes(moviesCateValue))
    );
  });

  if (moviesSearch.length > 0) {
    moviesSortfn(moviesSortValue, moviesSearch);
    moviesRender(moviesSearch, elMoviesReult);
    elNotFoundMovies.classList.add("hidden");
  } else {
    elMoviesReult.innerHTML = "";
    elNotFoundMovies.classList.remove("hidden");
  }
});

// unic categories
const moviesCategories = (array) => {
  let categorie = [];
  array.forEach((item) => {
    let movieCategorieLoop = item.categories;
    movieCategorieLoop.forEach((items) => {
      if (!categorie.includes(items)) {
        categorie.push(items);
      }
    });
  });
  return categorie;
};
// categories
const unicRenderCategories = () => {
  let unic = moviesCategories(movies);
  const categorieDocFrg = document.createDocumentFragment();
  unic.forEach((item) => {
    const newOptions = document.createElement("option");
    newOptions.textContent = item;
    newOptions.value = item;
    categorieDocFrg.appendChild(newOptions);
  });
  elMoviesCategorie.appendChild(categorieDocFrg);
};
unicRenderCategories();

// sort
const moviesSortfn = (sort, lotFunctional) => {
  if (sort === "a-z") {
    lotFunctional.sort(
      (a, b) =>
        String(a.title).toLowerCase().charCodeAt(0) -
        String(b.title).toLowerCase().charCodeAt(0)
    );
  }
  if (sort === "z-a") {
    lotFunctional.sort(
      (a, b) =>
        String(b.title).toLowerCase().charCodeAt(0) -
        String(a.title).toLowerCase().charCodeAt(0)
    );
  }
  if (sort === "high-low") {
    lotFunctional.sort((a, b) => b.imdb_rating - a.imdb_rating);
  }
  if (sort === "low-high") {
    lotFunctional.sort((a, b) => a.imdb_rating - b.imdb_rating);
  }
};

// modal
const modal = document.querySelector(".js-modal");
const elMoviesVideos = modal.querySelector(".js-moda-video");
const elMoviesTitle = modal.querySelector(".js-modal-title");
const elMoviesRuntime = modal.querySelector(".js-modal-runtime");
const elMoviesYear = modal.querySelector(".js-modal-year");
const elMoviesHover = modal.querySelector(".js-modal-hour");
const elModalCatigory = modal.querySelector(".js-modal-catigory");
const elModalSummary = modal.querySelector(".js-modal-summary");
const elModalLink = document.querySelector(".js-movies-link");

const moviesModalRender = (findMovies) => {
  elMoviesVideos.src = findMovies.iframe_link;
  elMoviesTitle.textContent = findMovies.title;
  elMoviesRuntime.textContent = findMovies.imdb_rating;
  elMoviesYear.textContent = findMovies.movie_year;
  elMoviesHover.textContent = findMovies.runtime;
  elModalCatigory.textContent = findMovies.categories;
  elModalSummary.textContent = findMovies.summary.slice(0, 500);
  elModalLink.href = findMovies.imdb_link;
};
elMoviesReult.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.matches(".js-modal-btn")) {
    const idbId = evt.target.dataset.imdbId;
    modal.classList.remove("hidden");
    movies.find((item) => {
      if (item.imdb_id === idbId) {
        console.log(item);
        moviesModalRender(item);
      }
    });
  }
});

const elModalContronHidden = document.querySelector(".js-modal-control");
elModalContronHidden.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.classList.add("hidden");
});
