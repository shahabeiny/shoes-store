import moment from 'jalali-moment';

export const formatDate = (createdAt: string, dateFormat: string = 'D MMMM YYYY'): string => {
  return moment(createdAt).locale('fa').format(dateFormat);
};
