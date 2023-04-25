export const formatDate = (date: Date) => {
  const currentDate = new Date();
  const createdDate = new Date(date);
  const daysDifference = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

  if (daysDifference < 5) {
    return `hace ${daysDifference} días`;
  } else {
    return createdDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  }
};
