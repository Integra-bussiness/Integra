import { products } from '@/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';


export const columns: ColumnDef<products>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: 'name',
        header: 'Название',
    },
    {
        accessorKey: 'category',
        header: 'Категория',
    },
    {
        accessorKey: "stock",
        header: "Количество на складе"
    },
    {
        accessorKey: "availability_status",
        header: "Наличие"
    },
    {
        accessorKey: 'price',
        header: 'Цена',
    },
];
