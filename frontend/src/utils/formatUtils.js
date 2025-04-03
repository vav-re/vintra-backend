/**
 * Format a date to a localized string
 * @param {string|Date} dateString - ISO date string or Date object
 * @param {Object} options - Format options
 * @returns {string} Formatted date string
 */
export const formatDate = (
    dateString,
    options = {}
  ) => {
    const {
      format = 'medium',
      includeTime = false,
      locale = 'pt-BR'
    } = options;
    
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
    // If the date is invalid, return empty string
    if (isNaN(date.getTime())) {
      return '';
    }
    
    let dateOptions = {};
    
    switch (format) {
      case 'short':
        dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        break;
      case 'medium':
        dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        break;
      case 'long':
        dateOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        break;
    }
    
    if (includeTime) {
      dateOptions = {
        ...dateOptions,
        hour: '2-digit',
        minute: '2-digit'
      };
    }
    
    return new Intl.DateTimeFormat(locale, dateOptions).format(date);
  };
  
  /**
   * Calculate age from birthdate
   * @param {string} birthdate - Date string
   * @returns {number} Age in years
   */
  export const calculateAge = (birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    
    // If the date is invalid, return 0
    if (isNaN(birth.getTime())) {
      return 0;
    }
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  /**
   * Format a number as a percentage
   * @param {number} value - The number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted percentage string
   */
  export const formatPercentage = (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  };
  
  /**
   * Truncate text to a specified length with ellipsis
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    
    return `${text.slice(0, maxLength)}...`;
  };