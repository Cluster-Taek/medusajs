import { Table as UiTable } from '@medusajs/ui';
import { useMemo } from 'react';

interface TableProps<T extends Object> {
  columns: {
    key: keyof T;
    label?: string;
    width?: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
  data: T[];
  pageSize: number;
  count: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  onClickRow?: (item: T) => void;
}

export const Table = <T extends Object>({
  columns,
  data,
  pageSize,
  count,
  currentPage,
  setCurrentPage,
  onClickRow,
}: TableProps<T>) => {
  const pageCount = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [data, pageSize]);

  const canNextPage = useMemo(() => {
    return currentPage < pageCount - 1;
  }, [currentPage, pageCount]);
  const canPreviousPage = useMemo(() => {
    return currentPage - 1 >= 0;
  }, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden !border-t-0">
      <UiTable>
        <UiTable.Header>
          <UiTable.Row>
            {columns.map((column, index) => (
              <UiTable.HeaderCell key={index}>{column.label}</UiTable.HeaderCell>
            ))}
          </UiTable.Row>
        </UiTable.Header>
        <UiTable.Body>
          {data.map((item, index) => {
            const rowIndex = 'id' in item ? (item.id as string) : index;
            return (
              <UiTable.Row
                key={rowIndex}
                onClick={() => onClickRow?.(item)}
                className={`${onClickRow && 'cursor-pointer'}`}
              >
                {columns.map((column, index) => (
                  <UiTable.Cell
                    key={`${rowIndex}-${index}`}
                    className={`
                    ${column.align === 'left' && 'text-left'}
                    ${column.align === 'right' && 'text-right'}
                    ${column.align === 'center' && 'text-center'}
                  `}
                    style={{
                      width: column.width ?? 'auto',
                    }}
                  >
                    <>
                      {column.render && column.render(item[column.key] as T[keyof T], item)}
                      {!column.render && <>{item[column.key] as string}</>}
                    </>
                  </UiTable.Cell>
                ))}
              </UiTable.Row>
            );
          })}
        </UiTable.Body>
      </UiTable>
      <UiTable.Pagination
        count={count}
        pageSize={pageSize}
        pageIndex={currentPage}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
