function isNumeric(str) {
    const regex = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/; // 支持科学计数法
    return regex.test(str);
}
function stringToFloatPrecision(str) {
    if (isNumeric(str)) {
        try {
            const num = parseFloat(str);
            return parseFloat(num.toPrecision(8));
        } catch (e) { 
            return str;
        }
    }
    return str;
}
// 该文件用于处理 CSV 数据并将其转换为 HTML 表格
window.displayTableFromCSV = function(csvData, useNumericHeaders) {
  // 使用 PapaParse 解析 CSV 数据
  Papa.parse(csvData, {
    complete: function (results) {
      const data = results.data;
      let table = '<table border="1" cellpadding="5">';
      table += '<thead><tr>';
      // 第一行第一列为空.
      table += `<th></th>`;
	  if (useNumericHeaders) {
        // 使用从 0 开始自增的数字作为表头
        for (let i = 0; i < Object.keys(data[0]).length; i++) {
          table += `<th>${i}</th>`;
        }
      } else {
        // 使用第一行数据作为表头
        const headerRow = data[0];
	    for (const value of Object.values(headerRow)) {
	      table += `<th>${value}</th>`;
	    }
      }
     
      table += '</tr></thead>';
      table += '<tbody>';
      // 创建表格内容，从第二行开始
      const start = useNumericHeaders? 0 : 1;
      for (let i = start; i < data.length; i++) {
        const row = data[i];
        table += `<tr><td>${useNumericHeaders ? i+1 : i}</td>`;
        for (const value of Object.values(row)) {
          table += `<td>${stringToFloatPrecision(value)}</td>`;
        }
        table += '</tr>';
      }
      table += '</tbody></table>';
      // 将表格插入页面
      const tableContainer = document.getElementById('csv-table');
      tableContainer.innerHTML = table;
      // 判断表格宽度是否超过一定值，如果是则添加滚动条
      const tableElement = tableContainer.querySelector('table');
      const maxWidth = 500; // 设置一个最大宽度，超过这个宽度就添加滚动条
      if (tableElement.offsetWidth > maxWidth) {
        tableContainer.style.overflowX = 'auto';
      }
    }
  }); 
}