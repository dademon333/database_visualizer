import { useEffect, useState } from 'react';
import { PagingState, IntegratedPaging, SelectionState, IntegratedSelection } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableSelection } from '@devexpress/dx-react-grid-bootstrap4';
import { PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchQuauntums } from '../../redux/quntums-data/api-actions';
import Navigation from '../../components/navigation/navigation';
import Toolbar from '../../components/tool-bar/tool-bar';
import { getRows, getColumns, getIsLoading } from '../../redux/quntums-data/selectors';
import { setRows } from '../../utils/set-rows';
import { EntityType, messages, SortingOptions } from '../../const';

const QuantumsTable = (): JSX.Element => {
  const columnWidths: Table.ColumnExtension[] = [
    { columnName: 'name', width: 230 },
    { columnName: 'body', width: 900 },
    { columnName: 'add', width: 65 }
  ];

  const dispatch = useAppDispatch();
  const rows = useAppSelector(getRows);
  const columns = useAppSelector(getColumns);
  const isLoading = useAppSelector(getIsLoading);

  const [query, setQuery] = useState<string>('');
  const [selection, setSelection] = useState<(number | string)[]>([]);
  const [sortingOption, setSortingOption] = useState<SortingOptions>(SortingOptions.DEFAULT);

  useEffect(() => {
    dispatch(fetchQuauntums());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Toolbar
        onSearchChange={setQuery}
        sortingOption={sortingOption}
        onSortingOption={setSortingOption}
      />
      {
        isLoading ?
          <div className='spinner'>
            <Spinner animation='border' />
          </div>
          :
          <div className='table_container quantumsTable'>
            <Grid
              rows={setRows(rows, query, sortingOption)}
              columns={columns}
            >
              <SelectionState selection={selection} onSelectionChange={setSelection} />
              <IntegratedSelection />
              <PagingState defaultCurrentPage={0} defaultPageSize={10} />
              <IntegratedPaging />
              <Table columnExtensions={columnWidths} />
              <PagingPanel pageSizes={[5, 10, 15, 0]} messages={messages} />
              <TableHeaderRow />
              <TableSelection showSelectAll />
            </Grid>
          </div>
      }
    </>
    );
}

export default QuantumsTable;
