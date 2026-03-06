/**
 * Auto-generate slug from Chinese title using pinyin abbreviation
 * 
 * Strategy: First letter of each pinyin word
 * Example: "如何使用 Hexo" -> "rhsyhexo"
 * 
 * If slug is manually specified in front-matter, it will be preserved.
 */

const pinyin = require('pinyin');

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
    // Convert title to pinyin
    const py = pinyin(data.title, {
      style: pinyin.STYLE_NORMAL,  // Normal style without tone marks
      separator: ' '               // Space separator for splitting
    });
    
    // Flatten array and join
    const pyString = Array.isArray(py) ? py.join(' ') : py;
    
    // Get first letter of each word
    const abbreviation = pyString
      .split(/\s+/)           // Split by whitespace
      .map(word => word.charAt(0).toLowerCase())  // Get first letter
      .join('');              // Join together
    
    // Limit length to 10 characters to keep URL short
    data.slug = abbreviation.substring(0, 10);
    
    hexo.log.debug(`Auto-generated slug for "${data.title}": ${data.slug}`);
  } catch (err) {
    hexo.log.warn(`Failed to generate slug for "${data.title}": ${err.message}`);
    // Fallback: use first 6 chars of title
    data.slug = data.title.substring(0, 6).toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  
  return data;
});
