import { Header } from '../../../components/header';
import { SectionRow } from '../../../components/section-row';
import { useBrand, useDeleteBrand } from '../../../lib/brands';
import { Pencil, Trash } from '@medusajs/icons';
import { Container, usePrompt } from '@medusajs/ui';
import { useNavigate } from 'react-router-dom';

interface IBrandDetailContainerProps {
  id?: string;
}

const BrandDetailContainer = ({ id }: IBrandDetailContainerProps) => {
  const { data: brand } = useBrand(id);
  const navigate = useNavigate();
  const dialog = usePrompt();

  const { mutate: deleteBrand } = useDeleteBrand();

  const handleClickedEdit = () => {
    navigate(`/brands/${id}/edit`);
  };

  const handleClickedDelete = async () => {
    const confirmedDelete = await dialog({
      title: 'Delete Brand',
      description: 'Are you sure you want to delete this brand?',
      confirmText: 'Delete',
    });
    if (confirmedDelete && id) {
      deleteBrand(id, {
        onSuccess: () => {
          navigate('/brands');
        },
        onError: (error) => {
          alert(error);
        },
      });
    }
  };

  return (
    <Container className="p-0 divide-y">
      <Header
        title={brand?.name ?? 'Brand Detail'}
        actions={[
          {
            type: 'action-menu',
            props: {
              groups: [
                {
                  actions: [
                    {
                      icon: <Pencil />,
                      label: 'Edit',
                      onClick: handleClickedEdit,
                    },
                    {
                      icon: <Trash />,
                      label: 'Delete',
                      onClick: handleClickedDelete,
                    },
                  ],
                },
              ],
            },
          },
        ]}
      />

      <SectionRow title="ID" value={brand?.id} />
      <SectionRow title="Name" value={brand?.name} />
      <SectionRow title="Description" value={brand?.description} />
    </Container>
  );
};

export default BrandDetailContainer;
