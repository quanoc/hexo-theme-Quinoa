'use strict';

hexo.extend.tag.register('tips', function(args, content) {
    // 解析带冒号的参数：args[0]是 "tips:类型"（如tips:success），拆分出类型
    let type = 'note'; // 默认类型
    if (args[0]) {
      type = args[0].split(':')[1] || 'note';
    }
    // 保留原有类型配置（图标、颜色）
    const typeConfig = {
      note: {
        icon: 'info-circle',
        color: '#e8f4f8',
        borderColor: '#4299e1',
        textColor: '#2d3748'
      },
      success: {
        icon: 'check-circle',
        color: '#e8f5e9',
        borderColor: '#48bb78',
        textColor: '#2d3748'
      },
      warning: {
        icon: 'exclamation-circle',
        color: '#fffaf0',
        borderColor: '#ed8936',
        textColor: '#2d3748'
      },
      danger: {
        icon: 'times-circle',
        color: '#fef7fb',
        borderColor: '#e53e3e',
        textColor: '#2d3748'
      },
      question: {
        icon: 'question-circle',
        color: '#fef7fb',
        borderColor: '#e53e3e',
        textColor: '#2d3748'
      }
    };
  
    const config = typeConfig[type] || typeConfig.note;
    
    // 关键修改：调整tip-icon定位为左上角，提示框内边距顶部增加
    return `
      <div class="tip-container tip-${type}" style="
        background-color: ${config.color};
        color: ${config.textColor};
        position: relative;
      ">
        <div class="tip-icon" style="
          color: ${config.borderColor};
        ">
          <i class="fa fa-${config.icon}"></i>
        </div>
        <div class="tip-wrapper">
            <div class="tip-content">
                ${content}
            </div>
        </div>
      </div>
    `;
  }, {ends: true});