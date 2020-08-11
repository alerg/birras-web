import dayjs from 'dayjs';

const formatDate = (date) => dayjs(date).format('DD/MM/YYYY HH:mm');

module.exports = {
  formatDate,
};
