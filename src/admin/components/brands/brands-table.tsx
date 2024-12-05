import { IBrand, useBrands, useDeleteBrand } from '../../lib/brands';
import { Table } from '../table';
import { EllipsisHorizontal, PencilSquare, Trash } from '@medusajs/icons';
import { DropdownMenu, IconButton, usePrompt } from '@medusajs/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandsTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { data } = useBrands({
    limit: 10,
    page: currentPage,
  });

  const { mutate: deleteBrand } = useDeleteBrand();

  const dialog = usePrompt();

  const handleClickEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/brands/${id}/edit`);
  };

  const handleClickDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const confirmedDelete = await dialog({
      title: 'Delete Brand',
      description: 'Are you sure you want to delete this brand?',
      confirmText: 'Delete',
    });
    if (confirmedDelete) {
      deleteBrand(id, {
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <Table<IBrand>
      columns={[
        {
          key: 'id',
          label: 'ID',
          width: '150px',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
          label: 'Description',
          render: (value: any) => {
            return value ?? '-';
          },
        },
        {
          key: 'created_at',
          label: 'Created At',
          render: (value: any) => {
            return new Date(value).toLocaleDateString();
          },
        },
        {
          key: 'actions',
          align: 'right',
          render: (_value: any, item: IBrand) => {
            return (
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <IconButton variant="transparent">
                    <EllipsisHorizontal />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    className="gap-x-2"
                    onClick={(e) => {
                      handleClickEdit(e, item.id);
                    }}
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="gap-x-2" onClick={(e) => handleClickDelete(e, item.id)}>
                    <Trash className="text-ui-fg-subtle" />
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            );
          },
        },
      ]}
      data={data?.brands ?? []}
      pageSize={10}
      count={data?.count ?? 0}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onClickRow={(item) => {
        navigate(`/brands/${item.id}`);
      }}
    />
  );
};

export default BrandsTable;
