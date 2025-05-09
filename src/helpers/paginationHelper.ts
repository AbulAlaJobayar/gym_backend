export type TOption = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};
type TOptionResult = {
  limit: number;
  page: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const paginationHelper = (option: TOption): TOptionResult => {
  const page = Math.max(Number(option.page) || 1, 1);
  const limit = Math.max(Number(option.limit) || 10, 1);
  const skip = (page - 1) * limit;
  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder === 'asc' ? 'asc' : 'desc';

  return { page, limit, skip, sortBy, sortOrder };
};

export default paginationHelper;
