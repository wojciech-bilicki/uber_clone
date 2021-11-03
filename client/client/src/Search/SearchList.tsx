import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

import { Vehicle } from '../types';
import * as S from './Search.styles';

interface SearchListProps {
  searchTerm: string;
  onSearchTermChanged: (searchTerm: string) => void;
  vehicleArray: Vehicle[];
}

const SearchList: React.FC<SearchListProps> = ({
  vehicleArray,
  searchTerm,
  onSearchTermChanged,
}) => {
  const ListRow = ({ index, style }: ListChildComponentProps) => {
    const vehicle = vehicleArray[index];
    return (
      <S.SearchRow
        style={style}
      >{`${vehicle.name} Lat:${vehicle.lat} Long: ${vehicle.long}`}</S.SearchRow>
    );
  };

  return (
    <S.SearchListWrapper>
      <input
        placeholder="Search by name"
        onChange={(event) => onSearchTermChanged(event.target.value)}
        value={searchTerm}
      />
      <AutoSizer>
        {({ width, height }) => (
          <List
            useIsScrolling
            height={height - 23}
            width={width}
            itemSize={70}
            itemCount={vehicleArray.length}
          >
            {ListRow}
          </List>
        )}
      </AutoSizer>
    </S.SearchListWrapper>
  );
};

export default SearchList;
