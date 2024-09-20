// Helper tạo bảng
function table (rows, cols) {
    let tableHtml = '<table border="1">';
    for (let i = 0; i < rows; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < cols; j++) {
            tableHtml += '<td>Cell</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
}
  
  // Helper lặp
  const forLoop = (n, block) => {
    let accum = '';
    for (let i = 0; i < n; i++) {
      accum += block.fn(i);
    }
    return accum;
  };
  
  module.exports = {  table, forLoop };
  