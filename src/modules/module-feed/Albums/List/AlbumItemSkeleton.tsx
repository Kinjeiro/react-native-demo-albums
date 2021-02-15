import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function renderSkeletonItem() {
  return (
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginBottom={ 32 }>
      <SkeletonPlaceholder.Item width={ 96 } height={ 96 } borderRadius={ 10 } />
      <SkeletonPlaceholder.Item marginLeft={ 16 }>
        <SkeletonPlaceholder.Item width={ 120 } height={ 10 } borderRadius={ 4 } />
        <SkeletonPlaceholder.Item width={ 254 } height={ 16 } borderRadius={ 4 } marginTop={ 6 } />
        <SkeletonPlaceholder.Item width={ 60 } height={ 10 } borderRadius={ 4 } marginTop={ 6 } />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );
}

export default function AlbumSkeletons() {
  return (
    <SkeletonPlaceholder>
      { renderSkeletonItem() }
      { renderSkeletonItem() }
      { renderSkeletonItem() }
    </SkeletonPlaceholder>
  );
}
