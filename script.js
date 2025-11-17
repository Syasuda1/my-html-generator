document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    
    // 新しい要素（HTML）を作成
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'この段落はJavaScriptによって生成されました！';
    
    // DOMに追加してHTMLを動的に生成
    outputDiv.appendChild(newParagraph);
});