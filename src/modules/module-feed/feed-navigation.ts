enum FeedScreens {
  FEED = 'Feed',
  ALBUM_VIEW = 'AlbumView',
  ALBUM_CREATE = 'AlbumCreate',
}

export type FeedScreensParamList = {
  [FeedScreens.FEED]: undefined,
  [FeedScreens.ALBUM_VIEW]: {
    albumId: string,
    albumTitle: string,
  },
  [FeedScreens.ALBUM_CREATE]: undefined,
};

export default FeedScreens;
