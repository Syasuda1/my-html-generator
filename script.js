document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    
    // テキスト入力欄を作成
    const inputContainer = document.createElement('div');
    inputContainer.style.marginBottom = '10px';
    
    const inputLabel = document.createElement('label');
    inputLabel.textContent = 'ファイル名を入力（拡張子glb）: ';
    inputLabel.style.marginRight = '10px';
    
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = '何か入力してください';
    textInput.style.padding = '5px';
    textInput.style.marginRight = '10px';
    
    const addButton = document.createElement('button');
    addButton.textContent = '追加';
    addButton.style.padding = '5px 10px';
    addButton.style.cursor = 'pointer';
    
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(textInput);
    inputContainer.appendChild(addButton);
    outputDiv.appendChild(inputContainer);
    
    // 文字列置き換え機能のUIを作成
    const replaceContainer = document.createElement('div');
    replaceContainer.style.marginTop = '20px';
    replaceContainer.style.padding = '10px';
    replaceContainer.style.backgroundColor = '#fff3cd';
    replaceContainer.style.border = '1px solid #ffc107';
    replaceContainer.style.borderRadius = '5px';
    
    const replaceLabel = document.createElement('h3');
    replaceLabel.textContent = 'HTML内の文字列を置き換え:';
    replaceContainer.appendChild(replaceLabel);
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '置き換える文字列を入力';
    searchInput.style.padding = '5px';
    searchInput.style.marginRight = '10px';
    searchInput.style.marginBottom = '10px';
    searchInput.style.width = '200px';
    replaceContainer.appendChild(searchInput);
    
    const replaceInput = document.createElement('input');
    replaceInput.type = 'text';
    replaceInput.placeholder = '新しい文字列を入力';
    replaceInput.style.padding = '5px';
    replaceInput.style.marginRight = '10px';
    replaceInput.style.marginBottom = '10px';
    replaceInput.style.width = '200px';
    replaceContainer.appendChild(replaceInput);
    
    const replaceButton = document.createElement('button');
    replaceButton.textContent = '置き換え';
    replaceButton.style.padding = '5px 10px';
    replaceButton.style.cursor = 'pointer';
    replaceButton.style.marginBottom = '10px';
    replaceContainer.appendChild(replaceButton);
    
    outputDiv.appendChild(replaceContainer);

    // 置き換えボタンの処理: htmlCodeArea 内の文字列を置換
    replaceButton.addEventListener('click', () => {
        const search = searchInput.value;
        const replacement = replaceInput.value;
        if (!search) {
            alert('置き換える文字列を入力してください。');
            return;
        }

        // 正規表現の特殊文字をエスケープして global で置換
        const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapeRegExp(search), 'g');

        htmlCodeArea.value = htmlCodeArea.value.replace(regex, replacement);
        alert('置き換えが完了しました。');
    });
    
    // HTMLコード表示エリアを作成
    const htmlDisplayContainer = document.createElement('div');
    htmlDisplayContainer.style.marginTop = '20px';
    htmlDisplayContainer.style.padding = '10px';
    htmlDisplayContainer.style.border = '1px solid #ccc';
    htmlDisplayContainer.style.borderRadius = '5px';
    htmlDisplayContainer.style.backgroundColor = '#f5f5f5';
    
    const htmlLabel = document.createElement('h3');
    htmlLabel.textContent = '生成されたHTML:';
    htmlDisplayContainer.appendChild(htmlLabel);
    
    const htmlCodeArea = document.createElement('textarea');
    htmlCodeArea.readOnly = true;
    htmlCodeArea.style.width = '100%';
    htmlCodeArea.style.height = '150px';
    htmlCodeArea.style.padding = '10px';
    htmlCodeArea.style.fontFamily = 'monospace';
    htmlCodeArea.style.border = '1px solid #999';
        htmlCodeArea.value = `<html>
  <head>
    <meta charset="UTF-8" />
    <title>A-Frame</title>
    <script src="https://aframe.io/releases/1.7.0/aframe.min.js"></script>
    <script>
      AFRAME.registerComponent('follow-shadow', {
        schema: {type: 'selector'},
        init() {this.el.object3D.renderOrder = -1;},
        tick() {
          // this.data がセレクターによって取得されたエンティティ（object3Dを持つ）であることを期待
          if (this.data && this.data.object3D) { 
            this.el.object3D.position.copy(this.data.object3D.position);
            this.el.object3D.position.y -= 0.04; // stop z-fighting
          }
        }
      });
    </script>
  </head>
  <body>
    <a-scene reflection="directionalLight: a-light[type=directional]" ar-hit-test="target: #my-model-entity;" renderer="colorManagement: true; exposure: 1; toneMapping: ACESFilmic" shadow="type: pcfsoft" xr-mode-ui="XRMode: xr">
      <a-light type="directional" light="castShadow:true;" position="1 1 1" intensity="1.57" shadow-camera-automatic="#my-model-entity"></a-light>
      
      <a-assets>
        <a-asset-item id="model" src="AIice.glb"></a-asset-item>
      </a-assets>
      
      <a-entity
        id="my-model-entity"
        grabbable
        gltf-model="#model"
        position="0 1 -.5"
        shadow="receive:false; cast:true;" ></a-entity>
      
      <a-entity hand-tracking-grab-controls="hand: left"></a-entity>
      <a-entity hand-tracking-grab-controls="hand: right"></a-entity>
      
      <a-plane 
        follow-shadow="#my-model-entity" 
        material="shader:shadow" 
        shadow="cast:false; receive:true" rotation="-90 0 0" 
        width="2" 
        height="2" 
        geometry=""
      ></a-plane>
      
    </a-scene>
  </body>
</html>`;
    htmlDisplayContainer.appendChild(htmlCodeArea);
    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'コピー';
    copyButton.style.marginTop = '10px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.cursor = 'pointer';
    copyButton.addEventListener('click', () => {
        htmlCodeArea.select();
        document.execCommand('copy');
        alert('HTMLをコピーしました！');
    });
    htmlDisplayContainer.appendChild(copyButton);
    
    outputDiv.appendChild(htmlDisplayContainer);
    
    // ボタンをクリックしたときの処理
    addButton.addEventListener('click', () => {
        if (textInput.value.trim() !== '') {
            const newParagraph = document.createElement('p');
            newParagraph.textContent = textInput.value;
            newParagraph.style.marginTop = '10px';
            outputDiv.insertBefore(newParagraph, htmlDisplayContainer);
            
            // HTMLコードを更新
            htmlCodeArea.value = outputDiv.innerHTML;
            
            textInput.value = ''; // 入力欄をクリア
            textInput.focus(); // フォーカスを入力欄に戻す
        }
    });
    
    // Enterキーでも追加できるように
    textInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });
    
    // 初期のメッセージも表示
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'この段落はJavaScriptによって生成されました！';
    newParagraph.style.marginTop = '10px';
    outputDiv.appendChild(newParagraph);
});