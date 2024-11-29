import { useBrands } from '../../lib/brands';
import { Table } from '../table';
import { useState } from 'react';

const BrandsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useBrands();
  return (
    <Table<Record<string, string>>
      columns={[
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'created_at',
          label: 'Created At',
          render: (value: string) => {
            return new Date(value).toLocaleDateString();
          },
        },
      ]}
      data={data?.brands ?? []}
      pageSize={10}
      count={data?.count ?? 0}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default BrandsTable;
