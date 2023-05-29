export const formatDate = (date: Date, format: string = 'relative') => {
  const currentDate = new Date();
  const createdDate = new Date(date);
  const daysDifference = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

  if (format === 'relative') {
    const dateString =
      daysDifference === 0
        ? 'Hoy'
        : daysDifference < 5
        ? `hace ${daysDifference} días`
        : createdDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    return dateString;
  }
  if (format === 'published') {
    return `Publicado el ${createdDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
  }

  return '';
};
