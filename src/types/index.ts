export interface ITheme {
  templateId: string;
  metaTitle: string;
  favicon: string;
  heroTitle: string;
  heroGradientText: string;
  heroSubtitle: string;
  heroImg1: string;
  heroImg2: string;
  heroImg3: string;
  avatar1: string;
  avatar2: string;
  avatar3: string;
  clubIntroduction1: string;
  clubIntroduction2: string;
  clubLink1: string;
  clubLink2: string;
  socials: Social[];
  news: News[];
  heroImg: string;
  lifeTimeImg: string;
  monthImg: string;
  yearImg: string;
  quarterImg: string;
  verifyImgs: string[];
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
  icon: string;
}
