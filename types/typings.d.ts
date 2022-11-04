export interface IToken {
  aud: string;
  auth_time: number;
  email: string;
  email_verified: boolean;
  exp: number;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  iat: number;
  iss: string;
  name: string;
  picture: string;
  sub: string;
  uid: string;
  user_id: string;
}

export interface Slides {
  home: SlideRows;
  series: SlideRows;
  movies: SlideRows;
  trending: SlideRows;
  myList: SlideRows;
  mySearch: SlideRows;
}
export interface SlideRows {
  map(
    arg0: (
      slideItem: SlideRows,
      index: import("react").Key | null | undefined
    ) => JSX.Element
  ): import("react").ReactNode;
  id?: string;
  // map(arg0: (slideItem: any) => JSX.Element): import("react").ReactNode;
  data?: MovieItem[] | SeriesItem[];
  featuredRow?: boolean;
  title?: string;
  top10?: boolean;
  type: string;
}
export interface Ratings {
  iso_3166_1: string;
  release_dates: Object[];
}

interface Data {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export interface Trending extends Data {
  adult: boolean;
  media_type: string;
}

export interface TrendingMovies extends Trending {
  original_title: string;
  release_date?: string;
  title: string;
  video: boolean;
}

export interface TrendingSeries extends Trending {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface SeriesItem extends Data {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name?: string;
}

export interface MovieItem extends Data {
  adult: boolean;
  original_title?: string;
  release_date?: string;
  title?: string;
  video: boolean;
}

export interface Similar extends Data {
  adult: boolean;
  original_title: string;
  release_date?: string;
  title: string;
  video: boolean;
}
export interface Detail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string };
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  production_countries: { iso_3166_1: string; name: string };
  release_date?: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639: string; name: string };
  stattus: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
};
