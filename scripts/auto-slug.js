/**
 * Auto-generate slug from title
 * 
 * Strategy: Only generate slug if title contains English words
 * For pure Chinese titles, leave slug empty for cleaner URLs
 * 
 * Example: "如何使用 Hexo" -> slug: "hexo" (extract English words)
 * Example: "如何使用" -> slug: "" (empty, URL will be /wiki/abbrlink/)
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
  
  const title = data.title || '';
  
  // Extract English words from title
  const englishWords = title.match(/[a-zA-Z]+/g);
  
  if (englishWords && englishWords.length > 0) {
    // Join English words with hyphen
    data.slug = englishWords
      .join('-')
      .toLowerCase()
      .substring(0, 20); // Limit length
    
    hexo.log.debug(`Auto-generated slug for "${data.title}": ${data.slug}`);
  }
  // If no English words, leave slug empty (undefined)
  // URL will be /wiki/abbrlink/ without slug part
  
  return data;
});
