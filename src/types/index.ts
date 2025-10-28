export interface ITheme {
  metaTitle: string;
  favicon: string;
  heroTitle: string;
  heroSubtitle: string;
  clubIntroduction1: string;
  clubIntroduction2: string;
  socials: Social[];
  news: News[];
  heroImg: string;
  lifeTimeImg: string;
  monthImg: string;
  yearImg: string;
  quarterImg: string;
  ethImg: string;
}

export interface News {
  image: string;
  title: string;
  category: string;
  time: string;
  source: string;
  link: string;
}

export interface Social {
  name: string;
  link: string;
  text: string;
}
