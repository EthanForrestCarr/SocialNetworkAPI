const formatDate = (date: Date | string | number): string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }
    return parsedDate.toLocaleString();
  };
  
  export default formatDate;