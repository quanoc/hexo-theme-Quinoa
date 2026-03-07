/**
 * 为 content.json 生成 gzip 压缩版本
 */
const zlib = require('zlib');

// 在生成完成后创建压缩文件
hexo.extend.filter.register('after_generate', function() {
    const route = hexo.route;
    const originalRoute = route.get('content.json');
    
    if (!originalRoute) {
        console.log('[compress-content] content.json 不存在，跳过压缩');
        return;
    }
    
    try {
        let data;
        
        // 处理不同类型的路由数据
        if (typeof originalRoute === 'string') {
            data = Buffer.from(originalRoute);
        } else if (Buffer.isBuffer(originalRoute)) {
            data = originalRoute;
        } else if (typeof originalRoute === 'function') {
            const result = originalRoute();
            data = Buffer.isBuffer(result) ? result : Buffer.from(result);
        } else if (typeof originalRoute === 'object') {
            // 检查是否是 Stream 对象（有 _data 属性）
            if (originalRoute._data) {
                // 直接获取 _data 属性
                data = Buffer.isBuffer(originalRoute._data) 
                    ? originalRoute._data 
                    : Buffer.from(originalRoute._data);
            } else if (originalRoute.path && typeof originalRoute.read === 'function') {
                // 这是一个文件对象，读取内容
                const fs = require('fs');
                data = fs.readFileSync(originalRoute.path);
            } else {
                // 尝试 JSON 序列化
                data = Buffer.from(JSON.stringify(originalRoute));
            }
        } else {
            console.log('[compress-content] 无法读取 content.json 数据，类型:', typeof originalRoute);
            return;
        }
        
        // 压缩数据
        const compressed = zlib.gzipSync(data, { level: 9 });
        
        // 将压缩后的数据写入路由
        route.set('content.json.gz', compressed);
        
        // 删除原始的 content.json，只保留压缩版本
        route.remove('content.json');
        
        const originalSize = (data.length / 1024).toFixed(2);
        const compressedSize = (compressed.length / 1024).toFixed(2);
        const ratio = ((1 - compressed.length / data.length) * 100).toFixed(1);
        
        console.log(`[compress-content] content.json: ${originalSize} KB → ${compressedSize} KB (${ratio}% 减少)，已删除原始文件`);
    } catch (err) {
        console.error('[compress-content] 压缩失败:', err.message);
        console.error(err.stack);
    }
});
