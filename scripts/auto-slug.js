/**
 * Auto-generate slug from title using first letter abbreviation
 * 
 * Strategy: First letter of each word (Chinese char = 1 word)
 * Example: "如何使用 Hexo" -> "rhsyhexo"
 * 
 * If slug is manually specified in front-matter, it will be preserved.
 */

hexo.extend.filter.register('before_post_render', function(data) {
  // Only process posts, not pages
  if (data.layout !== 'post') {
    return data;
  }
  
  // If slug is already specified manually, keep it
  if (data.slug) {
    return data;
  }
  
  try {
    const title = data.title || '';
    
    // Split title into words
    // Chinese characters are treated as individual "words"
    // English words are split by non-alphanumeric characters
    const words = title
      .replace(/([a-zA-Z]+)/g, ' $1 ')  // Separate English words
      .replace(/\s+/g, ' ')             // Normalize whitespace
      .trim()
      .split(' ');
    
    // Get first letter of each word
    const abbreviation = words
      .map(word => {
        // For Chinese or any character, get the first char
        const firstChar = word.charAt(0);
        return firstChar.toLowerCase();
      })
      .join('');
    
    // Limit length to 10 characters to keep URL short
    data.slug = abbreviation.substring(0, 10);
    
    hexo.log.debug(`Auto-generated slug for "${data.title}": ${data.slug}`);
  } catch (err) {
    hexo.log.warn(`Failed to generate slug for "${data.title}": ${err.message}`);
    // Fallback: use first 6 alphanumeric chars of title
    data.slug = data.title
      ? data.title.substring(0, 6).toLowerCase().replace(/[^a-z0-9]/g, '')
      : 'post';
  }
  
  return data;
});
