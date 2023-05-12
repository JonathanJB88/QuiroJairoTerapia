export const formatDate = (date: Date) => {
  const currentDate = new Date();
  const createdDate = new Date(date);
  const daysDifference = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

  const dateString =
    daysDifference === 0
      ? 'Hoy'
      : daysDifference < 5
      ? `hace ${daysDifference} días`
      : createdDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  return dateString;
};
