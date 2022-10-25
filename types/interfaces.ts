export interface ApiData {
  results: Data[];
  total: number;
  total_pages: number;
}

export interface Data {
  alt_description: string;
  blur_hash: string;
  categories: string[];
  color: string;
  created_at: string;
  current_user_collections: (string | number)[];
  description: string | null;
  height: number;
  downloads?: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Link;
  promoted_at: string | number;
  sponsorship: Sponsorship;
  updated_at: string;
  urls: Url;
  user: User;
  views?: number;
  width: Number;
}

export interface CollectionType {
  cover_photo: Data;
  curated: boolean;
  description: string;
  featured: boolean;
  id: string;
  last_collected_at: string;
  links: CollectionLink;
  preview_photos: PreviewPhoto[];
  private: boolean;
  published_at: string;
  share_key: string;
  tags: Tags[];
  title: string;
  total_photos: number;
  updated_at: string;
  user: User;
}

interface CollectionLink {
  html: string;
  photos: string;
  related: string;
  self: string;
}

export interface PreviewPhoto {
  blur_hash: string;
  created_at: string;
  id: string;
  updated_at: string;
  urls: Url;
}

export interface Tags {
  title: string;
  type: string;
  // source: Partial<Source>;
}

interface Link {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: User;
}

export interface Url {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface User {
  accepted_tos: boolean;
  bio: string;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string;
  last_name: string | null;
  links: UserLink;
  location: string | null;
  name: string;
  portfolio_url: string;
  profile_image: PrifileImg;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  twitter_username: string;
  updated_at: string;
  username: string;
}

interface UserLink {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface PrifileImg {
  small: string;
  medium: string;
  large: string;
}

export interface Img {
  urls: Url;
  alt: string;
}

export interface ContextType {
  getData(arg: Data): void;
  data: Data | InfoType | undefined;
  session: any;
  getSession(arg: any): void;
  isLoading: boolean;
  setIsLoading(arg: boolean): void;
  apiData: Data[] | undefined;
  setApiData(arg: any): void;
}

export interface InfoType {
  created_at: string | never;
  views: number;
  downloads: number;
  width: number;
  height: number;
  id?: string;
}
